import usePermission from '../../../core/hooks/usePermission';

const WithPermission = ({ requiredPermission, children, module, fallBack }) => {
  const hasPermission = usePermission(requiredPermission, module);
  return hasPermission ? children : fallBack;
};

export default WithPermission;
