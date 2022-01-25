export const ROUTE_GET_TYPES_DOCUMENTS = '/TipoDocumentoIdentidad/lista';
export const ROUTE_POST_LOGIN = '/Token';
export const ROUTE_POST_FORGET_PASSWORD = '/Token/reset';
export const ROUTE_POST_CHANGE_PASSWORD = '/Token/reset/save';
export const ROUTE_POST_REGISTER_USER = '/Usuario';
export const ROUTE_GET_BANKS = '/Banco/lista';
export const ROUTE_GET_POUNDS = '/Moneda/lista';
export const ROUTE_GET_TYPE_ACCOUNTS = '/TipoCuentaBancaria/lista';
export const ROUTE_POST_SAVE_ACCOUNT = '/CuentaBancaria';
export const ROUTE_GET_ACCOUNTS_BANK = '/CuentaBancaria';
export const ROUTE_DELETE_ACCOUNTS_BANK = (id: string) =>
  `/CuentaBancaria/${id}`;
export const ROUTE_UPDATE_ACCOUNTS_BANK = (id: string) =>
  `/CuentaBancaria/${id}`;
export const ROUTE_GET_TYPE_CHANGE = (fecha: number) =>
  `/TipoCambio/${fecha.toString()}`;
export const ROUTE_POST_REGISTER_OPERATION = `/Operacion`;
export const ROUTE_POST_CONFIRM_OPERATION = (id: string) =>
  `/Operacion/${id}/Confirmar`;
export const ROUTE_GET_OPERATION = (id: string) => `/Operacion/${id}`;
export const ROUTE_GET_TYPES_OPERATIONS = `/Operacion/ListaEstados`;
export const ROUTE_GET_OPERATIONS_BY_TYPES = (estado: string) =>
  `/Operacion/lista/${estado}`;
export const ROUTE_GET_USER = '/Usuario';
export const ROUTE_GET_IMAGE_USER = `/Usuario/imagen`;
export const ROUTE_POST_IMAGE_USER = '/Usuario/imagen';
export const ROUTE_GET_PROFILES_USER = '/Usuario/perfiles';
export const ROUTE_POST_PROFILE_USER = '/Token/perfil';
export const ROUTE_GET_SECTOR_ECONOMICO = '/SectorEconomico/lista';
export const ROUTE_GET_ACTIVIDAD_ECONOMICA = '/ActividadEconomica/lista';
export const ROUTE_POST_PROFILE_COMPANY = '/Usuario/perfil';

// fondos
export const ROUTE_GET_FOUNDS_LIST= '/OrigenFondo/lista'
