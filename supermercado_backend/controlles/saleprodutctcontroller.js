import Products from '../models/saleproductmodels.js'

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


