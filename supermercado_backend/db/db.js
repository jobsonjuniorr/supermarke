import mysql from 'mysql2/promise'

const connectionMysql = async () =>{
    let connection;
    try{
         connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'admin',
            database:'supermercado'
        })
        console.log('Conectado com sucesso')
        return connection
    }catch(error){
        console.error('Erro ao conectar com banco de daos',error)
        process.exit(1)
    }
}

export default connectionMysql