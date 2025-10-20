'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from '@/styles/ProductCarousel.module.css';
import { Product } from '@/types';
import { useCart } from './CartContext';

const ProductCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [productsPerView, setProductsPerView] = useState(3);
  const { addToCart, cartItems, getTotalItems } = useCart();
  
  const products: Product[] = [
    { id: 1, name: 'Porta-joias Resina', image: '/destaque1.jpg', price: 89.90, category: 'essencia', description: 'Porta-joias em resina artesanal' },
    { id: 2, name: 'Abajur Decorativo', image: '/destaque2.jpg', price: 149.90, category: 'essencia', description: 'Abajur decorativo em resina' },
    { id: 3, name: 'Escultura Resina', image: '/destaque3.jpg', price: 199.90, category: 'essencia', description: 'Escultura exclusiva em resina' },
    { id: 4, name: 'Bandija Resina', image: '/destaque4.jpg', price: 79.90, category: 'essencia', description: 'Bandija decorativa em resina' },
    { id: 5, name: 'Vaso Artesanal', image: '/destaque5.jpg', price: 99.90, category: 'essencia', description: 'Vaso artesanal premium' },
    { id: 6, name: 'Cubo Decorativo', image: '/destaque6.jpg', price: 69.90, category: 'essencia', description: 'Cubo decorativo moderno' },
    { id: 7, name: 'Porta-retrato', image: '/destaque7.jpg', price: 59.90, category: 'essencia', description: 'Porta-retrato personalizado' },
    { id: 8, name: 'Luminária Resina', image: '/destaque8.jpg', price: 129.90, category: 'essencia', description: 'Luminária em resina artesanal' },
    { id: 9, name: 'Cachepô Moderno', image: '/destaque9.jpg', price: 89.90, category: 'essencia', description: 'Cachepô moderno decorativo' },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setProductsPerView(1);
      } else if (window.innerWidth < 768) {
        setProductsPerView(2);
      } else {
        setProductsPerView(3);
      }
      setCurrentIndex(0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalSlides = Math.ceil(products.length / productsPerView);

  // CÁLCULO SIMPLES E CORRETO
  const getTransformValue = () => {
    return `translateX(-${currentIndex * 100}%)`;
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex >= totalSlides - 1) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      if (prevIndex <= 0) {
        return totalSlides - 1;
      }
      return prevIndex - 1;
    });
  };

  const goToSlide = (index: number) => {
    if (index >= 0 && index < totalSlides) {
      setCurrentIndex(index);
    }
  };

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
      <section className={styles.carouselSection}>
        {/* <h2 className={styles.title}>Produtos em Destaque</h2> */}
        
        <div className={styles.carouselContainer}>
          <div 
            className={styles.carouselTrack}
            style={{ transform: getTransformValue() }}
          >
            {products.map((product) => (
              <div key={product.id} className={styles.carouselSlide}>
                <div className={styles.carouselSlideContent}>
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    className={styles.productImage}
                    width={400}
                    height={300}
                    priority
                  />
                  <div className={styles.productInfo}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productPrice}>R$ {product.price.toFixed(2)}</p>
                    
                    {/* Indicador se o produto está no carrinho */}
                    {isProductInCart(product.id) && (
                      <div className={styles.cartIndicator}>
                        <span>🛒 No carrinho: {getProductQuantity(product.id)}</span>
                      </div>
                    )}
                    
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

          <button 
            onClick={prevSlide}
            className={`${styles.navButton} ${styles.prevButton}`}
            aria-label="Slide anterior"
          >
            <ChevronLeft size={18} />
          </button>
          
          <button 
            onClick={nextSlide}
            className={`${styles.navButton} ${styles.nextButton}`}
            aria-label="Próximo slide"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className={styles.carouselIndicators}>
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentIndex ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Ir para slide ${index + 1}`}
            />
          ))}
        </div>
      </section>
    </>
  );
};

export default ProductCarousel;