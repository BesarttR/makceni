import React from "react";
import { useTranslation } from "react-i18next";
import "../../App.css";

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

function Osnovni({
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

  const products = [
    {
      id: "cooking_oil",
      name: t("cooking_oil"),
      prices: {
        KAM: 82,
        Tinex: 85,
        Vero: 83,
        Stokomak: 80,
        Kipper: 84,
        Ramstore: 86,
      },
    },
    {
      id: "sugar",
      name: t("sugar"),
      prices: {
        KAM: 52,
        Tinex: 53,
        Vero: 55,
        Stokomak: 51,
        Kipper: 54,
        Ramstore: 56,
      },
    },
    {
      id: "salt",
      name: t("salt"),
      prices: {
        KAM: 32,
        Tinex: 33,
        Vero: 34,
        Stokomak: 31,
        Kipper: 33,
        Ramstore: 35,
      },
    },
    {
      id: "coffee",
      name: t("coffee"),
      prices: {
        KAM: 72,
        Tinex: 73,
        Vero: 74,
        Stokomak: 71,
        Kipper: 70,
        Ramstore: 75,
      },
    },
    {
      id: "tea",
      name: t("tea"),
      prices: {
        KAM: 132,
        Tinex: 133,
        Vero: 134,
        Stokomak: 131,
        Kipper: 129,
        Ramstore: 135,
      },
    },
    {
      id: "vinegar",
      name: t("vinegar"),
      prices: {
        KAM: 81,
        Tinex: 83,
        Vero: 82,
        Stokomak: 80,
        Kipper: 84,
        Ramstore: 85,
      },
    },
  ];

  return (
    <div className="main-content-columns">
      {(!selectedProduct || !isMobile) && (
        <div className="product-list-column">
          <div className="main-category-title">
            <MainTitleIcon color={iconColor} width={iconSize} height={iconSize} />
            {categoryName}
          </div>
          <div className="product-list">
            {products.map((p) => (
              <div
                key={p.id}
                className={`product-row ${
                  selectedProduct?.id === p.id ? "active-product" : ""
                }`}
                onClick={() => onProductSelect(p)}
              >
                <div className="product-name">{p.name}</div>
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
            <button className="back-button" onClick={onBack}>
              ❮
            </button>
            <div className="product-specific-title">
              <MainTitleIcon color={iconColor} width={iconSize} height={iconSize} />
              {selectedProduct.name}
            </div>
          </div>
          <div className="store-prices-list">
            <div className="store-list-header">
              <div className="store-name-header">{t("store")}</div>
              <div className="store-price-header">{t("price_mkd")}</div>
            </div>
            {Object.entries(selectedProduct.prices).map(([store, price]) => (
              <div key={store} className="store-row">
                <img
                  src={storeLogos[store]}
                  alt={`${store} logo`}
                  className="store-logo"
                  style={{ width: 24, height: 24, marginRight: 8 }}
                />
                <div className="store-name">{store}</div>
                <div className="store-price">{price}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Osnovni;
