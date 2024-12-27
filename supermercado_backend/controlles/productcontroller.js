import Products from '../models/productmodels.js'

export const getAllProductsHandler = async (req, res) => {
    try {
        const products = await Products.getAllProducts()
        res.status(200).json(products)

    } catch (error) {
        res.status(500).json({ error: 'Erro na busca produtos' })
    }
}


export const createProduct = async (req, res) => {
    try {
        const { nome, preco, quantidade_em_estoque, categoria_id } = req.body
        await Products.postCreateProducts(nome, preco, quantidade_em_estoque, categoria_id)
        res.status(201).json({ message: 'Produto adicionado com sucesso.' })
    } catch (error) {
        console.error('Erro ao cadastrar o produto')
        res.status(500).json({ error: 'Erro ao cadastra o produto' })
    }
}

