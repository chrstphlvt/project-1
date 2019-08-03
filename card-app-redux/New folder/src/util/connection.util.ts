import { Pool } from 'pg';


// pesonal info for access to the cloud server
const connectionConfiguration = {
    user: process.env.REIMBURSE_DB_USERNAME,
    host: process.env.REIMBURSE_DB_URL || 'localhost',
    database: process.env.REIMBURSE_DB_NAME || 'project0',
    password: process.env.REIMBURSE_DB_PASSWORD,
    port: +process.env.REIMBURSE_DB_PORT || 5432,
    max: 5
};
console.log(connectionConfiguration);
export const connectionPool = new Pool(connectionConfiguration);