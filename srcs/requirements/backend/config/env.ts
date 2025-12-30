export const POSTGRES_DB = process.env.POSTGRES_DB || 'transcendence';
export const POSTGRES_USER = process.env.POSTGRES_USER || 'trans_user';
export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || 'trans_pass';
export const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;
