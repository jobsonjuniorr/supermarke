import React, { useState } from "react";
import api, { deleteSale } from "../service/api";

interface DeleteSaleProps {
    saleId: number;
    onDeleteSuccess: () => void;
  }
  
  const DeleteSale: React.FC<DeleteSaleProps> = ({ saleId, onDeleteSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const handleDelete = async () => {
      setLoading(true);
      try {
        await deleteSale(saleId) // saleId como número
        setLoading(false);
        onDeleteSuccess(); // Atualiza a lista após deleção
      } catch (err) {
        setLoading(false);
        setError('Erro ao excluir a venda');
      }
    };
  
    return (
      <div>
        {loading ? (
          <p>Deletando venda...</p>
        ) : (
          <button onClick={handleDelete}>
            Excluir
          </button>
        )}
        {error && <p>{error}</p>}
      </div>
    );
  };
  
  export default DeleteSale;