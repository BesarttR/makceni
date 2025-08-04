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

function Domakinstvo({
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
      id: "toilet-paper",
      nameKey: "toilet_paper", // translation key
      prices: {
        KAM: 120,
        Tinex: 125,
        Vero: 130,
        Stokomak: 122,
        Kipper: 128,
        Ramstore: 132,
      },
    },
    {
      id: "liquid-detergent",
      nameKey: "liquid_detergent",
      prices: {
        KAM: 350,
        Tinex: 370,
        Vero: 360,
        Stokomak: 355,
        Kipper: 365,
        Ramstore: 372,
      },
    },
    {
      id: "laundry-powder",
      nameKey: "laundry_powder",
      prices: {
        KAM: 215,
        Tinex: 220,
        Vero: 225,
        Stokomak: 212,
        Kipper: 218,
        Ramstore: 224,
      },
    },
    {
      id: "dish-shine",
      nameKey: "dish_shine",
      prices: {
        KAM: 62,
        Tinex: 64,
        Vero: 66,
        Stokomak: 61,
        Kipper: 63,
        Ramstore: 68,
      },
    },
    {
      id: "dish-capsules",
      nameKey: "dish_capsules",
      prices: {
        KAM: 62,
        Tinex: 64,
        Vero: 66,
        Stokomak: 61,
        Kipper: 63,
        Ramstore: 68,
      },
    },
    {
      id: "hand-soap",
      nameKey: "hand_soap",
      prices: {
        KAM: 86,
        Tinex: 89,
        Vero: 88,
        Stokomak: 87,
        Kipper: 90,
        Ramstore: 93,
      },
    },
    {
      id: "shampoo",
      nameKey: "shampoo",
      prices: {
        KAM: 86,
        Tinex: 89,
        Vero: 88,
        Stokomak: 87,
        Kipper: 90,
        Ramstore: 93,
      },
    },
  ];

  return (
    <div className="main-content-columns">
      {/* Show product list only if no product selected OR if desktop */}
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
                <div className="product-name">{t(p.nameKey)}</div>
                <div className="product-price">
                  {`${Math.min(...Object.values(p.prices))} - ${Math.max(...Object.values(p.prices))} MKD`}
                  <span className="click-arrow">{"❯"}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Show prices only if a product is selected */}
      {selectedProduct && (
        <div className="store-prices-column">
          <div className="store-prices-header">
            {/* Use onBack prop here */}
            <button className="back-button" onClick={onBack}>
              ❮
            </button>
            <div className="product-specific-title">
              <MainTitleIcon color={iconColor} width={iconSize} height={iconSize} />
              {t(selectedProduct.nameKey)}
            </div>
          </div>
          <div className="store-prices-list">
            <div className="store-list-header">
              <div className="store-name-header">{t("Store")}</div>
              <div className="store-price-header">{t("Price (MKD)")}</div>
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

export default Domakinstvo;
