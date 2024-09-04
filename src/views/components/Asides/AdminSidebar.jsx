import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MainAside from './MainAside';
import PermissionsEnum, {
  MODULE_ENUM,
} from '../../../core/utils/rolesAndPermissionsMaps';

export const list = [
  
  {
    name: 'Home',
    icon: <ShoppingCartIcon />,
    subItems: [
      
      {
        name: 'Home',
        path: '/home',
        module: MODULE_ENUM.HOME,
      },
     
    ],
  },
 
  {
    name: 'Settings',
    icon: <SettingsIcon />,
    subItems: [
     
    ],
  },
];
export default function AdminSidebar() {
  const permissions = [
    
    {   "id": 1,
       "name": "all-invoice",
       "guard_name": "api",
       "created_at": "2024-04-22T18:21:51.000000Z",
       "updated_at": "2024-04-22T18:21:51.000000Z",
       "module": "sale_module",
       "sub-module": "invoice",
       "pivot": {
           "role_id": 1,
           "permission_id": 1
         }
       }
   
     ]
  const permittedList = list.reduce((accumulator, item) => {
    // Directly check if the item is defaultPermitted or has the required permission for the module.
    const hasMainPermission = item.defaultPermitted;

    if (hasMainPermission) {
      // If item is default permitted or has main permission and either doesn't have subItems or has non-empty subItems, add it.
      if (!item.subItems || (item.subItems && item.subItems.length > 0)) {
        accumulator.push(item);
      }
    } else if (item.subItems) {
      // Filter subItems based on permissions.
      const filteredSubItems = item.subItems.filter(subItem => {
        const modulePermissions = PermissionsEnum[subItem.module];

        if (!modulePermissions) return true; // Allow items with no module specified

        const { VIEW, ALL, EDIT, DELETE, ADD, DATATABLE } = modulePermissions;
        // const permissionKeys = [VIEW, ALL, EDIT, DELETE, ADD];
        const permissionKeys = [VIEW, ALL, DATATABLE];
        if (permissions?.length)
          return permissions.some(permission =>
            permissionKeys.includes(permission.name)
          );
        return false;
      });

      // If there are any permitted subItems, add the item with those subItems.
      if (filteredSubItems.length > 0) {
        accumulator.push({ ...item, subItems: filteredSubItems });
      }
    }

    return accumulator;
  }, []);

  return <MainAside list={permittedList} />;
}
