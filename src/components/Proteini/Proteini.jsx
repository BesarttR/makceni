import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";

import kamLogo from "../../logos/kam.jpg";
import tinexLogo from "../../logos/tinex.png";
import veroLogo from "../../logos/vero.png";
import stokomakLogo from "../../logos/stokomak.png";
import kipperLogo from "../../logos/kipper.png";
import ramstoreLogo from "../../logos/ramstore.png";

const storeLogos = {
  KAM: kamLogo,
  Tinex: tinexLogo,
  Vero: veroLogo,
  Stokomak: stokomakLogo,
  Kipper: kipperLogo,
  Ramstore: ramstoreLogo,
};

const products = [
  {
    id: "eggs",
    nameKey: "eggs",
    prices: {
      KAM: 189,
      Tinex: 212,
      Vero: 224,
      Stokomak: 189,
      Kipper: 183,
      Ramstore: 224,
    },
  },
  {
    id: "chicken_steak",
    nameKey: "chicken_steak",
    prices: {
      KAM: 145,
      Tinex: 187,
      Vero: 186,
      Stokomak: 144,
      Kipper: 138,
      Ramstore: 189,
    },
  },
  {
    id: "chicken_drumsticks",
    nameKey: "chicken_drumsticks",
    prices: {
      KAM: 145,
      Tinex: 187,
      Vero: 186,
      Stokomak: 144,
      Kipper: 138,
      Ramstore: 189,
    },
  },
  {
    id: "beef",
    nameKey: "beef",
    prices: {
      KAM: 670,
      Tinex: 672,
      Vero: 671,
      Stokomak: 629,
      Kipper: 613,
      Ramstore: 774,
    },
  },
  {
    id: "minced_beef",
    nameKey: "minced_beef",
    prices: {
      KAM: 670,
      Tinex: 672,
      Vero: 671,
      Stokomak: 629,
      Kipper: 613,
      Ramstore: 774,
    },
  },
  {
    id: "canned_tuna",
    nameKey: "canned_tuna",
    prices: {
      KAM: 70,
      Tinex: 72,
      Vero: 71,
      Stokomak: 69,
      Kipper: 63,
      Ramstore: 74,
    },
  },
];

function Proteini({ categoryName, categoryIcon: CategoryIcon, mainTitleIcon: MainTitleIcon }) {
  const { t } = useTranslation();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const iconColor = "#000";
  const iconSize = 20;

  return (
    <div className="main-content-container">
      {isMobile ? (
        <>
          {!selectedProduct && (
            <div className="product-list-column">
              <div className="main-category-title">
                <MainTitleIcon color={iconColor} width={iconSize} height={iconSize} />
                {categoryName}
              </div>
              <div className="product-list">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className={`product-row ${selectedProduct?.id === p.id ? "active-product" : ""}`}
                    onClick={() => setSelectedProduct(p)}
                  >
                    <div className="product-name">{t(p.nameKey)}</div>
                    <div className="product-price">
                      {`${Math.min(...Object.values(p.prices))} - ${Math.max(
                        ...Object.values(p.prices)
                      )} MKD`}
                      <span className="click-arrow">{"❯"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedProduct && (
            <div className="store-prices-column">
              <div className="store-prices-header">
                <button className="back-button" onClick={() => setSelectedProduct(null)}>
                  ❮
                </button>
                <div className="product-specific-title">
                  <MainTitleIcon color={iconColor} width={iconSize} height={iconSize} />
                  {t(selectedProduct.nameKey)}
                </div>
              </div>
              <div className="store-prices-list">
                <div className="store-list-header">
                  <div className="store-name-header">{t("store")}</div>
                  <div className="store-price-header">{t("price_mkd")}</div>
                </div>
                {Object.entries(selectedProduct.prices).map(([store, price]) => (
                  <div key={store} className="store-row">
                    <div className="store-name">
                      <img
                        src={storeLogos[store]}
                        alt={`${store} logo`}
                        style={{ width: 24, height: 24, marginRight: 8, verticalAlign: "middle" }}
                      />
                      {store}
                    </div>
                    <div className="store-price">{price}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="main-content-columns">
          <div className="product-list-column">
            <div className="main-category-title">
              <MainTitleIcon color={iconColor} width={iconSize} height={iconSize} />
              {categoryName}
            </div>
            <div className="product-list">
              {products.map((p) => (
                <div
                  key={p.id}
                  className={`product-row ${selectedProduct?.id === p.id ? "active-product" : ""}`}
                  onClick={() => setSelectedProduct(p)}
                >
                  <div className="product-name">{t(p.nameKey)}</div>
                  <div className="product-price">
                    {`${Math.min(...Object.values(p.prices))} - ${Math.max(
                      ...Object.values(p.prices)
                    )} MKD`}
                    <span className="click-arrow">{"❯"}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedProduct && (
            <div className="store-prices-column">
              <div className="store-prices-header">
                <button className="back-button" onClick={() => setSelectedProduct(null)}>
                  ❮
                </button>
                <div className="product-specific-title">
                  <MainTitleIcon color={iconColor} width={iconSize} height={iconSize} />
                  {t(selectedProduct.nameKey)}
                </div>
              </div>
              <div className="store-prices-list">
                <div className="store-list-header">
                  <div className="store-name-header">{t("store")}</div>
                  <div className="store-price-header">{t("price_mkd")}</div>
                </div>
                {Object.entries(selectedProduct.prices).map(([store, price]) => (
                  <div key={store} className="store-row">
                    <div className="store-name">
                      <img
                        src={storeLogos[store]}
                        alt={`${store} logo`}
                        style={{ width: 24, height: 24, marginRight: 8, verticalAlign: "middle" }}
                      />
                      {store}
                    </div>
                    <div className="store-price">{price}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Proteini;
