export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: 'essencia' | 'discretas' ;
  description: string;
}

export interface OrderDetails {
  product: Product;
  paymentMethod: 'pix' | 'dinheiro' | 'cartao';
  deliveryMethod: 'retirada' | 'entrega';
  address?: string;
}