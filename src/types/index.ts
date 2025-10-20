export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  category: string;
  description: string;
}

export interface OrderDetails {
  product: Product;
  paymentMethod: 'pix' | 'cartao' | 'dinheiro';
  deliveryMethod: 'retirada' | 'entrega';
  address?: string;
}