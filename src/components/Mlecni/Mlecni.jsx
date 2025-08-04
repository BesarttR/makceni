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

function Mlecni({
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
      id: "milk",
      name: t("milk"), // "Млеко (1л, 2.8%)"
      prices: {
        KAM: 55,
        Tinex: 60,
        Vero: 58,
        Stokomak: 56,
        Kipper: 59,
        Ramstore: 61,
      },
    },
    {
      id: "yogurt",
      name: t("yogurt"), // "Јогурт (1л, 2.8%)"
      prices: {
        KAM: 49,
        Tinex: 52,
        Vero: 51,
        Stokomak: 50,
        Kipper: 53,
        Ramstore: 54,
      },
    },
    {
      id: "butter",
      name: t("butter"), // "Путер (250г)"
      prices: {
        KAM: 81,
        Tinex: 83,
        Vero: 82,
        Stokomak: 80,
        Kipper: 84,
        Ramstore: 85,
      },
    },
    {
      id: "sour_milk",
      name: t("sour_milk"), // "Кисело Млеко"
      prices: {
        KAM: 31,
        Tinex: 33,
        Vero: 32,
        Stokomak: 30,
        Kipper: 29,
        Ramstore: 35,
      },
    },
    {
      id: "cheese",
      name: t("cheese"), // "Кравјо сирење (1кг)"
      prices: {
        KAM: 155,
        Tinex: 160,
        Vero: 158,
        Stokomak: 156,
        Kipper: 159,
        Ramstore: 161,
      },
    },
    {
      id: "hard_cheese",
      name: t("hard_cheese"), // "Кравји кашкавал (1кг)"
      prices: {
        KAM: 155,
        Tinex: 160,
        Vero: 158,
        Stokomak: 156,
        Kipper: 159,
        Ramstore: 161,
      },
    },
    {
      id: "sour_cream",
      name: t("sour_cream"), // "Павлака (500г)"
      prices: {
        KAM: 155,
        Tinex: 160,
        Vero: 158,
        Stokomak: 156,
        Kipper: 159,
        Ramstore: 161,
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
                className={`product-row ${selectedProduct?.id === p.id ? "active-product" : ""}`}
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
              <div className="store-name-header">{t("store") /* Продавница */}</div>
              <div className="store-price-header">{t("price_mkd") /* Цена (MKD) */}</div>
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
    </div>
  );
}

export default Mlecni;
