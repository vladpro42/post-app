import pg from "pg"

const { Client } = pg

export const client = new Client(
    {
        user: 'postgres',
        password: '',
        host: 'localhost',
        port: 5432,
        database: 'app'
    }
)

