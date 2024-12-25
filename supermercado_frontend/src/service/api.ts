import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:5000'
})
export const getProducts = async () => {
    const response = await api.get('/api/products'); 
    return response.data;
};

export const createSale = async (itens: { produto_id: number; quantidade: number }[]) => {
    const response = await api.post('/api/sales', { itens });
    return response.data;
};

export const postCategory = async(nome:string) =>{
    const response = await api.post('/api/category',{nome})
    return response.data
}
export const getCategoryList = async() =>{
    const response = await api.get('/api/categorylist')
    return response.data
}

export const creatProdutc = async(nome:string, preco:number, quantidade_em_estoque: number, categoria_id: number)  =>{
    const response = await api.post('/api/createProduct',{nome,preco,quantidade_em_estoque,categoria_id})
    return response.data
}
export const deleteCategory = async (id: number) => {
    const response = await api.delete(`/api/deletecategory/${id}`);
    return response.data;
};

export const getSale = async () =>{
    const response = await api.get('/api/sales')
    return response
}

export const deleteSale = async(saleId:number) =>{
    const response = await api.delete(`/api/sales/${saleId}`)
    return response.data
}
export default api