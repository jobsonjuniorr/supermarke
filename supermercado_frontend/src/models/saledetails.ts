export interface Sale {
  id: number;
  data: string;
  total: number; // Total da venda
}

export interface SaleItem {
  produto_id: number; // ID do produto
  produto_nome?: string; // Nome do produto (opcional para exibição)
  quantidade: number; // Quantidade do item
  preco?: number; // Preço unitário do produto (opcional para criação)
  subtotal?: number; // Subtotal do item (opcional para cálculo)
}

export interface Item extends SaleItem {
  produto_nome: string; // Nome obrigatório para exibição
  preco: number; // Preço unitário do produto
  subtotal: number; // Total do item (quantidade * preço)
}

export interface SaleDetails {
  sale: {
    id: number;
    data: string;
  };
  items: Item[]; // Detalhes dos itens da venda
}

export interface CreateSaleRequest {
  itens: SaleItem[]; // Itens a serem enviados para criar a venda
  data?: string; // Data opcional da venda
}
