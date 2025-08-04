import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import logo from "./logos/makceni.png";
import "./App.css";

// page components
import Pekarnica from "./components/Pekarna/Pekarna";
import Mlecni from "./components/Mlecni/Mlecni";
import Proteini from "./components/Proteini/Proteini";
import Osnovni from "./components/Osnovni/Osnovni";
import Ovosje from "./components/Ovosje/Ovosje";
import Domakinstvo from "./components/Domakinstvo/Domakinstvo";
import Gorivo from "./components/Gorivo/Gorivo";
import Skapoceneti from "./components/Skapoceneti/Metali";

// icon components
import FuelStationIcon from "./icons/fuel-station-stroke-standard";
import BreadIcon from "./icons/bread-01-stroke-sharp";
import MilkIcon from "./icons/milk-bottle-stroke-rounded";
import ProteinIcon from "./icons/steak-stroke-sharp";
import HomeIcon from "./icons/home-01-stroke-sharp";
import VeggiesIcon from "./icons/carrot-stroke-sharp";
import SoapIcon from "./icons/body-soap-twotone-rounded";
import SkapocenetiIcon from "./icons/gold-ingots-stroke-standard";

import FueelStationIcon from "./icons/fuel-station-solid-standard";
import BreeadIcon from "./icons/bread-01-solid-standard (1)";
import MiilkIcon from "./icons/milk-bottle-solid-rounded";
import ProoteinIcon from "./icons/steak-solid-rounded";
import HoomeIcon from "./icons/home-01-solid-sharp";
import VeeggiesIcon from "./icons/carrot-solid-standard";
import SooapIcon from "./icons/body-soap-solid-rounded";
import SkaapocenetiIcon from "./icons/gold-ingots-solid-standard";

