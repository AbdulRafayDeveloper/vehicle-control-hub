import { useSelector } from 'react-redux';
import PermissionsEnum from '../utils/rolesAndPermissionsMaps';

function usePermission(requiredPermission, module) {
  const activeModule = useSelector(state => state.app.activeModule);
  const userPermissions = useSelector(state => state.auth.user?.permissions);
  const MODULE = module || activeModule;
  const modulePermissions = PermissionsEnum[MODULE];
  const modulePermission = modulePermissions?.[requiredPermission];
  const allPermission = modulePermissions?.ALL;
  let hasPermission = true;
  // Check if the required permission is "VIEW" and if any of the user permissions contain the word "datatable"
  if (
    requiredPermission === 'VIEW' &&
    userPermissions &&
    userPermissions?.some(
      permission =>
        typeof permission === 'object' && permission.name.includes('datatable')
    )
    // userPermissions[0]?.name?.includes('datatable')
  ) {
    hasPermission = true;
  } else if (
    (requiredPermission || requiredPermission !== 'Export') &&
    userPermissions?.length
  ) {
    hasPermission = userPermissions.find(
      permission =>
        permission.name === allPermission ||
        permission.name === modulePermission
    );
  }
  return hasPermission ? true : false;
}

export default usePermission;
