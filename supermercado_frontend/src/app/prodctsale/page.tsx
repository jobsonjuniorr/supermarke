import React, { useEffect, useState } from 'react';
import { createSale, getProducts, getSale } from '../../service/api';
import DeleteSale from '../../components/saledeleteregister';
import {format} from 'date-fns'
interface SaleItem {
    produto_id: number;
    quantidade: number;
}

const RegisterSale: React.FC = () => {
    const [productIdentifier, setProductIdentifier] = useState<string>(''); 
    const [quantity, setQuantity] = useState<number>(1);
    const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [legal, setLegal] = useState<any[]>([])
    const handleAddToSale = async () => {
        try {
            setErrorMessage(null);

            // Obter produto pelo nome ou ID
            const products = await getProducts();
            const product = products.find(
                (p: any) =>
                    p.id === Number(productIdentifier) ||
                    p.nome.toLowerCase() === productIdentifier.toLowerCase()
            );

            if (!product) {
                setErrorMessage('Produto não encontrado. Verifique o nome ou ID.');
                return;
            }

            // Adicionar produto à lista de itens da venda
            setSaleItems((prev) => {
                const existingItem = prev.find((item) => item.produto_id === product.id);
                if (existingItem) {
                    return prev.map((item) =>
                        item.produto_id === product.id
                            ? { ...item, quantidade: item.quantidade + quantity }
                            : item
                    );
                }
                return [...prev, { produto_id: product.id, quantidade: quantity }];
            });

            setProductIdentifier('');
            setQuantity(1);
        } catch (error: any) {
            setErrorMessage('Erro ao buscar produto. Tente novamente.');
        }
    };

    const handleCreateSale = async () => {
        try {
            const response = await createSale(saleItems);
            alert(`Venda registrada com sucesso! ID da venda: ${response.saleId}`);
            setSaleItems([]);
        } catch (error: any) {
            setErrorMessage(
                `Erro ao registrar venda: ${error.response?.data?.error || error.message}`
            );
        }
    };
    const deleteRegisterSale =  async()=>{
        try{
            const response = await getSale()
            setLegal(response.data)
         }catch(err){
            setErrorMessage(
                'Erro ao tenta excluir'
            )
        }
    }
    const formatData =  (dateString: string | number | Date, dateFormat = 'dd/MM/yyyy') =>{
        if(!dateString) return 'Data inválida'
        try{
            return format(new Date(dateString),dateFormat)
        }catch(err){
            return 'Data inválida'
        }
    }

    useEffect(()=>{
    deleteRegisterSale()
    },[])
    return (
        <div>
            <h1>Registrar Venda</h1>
            <div>
                <label>
                    Nome ou ID do Produto:
                    <input
                        type="text"
                        value={productIdentifier}
                        onChange={(e) => setProductIdentifier(e.target.value)}
                        placeholder="Nome ou ID do produto"
                    />
                </label>
                <label>
                    Quantidade:
                    <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        min="1"
                    />
                </label>
                <button onClick={handleAddToSale}>Adicionar</button>
            </div>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <h2>Itens para Venda</h2>
            {saleItems.length > 0 ? (
                <div>
                    <ul>
                        {saleItems.map((item) => (
                            <li key={item.produto_id}>
                                Produto ID {item.produto_id}: {item.quantidade} unidade(s)
                            </li>
                        ))}
                    </ul>
                    <button onClick={handleCreateSale}>Registrar Venda</button>
                </div>
            ) : (
                <p>Nenhum item adicionado à venda.</p>
            )}

            {legal.map((sale,index)=>{
                return(
                    <div>
                        <li key={index} className='list-none'>
                            <span>{formatData(sale.data)} - R${sale.total} - {sale.produto} - {sale.categoria} {sale.venda_id}</span>
                            <DeleteSale saleId={sale.venda_id} onDeleteSuccess={()=>deleteRegisterSale()}/>
                        </li>
                    </div>
                )
            })}
          
        </div>
    );
};

export default RegisterSale;
