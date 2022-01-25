import groupBy from 'lodash.groupby';
import { getRouteFile } from '@utils/functions';

export const formatAccountsBankGroup = (array = []) => {
  const groupByPound = groupBy(array, 'idMoneda');
  const result = Object.keys(groupByPound).map((key) => [
    key,
    groupByPound[key],
  ]);

  return (result || []).map((row: any) => ({
    pound: {
      id: row[0],
      label: row[1][0].moneda,
    },
    list: (row[1] || []).map((row1: any) => ({
      id: row1.id,
      idBank: row1.idBanco,
      bank: row1.banco,
      idType: row1.idTipo,
      type: row1.tipo,
      name: row1.nombre,
      number: row1.numero,
      img: getRouteFile(row1.imagen),
      delete: row1.puedeEliminar,
      owner: row1.propietario
    })),
  }));
};

export const formatAccountsBank = (array = []) =>
  array.map((row: any) => ({
    id: row.id,
    idBank: row.idBanco,
    bank: row.banco,
    idType: row.idTipo,
    type: row.tipo,
    name: row.nombre,
    number: row.numero,
    img: getRouteFile(row.imagen),
    delete: row.puedeEliminar,
    pound: row.moneda,
    codPound: row.codMoneda,
    idPound: row.idMoneda,
    owner: row.propietario
  }));
