import React, { useEffect, useState } from 'react';
import api, { getSale } from '../../service/api';
import DeleteSale from '../../components/saledeleteregister'
import { format } from 'date-fns'

const SaleList: React.FC = () => {
    const [sales, setSales] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchSales = async () => {
        try {
            const response = await getSale()

            setSales(response.data)
            setLoading(false)
        } catch (err) {
            setError('Erro ao carregar as vendas')
        }
    }

    useEffect(() => {
        fetchSales()
    }, [])
    if (loading) return <p>Carregar vendas...</p>
    if (error) return <p>{error}</p>

    const formateDate = (dateString: string | number | Date, dateFormat = 'dd/MM/yyyy') => {
        if (!dateString) return 'Data inválida'
        try {
            return format(new Date(dateString), dateFormat)
        } catch (err) {
            return 'Data inválida'
        }
    }
  
    return (
        <div>
            <h2>Registros de venda </h2>

            <ul>
                {sales.map((sale) => (
                    <li key={sale.venda_id}>
              
                        <span>{formateDate(sale.data)} - R${sale.total} - {sale.produto} - {sale.categoria} {sale.venda_id} </span>
                        <DeleteSale saleId={sale.venda_id} onDeleteSuccess={() => fetchSales()} />
                    </li>
                ))}
            </ul>
        </div>
    )

}
export default SaleList