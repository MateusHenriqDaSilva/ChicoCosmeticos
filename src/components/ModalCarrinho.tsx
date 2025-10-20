'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Trash2, Heart, Share2 } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from './CartContext';
import styles from '@/styles/ModalCarrinho.module.css';

interface ModalCarrinhoProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const ModalCarrinho: React.FC<ModalCarrinhoProps> = ({ isOpen, onClose }) => {
  const { cartItems, addToCart, removeFromCart, clearCart, getTotalItems } = useCart();
  const [savedItems, setSavedItems] = useState<CartItem[]>([]);

  // Produtos relacionados (exemplo)
  const relatedProducts: Product[] = [
    { id: 10, name: 'Kit Presente Premium', image: '/related1.jpg', price: 199.90, category: 'presente', description: 'Kit especial para presentear' },
    { id: 11, name: 'Perfume Importado', image: '/related2.jpg', price: 159.90, category: 'perfume', description: 'Fragrância exclusiva' },
    { id: 12, name: 'Creme Hidratante', image: '/related3.jpg', price: 89.90, category: 'creme', description: 'Hidratação profunda' },
  ];

  // Calcular totais
  const subtotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const totalItems = getTotalItems();
  
  // Aplicar desconto para compras acima de R$ 100
  const discount = subtotal > 100 ? subtotal * 0.1 : 0; // 10% de desconto
  const total = subtotal - discount;

  // Funções do carrinho
  const increaseQuantity = (product: Product) => {
    addToCart(product);
  };

  const decreaseQuantity = (productId: number) => {
    const item = cartItems.find(item => item.product.id === productId);
    if (item && item.quantity > 1) {
      // Se tem mais de 1, apenas diminui a quantidade
      removeFromCart(productId);
      addToCart(item.product); // Adiciona novamente com quantidade -1
    } else {
      // Se tem apenas 1, remove do carrinho
      removeFromCart(productId);
    }
  };

  const removeItem = (productId: number) => {
    removeFromCart(productId);
  };

  const saveForLater = (item: CartItem) => {
    setSavedItems(prev => [...prev, item]);
    removeFromCart(item.product.id);
  };

  const moveToCart = (item: CartItem) => {
    addToCart(item.product);
    setSavedItems(prev => prev.filter(saved => saved.product.id !== item.product.id));
  };

