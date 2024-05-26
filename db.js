import pg from 'pg'

const pool = new pg.Pool({
    database: 'contactList',
    user: 'postgres',
    password: 'admin'
})

export default function query(text, params){
    return pool.query(text, params)
}