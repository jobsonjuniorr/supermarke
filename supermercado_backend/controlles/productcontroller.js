import Products from '../models/productmodels.js'

export const getAllProductsHandler = async (req, res) => {
    try {
        const products = await Products.getAllProducts()
        res.status(200).json(products)

    } catch (error) {
        res.status(500).json({ error: 'Erro na busca produtos' })
    }
}

export const createCategory = async (req, res) => {
    try {
        const { nome } = req.body;
        await Products.postCreateCategory(nome)
        res.status(201).json({ message: 'Categoria Criada com sucesso!' })
    } catch (error) {
        console.error('Erro ao cadastrar uma nova categoria', error);
        res.status(500).json({ error: 'Erro ao cadastrar categoria' });
    }
}

export const getCategory =  async (req,res) =>{
    try{
        const categoryList = await Products.getCategory()
        res.status(200).json(categoryList)
    }catch(error){
        console.error('Erro na exibição do da categoria',error)
        res.status(500).json({error:'Erro na listagem da categoria'})
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

export const createRegisterSale = async (req, res) => {
    const { itens } = req.body;

    if (!Array.isArray(itens) || itens.length === 0) {
        return res.status(400).json({ message: "A lista de itens está vazia ou é inválida." });
    }

    const data = new Date();

    try {
        let total = 0;

        for (const item of itens) {
            if (!item.produto_id) {
                return res
                    .status(400)
                    .json({ message: "É necessário informar o ID do produto." });
            }

            const product = await Products.getProductById(item.produto_id);

            if (!product || product.length === 0) {
                return res.status(400).json({
                    message: `Produto não encontrado: ID ${item.produto_id}.`,
                });
            }

            total += product[0].preco * item.quantidade;
        }

        const saleId = await Products.createSale(data, total);
        await Products.postRegisterSale(saleId, itens);

        res.status(201).json({ message: "Venda registrada com sucesso", saleId });
    } catch (error) {
        console.error("Erro ao cadastrar registro de venda:", error.message);
        res.status(400).json({ error: error.message });
    }
};


export const getAllSalesHandle = async (req, res) => {
    try {
        const sales = await Products.getAllSales();
        res.status(200).json(sales);
    } catch (error) {
        console.error("Erro ao listar vendas:", error.message);
        res.status(500).json({ error: "Erro ao buscar vendas" });
    }
};

export const deleteRegisterSale = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'O ID da venda é obrigatório.' });
    }
    try {
        await Products.deleteSale(id);
        res.status(200).json({ message: `Venda com ID ${id} excluída com sucesso.` });
    } catch (error) {
        console.error('Erro ao excluir venda:', error.message);
        res.status(400).json({ error: error.message });
    }
};

export const deletecategory = async(req,res) =>{
    const id = parseInt(req.params.id,10)

    if (!id || isNaN(id)) {
        return res.status(400).json({ message: 'O ID da categoria é obrigatório e deve ser numérico.' });
    }

    try{
        await Products.deleteCategory(id)
        res.status(200).json({message:'Categoria excluida com sucesso.'})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

