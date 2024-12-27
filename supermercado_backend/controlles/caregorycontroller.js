import Products from '../models/categorymodels.js'

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
