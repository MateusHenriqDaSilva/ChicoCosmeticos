'use client';

import React from 'react';
import styles from '@/styles/CategoryMenu.module.css';

interface CategoryMenuProps {
  activeCategory: 'essencia' | 'discretas';
  onCategoryChange: (category: 'essencia' | 'discretas') => void;
}

const CategoryMenu: React.FC<CategoryMenuProps> = ({ 
  activeCategory, 
  onCategoryChange 
}) => {
  const categories = [
    { id: 'essencia' as const, name: 'Essência' },
    { id: 'discretas' as const, name: 'Discretas' },
  ];

  return (
    <section className={styles.categorySection}>
      <h2 className={styles.title}>Nossas Categorias</h2>
      <div className={styles.categoriesContainer}>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`${styles.categoryButton} ${
              activeCategory === category.id ? styles.activeCategory : styles.inactiveCategory
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </section>
  );
};

export default CategoryMenu;