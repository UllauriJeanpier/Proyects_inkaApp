export const formatBanks = (array = []) =>
  array.map((row: any) => ({ ...row, value: row.id, name: row.texto }));

export const formatPounds = (array = []) =>
  array.map((row: any) => ({ ...row, value: row.id, name: row.texto }));

export const formatTypeAccounts = (array = []) =>
  array.map((row: any) => ({ ...row, value: row.id, name: row.texto }));
