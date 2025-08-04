import React from "react";
import { useTranslation } from "react-i18next";
import "../../App.css";
import BreadIcon from "../../icons/bread-01-solid-standard";

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
    id: "white-bread",
    nameKey: "white_bread",
    prices: { KAM: 31, Tinex: 32, Vero: 31, Stokomak: 29, Kipper: 33, Ramstore: 34 },
    icon: BreadIcon,
  },
  {
    id: "brown-bread",
    nameKey: "brown_bread",
    prices: { KAM: 34, Tinex: 32, Vero: 31, Stokomak: 29, Kipper: 33, Ramstore: 34 },
    icon: BreadIcon,
  },
  {
    id: "white-flour",
    nameKey: "white_flour",
    prices: { KAM: 45, Tinex: 47, Vero: 46, Stokomak: 44, Kipper: 48, Ramstore: 49 },
    icon: BreadIcon,
  },
  {
    id: "brown-flour",
    nameKey: "brown_flour",
    prices: { KAM: 45, Tinex: 47, Vero: 46, Stokomak: 44, Kipper: 48, Ramstore: 49 },
    icon: BreadIcon,
  },
  {
    id: "rice",
    nameKey: "rice",
    prices: { KAM: 70, Tinex: 72, Vero: 71, Stokomak: 69, Kipper: 73, Ramstore: 74 },
    icon: BreadIcon,
  },
  {
    id: "beans",
    nameKey: "beans",
    prices: { KAM: 70, Tinex: 72, Vero: 71, Stokomak: 69, Kipper: 73, Ramstore: 74 },
    icon: BreadIcon,
  },
  {
    id: "spagheti",
    nameKey: "spagheti",
    prices: { KAM: 55, Tinex: 57, Vero: 56, Stokomak: 54, Kipper: 58, Ramstore: 59 },
    icon: BreadIcon,
  },
  {
    id: "macaroni",
    nameKey: "macaroni",
    prices: { KAM: 55, Tinex: 57, Vero: 56, Stokomak: 54, Kipper: 58, Ramstore: 59 },
    icon: BreadIcon,
  },
];

function Pekarnica({
  categoryName,
  categoryIcon: CategoryIcon,
  mainTitleIcon: MainTitleIcon,
  selectedProduct,
  onProductSelect,
  onBack,
  isMobile,
}) {
  const { t } = useTranslation();
  const iconColor = "#000";
  const iconSize = 20;

  return (
    <div className="main-content-container">
      <div
        className="main-content-columns"
        style={{ flexDirection: isMobile ? "column" : "row" }}
      >
        {/* Mobile: show store prices only if product selected */}
        {isMobile && selectedProduct ? (
          <div className="store-prices-column" style={{ width: "100%" }}>
            <div className="store-prices-header">
              <button className="back-button" onClick={onBack}>
                ❮
              </button>
              <div className="product-specific-title">
                {selectedProduct.icon && React.createElement(selectedProduct.icon, { color: iconColor, width: iconSize, height: iconSize })}
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
                      className="store-logo"
                      style={{ width: 24, height: 24, marginRight: 8, verticalAlign: "middle" }}
                    />
                    {store}
                  </div>
                  <div className="store-price">{price}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          // Show product list always on desktop or when no selection on mobile
          <>
            <div className="product-list-column" style={{ width: isMobile ? "100%" : 300 }}>
              <div className="main-category-title">
                <MainTitleIcon color={iconColor} width={iconSize} height={iconSize} />
                {categoryName}
              </div>
              <div className="product-list">
                {products.map((p) => (
                  <div
                    key={p.id}
                    className={`product-row ${selectedProduct?.id === p.id ? "active-product" : ""}`}
                    onClick={() => onProductSelect(p)}
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

            {/* On desktop, show store prices if product selected */}
            {!isMobile && selectedProduct && (
              <div className="store-prices-column" style={{ flex: 1 }}>
                <div className="store-prices-header">
                  <button className="back-button" onClick={onBack}>
                    ❮
                  </button>
                  <div className="product-specific-title">
                    {selectedProduct.icon && React.createElement(selectedProduct.icon, { color: iconColor, width: iconSize, height: iconSize })}
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
                          className="store-logo"
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
        )}
      </div>
    </div>
  );
}

export default Pekarnica;
