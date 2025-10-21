//funciones para controlar arvhivos

import {promises as fs} from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const deleteFile = async(file, folder) =>{
    const filePath = path.join(__dirname, '../public/images', folder, file);
    try {
        await fs.unlink(filePath)
        
        
    } catch (error) {
        throw error;
    }
}

export default deleteFile;

