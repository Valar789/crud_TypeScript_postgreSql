
import {Pool} from 'pg'

let conn: any

if (!conn) {
    conn = new Pool({
        user: process.env.POSTGRES_USER, 
        password: process.env.POSTGRES_PASSWORD, 
        host: 'localhost',
        port: 5432,
        database: process.env.POSTGRES_DATABASE
    })
 
}

export default conn