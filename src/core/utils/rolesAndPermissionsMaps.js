export function mapModuleKeyToLabel(data, key) {
  const result = {};

  const formatKey = input =>
    input
      .replace(/_/g, ' ')
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());

  for (const module in data) {
    result[module] = formatKey(module);

    for (const subModule in data[module]) {
      result[subModule] = formatKey(subModule);

      // Check if data[module][subModule] is iterable (array)
      if (Array.isArray(data[module][subModule])) {
        for (const action of data[module][subModule]) {
          result[action] = formatKey(action);
        }
      }
    }
  }

  return key ? result[key] : result;
}

export const mapResponseToProperArray = apiResponse => {
  const result = {};

  // Iterate through each API response item
  apiResponse.forEach(item => {
    const module = item.module;
    const subModule = item['sub-module'];
    const permission = item.name;

    // Initialize module if not present
    if (!result[module]) {
      result[module] = {};
    }

    // Initialize sub-module if not present
    if (!result[module][subModule]) {
      result[module][subModule] = [];
    }

    // Push permission to the sub-module array
    result[module][subModule].push(permission);
  });

  return result;
};

// export const MODULE_ENUM = {
//   HOME: 'home',
//   INVENTORY: 'inventory_module',
//   SALES: 'sale_module',
//   PURCHASE: 'purchase_module',
//   SETTINGS: 'settings_module'
// };

export const MODULE_ENUM = {
  LOGIN: 'login',
  REGISTER: 'register',
  FORGOT_PASSWORD: 'forgot_password',
  RESET_PASSWORD: 'reset-password',
  HOME: 'home',
  USERS: 'user',
  ROLES: 'role',
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  EMPLOYEE: 'employee',
  TAX_RATES: 'tax-rates',
  WORKER: 'worker',
};

// export const MAP_ROUTE_TO_PERMISSION = {
//   ALL: 'ALL',
//   NEW: 'ADD',
//   VIEW: 'VIEW',
//   EDIT: 'UPDATE',
//   DELETE: 'DELETE'
// };

// export function findPermissionFromRouteString(routeString) {
//   if (routeString.includes('/new')) return 'ADD';
//   else if (routeString.includes('/edit')) return 'UPDATE';
//   else 'ALL';
// }

export const PermissionsEnum = {

  [MODULE_ENUM.SHIPMENTS]: {
    ALL: 'all-shipment',
    VIEW: 'view-shipment',
    ADD: 'create-shipment',
    EDIT: 'edit-shipment',
    DELETE: 'delete-shipment',
    DATATABLE: 'datatable-shipment',
  },
  [MODULE_ENUM.CUSTOMER]: {
    ALL: 'all-customer',
    VIEW: 'view-customer',
    ADD: 'create-customer',
    EDIT: 'edit-customer',
    DELETE: 'delete-customer',
    DATATABLE: 'datatable-customer',
  },
  [MODULE_ENUM.EMPLOYEE]: {
    ALL: 'all-employee',
    VIEW: 'view-employee',
    ADD: 'create-employee',
    EDIT: 'edit-employee',
    DELETE: 'delete-employee',
    DATATABLE: 'datatable-employee',
  },
  [MODULE_ENUM.ADMIN]: {
    ALL: 'all-admin',
    VIEW: 'view-admin',
    ADD: 'create-admin',
    EDIT: 'edit-admin',
    DELETE: 'delete-admin',
    DATATABLE: 'datatable-admin',
  },
  [MODULE_ENUM.HOME]: {
    ALL: 'all-home',
    VIEW: 'view-home',
    ADD: 'create-home',
    EDIT: 'edit-home',
    DELETE: 'delete-home',
    DATATABLE: 'datatable-home',
  },
  [MODULE_ENUM.USERS]: {
    ALL: 'all-user',
    VIEW: 'view-user',
    ADD: 'create-user',
    EDIT: 'edit-user',
    DELETE: 'delete-user',
    DATATABLE: 'datatable-user',
  },
  [MODULE_ENUM.ROLES]: {
    ALL: 'all-role',
    VIEW: 'view-role',
    ADD: 'create-role',
    EDIT: 'edit-role',
    DELETE: 'delete-role',
    DATATABLE: 'datatable-role',
  },
  [MODULE_ENUM.WORKER]: {
    ALL: 'all-worker',
    VIEW: 'view-worker',
    ADD: 'create-worker',
    EDIT: 'edit-worker',
    DELETE: 'delete-worker',
    DATATABLE: 'datatable-worker',
  },
  [MODULE_ENUM.TAX_RATES]: {
    ALL: 'all-tax',
    VIEW: 'view-tax',
    ADD: 'create-tax',
    EDIT: 'edit-tax',
    DELETE: 'delete-tax',
    DATATABLE: 'datatable-tax',
  },
};

export default PermissionsEnum;
