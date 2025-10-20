'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '@/types';
import styles from '@/styles/ProductGrid.module.css';
import { useCart } from './CartContext';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  const { addToCart, cartItems, getTotalItems } = useCart();

  const handleBuyClick = (product: Product, event: React.MouseEvent) => {
    // Adiciona ao carrinho (dispara o efeito da bola)
    addToCart(product);
    
    // Cria efeito visual de confirmação no botão
    const button = event.currentTarget as HTMLButtonElement;
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = 'scale(1)';
    }, 150);
  };

  // Função para verificar se o produto já está no carrinho
  const isProductInCart = (productId: number) => {
    return cartItems.some(item => item.product.id === productId);
  };

  // Função para obter a quantidade do produto no carrinho
  const getProductQuantity = (productId: number) => {
    const item = cartItems.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  return (
    <>
      <section className={styles.productsSection}>
        <div className={styles.productsGrid}>
          {products.map((product, index) => (
            <div key={product.id} className={styles.productCard} style={{ animationDelay: `${index * 0.1}s` }}>
              <Image 
                src={product.image} 
                alt={product.name}
                className={styles.productImage}
                width={400}
                height={250}
              />
              <div className={styles.productContent}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
                
                {/* Indicador se o produto está no carrinho */}
                {isProductInCart(product.id) && (
                  <div className={styles.cartIndicator}>
                    <span>🛒 No carrinho: {getProductQuantity(product.id)}</span>
                  </div>
                )}
                
                <div className={styles.productFooter}>
                  <span className={styles.productPrice}>
                    R$ {product.price.toFixed(2)}
                  </span>
                  <button 
                    className={`${styles.buyButton} ${
                      isProductInCart(product.id) ? styles.inCart : ''
                    }`}
                    onClick={(e) => handleBuyClick(product, e)}
                  >
                    {isProductInCart(product.id) ? 'Adicionar Mais' : 'Comprar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicador do total de itens no carrinho */}
        <div className={styles.cartSummary}>
          <span>Total no carrinho: {getTotalItems()} itens</span>
        </div>
      </section>
    </>
  );
};

export default ProductGrid;