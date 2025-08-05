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

function Ovosje({
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
    { id: "potato", name: t("potato"), prices: { KAM: 35, Tinex: 37, Vero: 36, Stokomak: 34, Kipper: 38, Ramstore: 39 } },
    { id: "tomato", name: t("tomato"), prices: { KAM: 43, Tinex: 45, Vero: 44, Stokomak: 42, Kipper: 46, Ramstore: 47 } },
    { id: "cucumber", name: t("cucumber"), prices: { KAM: 93, Tinex: 105, Vero: 104, Stokomak: 96, Kipper: 96, Ramstore: 107 } },
    { id: "peppers", name: t("peppers"), prices: { KAM: 143, Tinex: 145, Vero: 144, Stokomak: 142, Kipper: 146, Ramstore: 147 } },
    { id: "onion", name: t("onion"), prices: { KAM: 24, Tinex: 25, Vero: 26, Stokomak: 23, Kipper: 25, Ramstore: 27 } },
    { id: "apple", name: t("apple"), prices: { KAM: 34, Tinex: 35, Vero: 36, Stokomak: 33, Kipper: 37, Ramstore: 38 } },
    { id: "banana", name: t("banana"), prices: { KAM: 67, Tinex: 68, Vero: 69, Stokomak: 66, Kipper: 70, Ramstore: 71 } },
    { id: "lemon", name: t("lemon"), prices: { KAM: 67, Tinex: 68, Vero: 69, Stokomak: 66, Kipper: 70, Ramstore: 71 } },
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
                  {`${Math.min(...Object.values(p.prices))} - ${Math.max(...Object.values(p.prices))} MKD`}
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
              <div key={store} className="store-row"><img
              src={storeLogos[store]}
              alt={`${store} logo`}
              style={{
                width: "24px",
                height: "24px",
                objectFit: "contain",
                marginRight: "8px",
                verticalAlign: "middle",
              }}
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

export default Ovosje;
