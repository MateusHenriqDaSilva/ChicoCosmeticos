import React from 'react';
import styles from '@/styles/Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerColumns}>
          {/* Coluna 1 - Informações da empresa */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Chico Cosmeticos</h4>
            <p className={styles.companyInfo}>
              Linha exclusiva de cosméticos, incluindo perfumes e remedios.
            </p>
            <div className={styles.contactInfo}>
              <div className={styles.contactItem}>
                <span>📧</span>
                <span>chicocosmeticos2025@gmail.com</span>
              </div>
              <div className={styles.contactItem}>
                <span>📱</span>
                <span>(14) 99111-4764</span>
              </div>
              <div className={styles.contactItem}>
                <span>🕒</span>
                <span>Seg - Sex: 8h às 18h</span>
              </div>
            </div>
          </div>

          {/* Coluna 2 - Direitos e localização */}
          <div className={styles.footerColumn}>
            <h4 className={styles.columnTitle}>Localização</h4>
            <p className={styles.address}>
              Rua Rio Branco 5-38 Sala 71 Centro, Bauru – SP
            </p>
            <div className={styles.copyrightSection}>
              <p className={styles.copyright}>
                &copy; {new Date().getFullYear()} Chico Cosmeticos
              </p>
              <p className={styles.rights}>
                Todos os direitos reservados
              </p>
              <p className={styles.development}>
                Desenvolvimento: Mahends
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
