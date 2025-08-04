import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import "./App.css";
import PreciousMetalsIcon from "../../icons/gold-ingots-stroke-standard";

const EUR_USD = 1.05;

function PreciousMetals({ categoryName, mainTitleIcon: MainTitleIcon }) {
  const { t } = useTranslation();
  const [goldPrice24k, setGoldPrice24k] = useState(null);
  const [goldPrice14k, setGoldPrice14k] = useState(null);
  const [silverPrice925, setSilverPrice925] = useState(null);

  useEffect(() => {
    async function fetchPrices() {
      try {
        const response = await axios.get(
          "https://data-asg.goldprice.org/dbXRates/USD"
        );
        const data = response.data.items[0];
        const goldUSDperOz = data.xauPrice;
        const silverUSDperOz = data.xagPrice;

        const goldUSDperGram = goldUSDperOz / 31.1035;
        const silverUSDperGram = silverUSDperOz / 31.1035;

        const goldEURperGram = goldUSDperGram / EUR_USD;
        const silverEURperGram = silverUSDperGram / EUR_USD;

        setGoldPrice24k(goldEURperGram);
        setGoldPrice14k(goldEURperGram * (14 / 24));
        setSilverPrice925(silverEURperGram * 0.925);
      } catch (error) {
        console.error("Error fetching metal prices:", error);
      }
    }
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const format = (price) => (price ? price.toFixed(2) : "—");

  return (
    <div className="main-content-container">
      <div className="main-content-columns">
        <div className="product-list-column">
          <div className="main-category-title">
            {MainTitleIcon ? (
              <MainTitleIcon color="#000" width={20} height={20} />
            ) : (
              <PreciousMetalsIcon color="#000" width={20} height={20} />
            )}
            {categoryName}
          </div>

          <div className="product-list">
            <div className="product-row">
              <div className="product-name">{t("gold_24k_per_gram")}</div>
              <div className="product-price">{format(goldPrice24k)} €</div>
            </div>
            <div className="product-row">
              <div className="product-name">{t("gold_14k_per_gram")}</div>
              <div className="product-price">{format(goldPrice14k)} €</div>
            </div>
            <div className="product-row">
              <div className="product-name">{t("silver_925_per_gram")}</div>
              <div className="product-price">{format(silverPrice925)} €</div>
            </div>
            <div className="product-row">
              <div className="product-name">{t("gold_24k_per_kg")}</div>
              <div className="product-price">{format(goldPrice24k * 1000)} €</div>
            </div>
            <div className="product-row">
              <div className="product-name">{t("gold_14k_per_kg")}</div>
              <div className="product-price">{format(goldPrice14k * 1000)} €</div>
            </div>
            <div className="product-row">
              <div className="product-name">{t("silver_925_per_kg")}</div>
              <div className="product-price">{format(silverPrice925 * 1000)} €</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PreciousMetals;
