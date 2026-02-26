import * as XLSX from 'xlsx';

export default defineEventHandler(async (event) => {
    // Read the Excel file securely using Nitro's Storage layer
    // This ensures the file is natively bundled into Vercel Serverless functions.
    const rawBuffer = await useStorage().getItemRaw('assets:server:data:et.xlsx');

    if (!rawBuffer) {
        const keys = await useStorage('assets:server').getKeys();
        throw new Error("Excel asset not found in storage. Available keys: " + keys.join(', '));
    }

    const fileBuffer = Buffer.from(rawBuffer as any);

    // Parse the workbook
    const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

    const data: Record<string, any> = {};
    workbook.SheetNames.forEach((sheetName) => {
        const worksheet = workbook.Sheets[sheetName];
        data[sheetName] = XLSX.utils.sheet_to_json(worksheet);
    });

    return data;
});
