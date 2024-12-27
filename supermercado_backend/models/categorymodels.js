import connectionMysql from "../db/db.js"; 

const postCreateCategory = async (nome) => {
    const connection = await connectionMysql()
    const [result] = await connection.execute('INSERT INTO categorias (nome) VALUES (?)', [nome])
    return result
}

const getCategory = async() =>{
    const connection = await connectionMysql()
    const [resultCategory] = await connection.execute('SELECT * FROM categorias')
    return resultCategory
}

const deleteCategory =  async(categoryId)=>{
    const connection = await connectionMysql()
 
    try{
        const [row] = await connection.query('SELECT id FROM categorias WHERE id = ?', [categoryId])
        if(row.length === 0){
            throw new Error('Categoria não encontrada')
        }

        const [rows] = await connection.query('SELECT COUNT(*) AS total FROM produtos WHERE categoria_id = ?',[categoryId])
        if(rows[0].total > 0){
            throw new Error('Não é possível excluir a categoria. Existem produtos associados a ela.')
        }

        const [result] = await connection.query('DELETE FROM categorias WHERE id = ?',[categoryId])
        if(result.affectedRows === 0){
            throw new Error('Erro ao excluir a categoria. Nenhuma linha foi afetada.');
        }

    }catch(error){
        console.error('Erro ao deleta a categoria', error)
    }finally{
        await connection.end()
    }
}


export default {postCreateCategory, getCategory, deleteCategory}    