import {Pool} from 'pg'

let conn: any

if (!conn) {
    conn = new Pool({
        user: 'postgres',
        password:'123456',
        host: 'localhost',
        port: 5432,
        database: 'taskdb'
    })
}

export default conn