import connectionMysql from "../db/db.js";


const getAllProducts = async () => {
    const connection = await connectionMysql();
    const [rows] = await connection.execute('SELECT * FROM produtos')
    return rows
}


const postCreateProducts = async (nome, preco, quantidade_em_estoque, categoria_id) => {
    const connection = await connectionMysql()
    const [resultProducts] = await connection.execute('INSERT INTO produtos (nome,preco,quantidade_em_estoque,categoria_id) VALUES (?,?,?,?)', [nome, preco, quantidade_em_estoque, categoria_id])
    return resultProducts
}

export default { getAllProducts, postCreateProducts}