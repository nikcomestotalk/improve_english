import { readFileSync } from 'fs';
import { resolve } from 'path';
import * as XLSX from 'xlsx';

export default defineEventHandler(async (event) => {
    try {
        // Read the Excel file directly from the filesystem (server-side only)
        // Nuxt public directory maps to the root directory during development,
        // but it is available in runtime assets or public folder in production.
        const filePath = resolve(process.cwd(), 'public', 'data', 'et.xlsx');

        const fileBuffer = readFileSync(filePath);

        // Parse the workbook
        const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

        const data: Record<string, any> = {};
        workbook.SheetNames.forEach((sheetName) => {
            const worksheet = workbook.Sheets[sheetName];
            data[sheetName] = XLSX.utils.sheet_to_json(worksheet);
        });

        return data;

    } catch (error) {
        console.error("Failed to read Excel data on the server:", error);

        throw createError({
            statusCode: 500,
            statusMessage: 'Failed to load grammar data',
        });
    }
});
