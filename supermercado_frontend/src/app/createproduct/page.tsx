import React, { useEffect, useState } from "react";
import { creatProdutc, getCategoryList } from "../../service/api";

const CreateProduct: React.FC = () => {
    const [nameProduct, setNameProdcut] = useState<string>('');
    const [priceProduct, setPriceProdcut] = useState<number>(0);
    const [quantityStock, setQuantityStock] = useState<number>(0);
    const [categoryId, setCategoryId] = useState<number>(0);
    const [category, setCategory] = useState<any[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const categoryList = async () => {
        try {
            const respondeCategory = await getCategoryList();
            setCategory(respondeCategory);
        } catch (err) {
            setErrorMessage('Erro ao listar a categoria');
        }
    };

    const registerProduct = async () => {
        try {
            setIsLoading(true)
            const product = category.find((p: { id: number }) => p.id === categoryId);
            if (!product) {
                setErrorMessage('Produto não encontrado. Verifique o ID.');
                return; 
            }
            await creatProdutc(nameProduct, priceProduct, quantityStock,categoryId);
            alert(`Produto adicionado com sucesso.`);
            setCategoryId(0)
            setPriceProdcut(0)
            setQuantityStock(0)
            setNameProdcut('')
            setErrorMessage(null);
            setIsLoading(false)
        } catch (error) {
            setErrorMessage('Erro ao adicionar produto');
        }
    };

    useEffect(() => {
        categoryList();
    }, []);

    return (
        <div>
            {errorMessage && <p className="text-red-700">{errorMessage}</p>}
            <h2>Adicione um produto</h2>

                <input
                    type="text"
                    value={nameProduct}
                    onChange={(e) => setNameProdcut(e.target.value)}
                    placeholder="Digite o nome do produto"
                    className="bg-black text-white p-1 rounded-lg"
                />

                <label>Preço do produto</label>
                <input
                    type="number"
                    value={priceProduct}
                    onChange={(e) => setPriceProdcut(Number(e.target.value))}
                    placeholder="Preço do produto"
                    className="bg-black text-white p-1 rounded-lg"
                />

                <label>Quantidade do estoque</label>
                <input
                    type="number"
                    value={quantityStock}
                    onChange={(e) => setQuantityStock(Number(e.target.value))}
                    placeholder="Quantidade do estoque"
                    className="bg-black text-white p-1 rounded-lg"
                />

                <label>ID de categoria</label>
                <input
                    type="number"
                    value={categoryId}
                    onChange={(e) => setCategoryId(Number(e.target.value))}
                    placeholder="ID de categoria"
                    className="bg-black text-white p-1 rounded-lg"
                />
                <button onClick={registerProduct} disabled={isLoading}>{isLoading ?'Adicionando...':'Adicionar Produto'}</button>
      
        </div>
    );
};

export default CreateProduct;
