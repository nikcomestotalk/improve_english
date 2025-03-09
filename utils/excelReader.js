import * as XLSX from 'xlsx';

export async function readExcel(file) {
  const response = await fetch(file);
  const arrayBuffer = await response.arrayBuffer();
  const workbook = XLSX.read(arrayBuffer, { type: 'array' });

  const data = {};
  workbook.SheetNames.forEach((sheetName) => {
    const worksheet = workbook.Sheets[sheetName];
    data[sheetName] = XLSX.utils.sheet_to_json(worksheet);
  });

  return data;
}

