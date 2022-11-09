import {Pool} from 'pg'

let conn: any

if (!conn) {
    conn = new Pool({
        user: process.env.USER,
        password: process.env.PASSWORD,
        host: 'localhost',
        port: 5432, //puerto predeterminado para POSTGRES
        database: process.env.DATABASE
    })
}

export default conn