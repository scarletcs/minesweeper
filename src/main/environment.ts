import path from 'path';

export const DEV_MODE = process.env.NODE_ENV === 'development';
export const UI_PATH = path.resolve(__dirname, '../ui/');
