import connectionMysql from "../db/db.js";


const getAllProducts = async () => {
    const connection = await connectionMysql();
    const [rows] = await connection.execute('SELECT * FROM produtos')
    return rows
}

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

const postCreateProducts = async (nome, preco, quantidade_em_estoque, categoria_id) => {
    const connection = await connectionMysql()
    const [resultProducts] = await connection.execute('INSERT INTO produtos (nome,preco,quantidade_em_estoque,categoria_id) VALUES (?,?,?,?)', [nome, preco, quantidade_em_estoque, categoria_id])
    return resultProducts
}

const createSale = async (data, total) => {
    const connection = await connectionMysql()
    const [resultSale] = await connection.execute('INSERT INTO vendas (data, total) VALUES (?, ?)',
        [data, total])
    await connection.end();
    return resultSale.insertId
}

const postRegisterSale = async (saleId, items) => {
    const connection = await connectionMysql();

    try {
        const valoresParaInserir = [];

        for (const item of items) {
            if (!item.produto_id) {
                throw new Error("É necessário informar o ID do produto.");
            }

            // Buscar produto pelo ID
            const query = "SELECT id, quantidade_em_estoque, preco FROM produtos WHERE id = ?";
            const [product] = await connection.query(query, [item.produto_id]);

            if (product.length === 0) {
                throw new Error(`Produto não encontrado: ID ${item.produto_id}.`);
            }

            const estoqueAtual = product[0].quantidade_em_estoque;
            const precoUnitario = product[0].preco;

            if (estoqueAtual < item.quantidade) {
                throw new Error(
                    `Estoque insuficiente para o produto: ID ${item.produto_id}. 
                    Estoque disponível: ${estoqueAtual}, solicitado: ${item.quantidade}.`
                );
            }

            valoresParaInserir.push([
                saleId,
                product[0].id,
                item.quantidade,
                precoUnitario,
            ]);
        }

        // Inserir itens na tabela itens_venda
        await connection.query(
            "INSERT INTO itens_venda (venda_id, produto_id, quantidade, preco) VALUES ?",
            [valoresParaInserir]
        );

        // Atualizar estoque
        for (const item of items) {
            await connection.query(
                    "UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque - ? WHERE id = ?",
                    [item.quantidade, item.produto_id]
            );
        }
    } catch (error) {
        throw error;
    } finally {
        await connection.end();
    }
};

const getAllSales = async () => {
    const connection = await connectionMysql();
    try {
        const [sales] = await connection.execute(`
            SELECT 
                v.id AS venda_id, 
                v.data, 
                v.total, 
                p.nome AS produto, 
                c.nome AS categoria
            FROM vendas v
            JOIN itens_venda iv ON v.id = iv.venda_id
            JOIN produtos p ON iv.produto_id = p.id
            JOIN categorias c ON p.categoria_id = c.id
            ORDER BY v.data DESC, v.id
        `);
        return sales;
    } finally {
        await connection.end();
    }
};


const getProductById = async (productId) => {
    const connection = await connectionMysql();
    try {
        const [result] = await connection.query(
            'SELECT id, preco FROM produtos WHERE id = ?',
            [productId]
        );
        return result;
    } finally {
        await connection.end();
    }
};

const deleteSale = async (saleId) => {
    const connection = await connectionMysql();
    try {
        await connection.beginTransaction();
        const [items] = await connection.query(
            'SELECT produto_id, quantidade FROM itens_venda WHERE venda_id = ?',
            [saleId]
        );
        if (items.length === 0) {
            throw new Error(`Venda com ID ${saleId} não encontrada.`);
        }
        for (const item of items) {
            await connection.query(
                'UPDATE produtos SET quantidade_em_estoque = quantidade_em_estoque + ? WHERE id = ?',
                [item.quantidade, item.produto_id]
            );
        }
        await connection.query('DELETE FROM itens_venda WHERE venda_id = ?', [saleId]);
        await connection.query('DELETE FROM vendas WHERE id = ?', [saleId]);
        await connection.commit();
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        await connection.end();
    }
};
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


export default { getAllProducts, postCreateCategory, postCreateProducts, postRegisterSale, createSale, getAllSales, getProductById, deleteSale, getCategory, deleteCategory}