  const removeSaved = (productId: number) => {
    setSavedItems(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleConfirmPurchase = () => {
    const whatsappNumber = "14991114764";
    
    let message = `🛒 *PEDIDO - Chico Cosméticos*\n\n`;
    message += `*Itens do Pedido:*\n`;
    
    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} - ${item.quantity}x R$ ${item.product.price.toFixed(2)}\n`;
    });
    
    message += `\n*Resumo do Pedido:*\n`;
    message += `📦 Itens: ${totalItems}\n`;
    message += `💰 Subtotal: R$ ${subtotal.toFixed(2)}\n`;
    if (discount > 0) {
      message += `🎁 Desconto (10%): -R$ ${discount.toFixed(2)}\n`;
    }
    message += `💵 *Total: R$ ${total.toFixed(2)}*\n\n`;
    message += `Por favor, confirme meu pedido!`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        {/* Header do Modal */}
        <div className={styles.modalHeader}>
          <h2>🛒 Meu Carrinho ({totalItems} itens)</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <X size={24} />
          </button>
        </div>

        <div className={styles.modalContent}>
          
          {/* Layout de 2 colunas */}
          <div className={styles.twoColumnLayout}>
            
            {/* COLUNA ESQUERDA - Lista de Produtos */}
            <div className={styles.leftColumn}>
              
              {/* Lista de Itens no Carrinho */}
              <div className={styles.cartItemsSection}>
                <h3>Itens no Carrinho</h3>
                {cartItems.length === 0 ? (
                  <div className={styles.emptyCart}>
                    <p>Seu carrinho está vazio</p>
                    <span>Adicione produtos incríveis! ✨</span>
                  </div>
                ) : (
                  <div className={styles.itemsList}>
                    {cartItems.map((item) => (
                      <div key={item.product.id} className={styles.cartItem}>
                        <Image 
                          src={item.product.image} 
                          alt={item.product.name}
                          className={styles.itemImage}
                          width={80}
                          height={80}
                        />
                        
                        <div className={styles.itemDetails}>
                          <h4>{item.product.name}</h4>
                          <p className={styles.itemDescription}>{item.product.description}</p>
                          <div className={styles.itemPrice}>
                            R$ {item.product.price.toFixed(2)}
                          </div>
                        </div>

                        <div className={styles.itemControls}>
                          <div className={styles.quantityControls}>
                            <button 
                              onClick={() => decreaseQuantity(item.product.id)}
                              className={styles.quantityBtn}
                            >
                              <Minus size={16} />
                            </button>
                            <span className={styles.quantity}>{item.quantity}</span>
                            <button 
                              onClick={() => increaseQuantity(item.product)}
                              className={styles.quantityBtn}
                            >
                              <Plus size={16} />
                            </button>
                          </div>

                          <div className={styles.itemTotal}>
                            R$ {(item.product.price * item.quantity).toFixed(2)}
                          </div>

                          <div className={styles.itemActions}>
                            <button 
                              onClick={() => saveForLater(item)}
                              className={styles.saveBtn}
                              title="Salvar para depois"
                            >
                              <Heart size={16} />
                            </button>
                            <button 
                              onClick={() => removeItem(item.product.id)}
                              className={styles.removeBtn}
                              title="Remover item"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Itens Salvos para Depois */}
              {savedItems.length > 0 && (
                <div className={styles.savedItemsSection}>
                  <h3>💝 Salvos para Depois</h3>
                  <div className={styles.savedItemsList}>
                    {savedItems.map((item) => (
                      <div key={item.product.id} className={styles.savedItem}>
                        <Image 
                          src={item.product.image} 
                          alt={item.product.name}
                          className={styles.savedImage}
                          width={60}
                          height={60}
                        />
                        <div className={styles.savedDetails}>
                          <h5>{item.product.name}</h5>
                          <span>R$ {item.product.price.toFixed(2)}</span>
                        </div>
                        <div className={styles.savedActions}>
                          <button 
                            onClick={() => moveToCart(item)}
                            className={styles.moveToCartBtn}
                          >
                            Mover para Carrinho
                          </button>
                          <button 
                            onClick={() => removeSaved(item.product.id)}
                            className={styles.removeSavedBtn}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Produtos Relacionados */}
              <div className={styles.relatedProductsSection}>
                <h3>🔥 Produtos Relacionados</h3>
                <div className={styles.relatedProductsGrid}>
                  {relatedProducts.map((product) => (
                    <div key={product.id} className={styles.relatedProduct}>
                      <Image 
                        src={product.image} 
                        alt={product.name}
                        className={styles.relatedImage}
                        width={70}
                        height={70}
                      />
                      <div className={styles.relatedDetails}>
                        <h5>{product.name}</h5>
                        <span className={styles.relatedPrice}>
                          R$ {product.price.toFixed(2)}
                        </span>
                        <button 
                          onClick={() => addToCart(product)}
                          className={styles.addRelatedBtn}
                        >
                          Adicionar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* COLUNA DIREITA - Resumo e Estatísticas */}
            <div className={styles.rightColumn}>
              <div className={styles.summaryCard}>
                <h3>📊 Resumo do Pedido</h3>
                
                <div className={styles.summaryItem}>
                  <span>Itens no carrinho:</span>
                  <span>{totalItems}</span>
                </div>
                
                <div className={styles.summaryItem}>
                  <span>Subtotal:</span>
                  <span>R$ {subtotal.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className={styles.summaryItem}>
                    <span>🎁 Desconto (10%):</span>
                    <span className={styles.discount}>-R$ {discount.toFixed(2)}</span>
                  </div>
                )}

                <div className={styles.summaryItem}>
                  <span>Frete:</span>
                  <span className={styles.freeShipping}>Grátis</span>
                </div>

                <div className={styles.total}>
                  <span>Total a Pagar:</span>
                  <span className={styles.totalPrice}>R$ {total.toFixed(2)}</span>
                </div>

                {/* Estatísticas */}
                <div className={styles.stats}>
                  <div className={styles.statItem}>
                    <span>💰 Economia total:</span>
                    <span>R$ {discount.toFixed(2)}</span>
                  </div>
                  {subtotal < 100 && (
                    <div className={styles.promoAlert}>
                      🎊 Adicione R$ {(100 - subtotal).toFixed(2)} e ganhe 10% de desconto!
                    </div>
                  )}
                </div>

                {/* Ações */}
                <div className={styles.actions}>
                  <button 
                    className={styles.confirmButton}
                    onClick={handleConfirmPurchase}
                    disabled={cartItems.length === 0}
                  >
                    ✅ Confirmar Compra
                  </button>
                  
                  <button 
                    className={styles.continueShopping}
                    onClick={onClose}
                  >
                    🛍️ Continuar Comprando
                  </button>

                  {cartItems.length > 0 && (
                    <button 
                      className={styles.clearCart}
                      onClick={clearCart}
                    >
                      🗑️ Limpar Carrinho
                    </button>
                  )}
                </div>

                {/* Informações de Pagamento */}
                <div className={styles.paymentInfo}>
                  <h4>💳 Formas de Pagamento</h4>
                  <div className={styles.paymentMethods}>
                    <span>• PIX</span>
                    <span>• Cartão de Crédito</span>
                    <span>• Cartão de Débito</span>
                    <span>• Dinheiro</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCarrinho;