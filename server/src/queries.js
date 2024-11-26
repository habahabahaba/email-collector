export function getAllFromTable(table) {
  return /* sql */ `
     SELECT * FROM ${table}
    ;`;
}
export function getCountFromTable(table) {
  return [
    /* sql */ `
     SELECT 
        COUNT(*) AS 'count' 
     FROM 
        ${table} 
    ;`,
    'count',
  ];
}