export default function App() {
  const { t, i18n } = useTranslation();

  const categories = [
    { name: t("Fuel"), component: Gorivo, icon: FuelStationIcon, mainIcon: FueelStationIcon },
    { name: t("Bakery and Grains"), component: Pekarnica, icon: BreadIcon, mainIcon: BreeadIcon },
    { name: t("Dairy Products"), component: Mlecni, icon: MilkIcon, mainIcon: MiilkIcon },
    { name: t("Proteins"), component: Proteini, icon: ProteinIcon, mainIcon: ProoteinIcon },
    { name: t("Basic Products"), component: Osnovni, icon: HomeIcon, mainIcon: HoomeIcon },
    { name: t("Fruits and Vegetables"), component: Ovosje, icon: VeggiesIcon, mainIcon: VeeggiesIcon },
    { name: t("Household"), component: Domakinstvo, icon: SoapIcon, mainIcon: SooapIcon },
    { name: t("Precious Metals"), component: Skapoceneti, icon: SkapocenetiIcon, mainIcon: SkaapocenetiIcon },
  ];

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const Component = selectedCategory.component;
  const CategoryIcon = selectedCategory.icon;
  const MainIcon = selectedCategory.mainIcon;

  const isMobile = window.innerWidth < 768;

  const toggleDropdown = () => setMobileDropdownOpen(!mobileDropdownOpen);
  const toggleLangDropdown = () => setLangDropdownOpen(!langDropdownOpen);

  const selectCategory = (cat) => {
    setSelectedCategory(cat);
    setSelectedProduct(null);
    setMobileDropdownOpen(false);
  };

  // Update category names on language change
  useEffect(() => {
    const updatedCategory = categories.find(c => c.component === selectedCategory.component);
    if (updatedCategory && updatedCategory.name !== selectedCategory.name) {
      setSelectedCategory(updatedCategory);
    }
  }, [t]);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLangDropdownOpen(false);
  };

  // Language list with flags (rounded)
  const languages = [
    { code: "mk", label: "МK", flag: "mk" },
    { code: "sq", label: "AL", flag: "al" },
    { code: "tr", label: "TR", flag: "tr" },
    { code: "en", label: "EN", flag: "gb" },
  ];

  const selectedLang = languages.find(l => l.code === i18n.language) || languages[3];

  return (
    <div style={{ maxWidth: 1200, margin: "20px auto", padding: 20 }}>
      <header
        style={{
          textAlign: "center",
          marginBottom: 20,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
        }}
      >
        <img
          src={logo}
          alt={t("MakCeni Logo")}
          style={{ height: 80, width: "auto", objectFit: "contain" }}
        />

        {/* Language selector */}
        {isMobile ? (
          <div style={{ position: "relative", userSelect: "none" }}>
            <div
              onClick={toggleLangDropdown}
              style={{
                cursor: "pointer",
                border: "1px solid #ccc",
                borderRadius: 4,
                padding: "6px 10px",
                fontWeight: "bold",
                backgroundColor: "#fff",
                userSelect: "none",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              <img
                src={`https://flagcdn.com/24x18/${selectedLang.flag}.png`}
                alt={selectedLang.code}
                style={{ borderRadius: "50%", width: 18, height: 18 }}
              />
              <span>{selectedLang.label}</span>
              <span style={{ fontSize: "1em", lineHeight: 1 }}>
                {langDropdownOpen ? "⋀" : "⋁"}
              </span>
            </div>

            {langDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 5px)",
                  right: 0,
                  backgroundColor: "#fff",
                  border: "1px solid #ccc",
                  borderRadius: 4,
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  zIndex: 1500,
                  minWidth: 140,
                }}
              >
                {languages.map(({ code, label, flag }) => (
                  <div
                    key={code}
                    onClick={() => changeLanguage(code)}
                    style={{
                      padding: "8px 10px",
                      cursor: code === i18n.language ? "default" : "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      backgroundColor: code === i18n.language ? "#007bff" : "transparent",
                      color: code === i18n.language ? "#fff" : "#000",
                      fontWeight: code === i18n.language ? "bold" : "normal",
                    }}
                  >
                    <img
                      src={`https://flagcdn.com/24x18/${flag}.png`}
                      alt={code}
                      style={{ borderRadius: "50%", width: 18, height: 18 }}
                    />
                    {label}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div style={{ display: "flex", gap: 8 }}>
            {languages.map(({ code, label, flag }) => (
              <button
                key={code}
                onClick={() => changeLanguage(code)}
                disabled={i18n.language === code}
                style={{
                  padding: "4px 8px",
                  fontSize: 12,
                  fontWeight: "bold",
                  borderRadius: 4,
                  border: "1px solid #ccc",
                  backgroundColor: i18n.language === code ? "#007bff" : "#fff",
                  color: i18n.language === code ? "#fff" : "#000",
                  cursor: i18n.language === code ? "default" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <img
                  src={`https://flagcdn.com/24x18/${flag}.png`}
                  alt={code}
                  style={{ borderRadius: "50%", width: 18, height: 18 }}
                />
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      {isMobile ? (
        <div>
          {/* Dropdown for categories */}
          <div
            className="sidebar-item"
            style={{ cursor: "pointer", position: "relative", userSelect: "none" }}
            onClick={toggleDropdown}
          >
            <CategoryIcon
              color="#000"
              width={20}
              height={20}
              style={{ marginRight: 8 }}
            />
            {selectedCategory.name}
            <span style={{ marginLeft: "auto" }}>{mobileDropdownOpen ? "⋀" : "⋁"}</span>

            {mobileDropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  backgroundColor: "#fff",
                  zIndex: 1000,
                  maxHeight: 300,
                  overflowY: "auto",
                  border: "1px solid #ccc",
                  borderRadius: 12,
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                }}
              >
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  const isSelected = selectedCategory.name === cat.name;
                  const iconColor = isSelected ? "#fff" : "#000";
                  const backgroundColor = isSelected ? "#007BFF" : "#fff";
                  const color = isSelected ? "#fff" : "#000";

                  return (
                    <div
                      key={cat.name}
                      className="sidebar-item"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 15px",
                        backgroundColor,
                        color,
                        cursor: "pointer",
                        border: "none",
                        boxShadow: "none",
                      }}
                      onClick={() => selectCategory(cat)}
                    >
                      <Icon
                        color={iconColor}
                        width={20}
                        height={20}
                        style={{ marginRight: 8 }}
                      />
                      {cat.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Category component */}
          <div style={{ marginTop: 20 }}>
            <Component
              categoryName={selectedCategory.name}
              categoryIcon={CategoryIcon}
              mainTitleIcon={MainIcon}
              selectedProduct={selectedProduct}
              onProductSelect={setSelectedProduct}
              onBack={() => setSelectedProduct(null)}
              isMobile={isMobile}
            />
          </div>
        </div>
      ) : (
        // Desktop view
        <div style={{ display: "flex", gap: 20 }}>
          <div className="sidebar">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory.name === cat.name;
              const iconColor = isSelected ? "#fff" : "#000";

              return (
                <div
                  key={cat.name}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedProduct(null);
                  }}
                  className={`sidebar-item ${isSelected ? "selected-item" : ""}`}
                >
                  <Icon color={iconColor} width={20} height={20} />
                  {cat.name}
                </div>
              );
            })}
          </div>

          <div style={{ flex: 1 }}>
            <Component
              categoryName={selectedCategory.name}
              categoryIcon={CategoryIcon}
              mainTitleIcon={MainIcon}
              selectedProduct={selectedProduct}
              onProductSelect={setSelectedProduct}
              onBack={() => setSelectedProduct(null)}
              isMobile={isMobile}
            />
          </div>
        </div>
      )}
    </div>
  );
}
