import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./App.css";

function Gorivo({ categoryName, mainTitleIcon: MainTitleIcon }) {
  const { t } = useTranslation();

  const [prices, setPrices] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  const iconColor = "#000";
  const iconSize = 20;

  useEffect(() => {
    fetch(
      "https://api.codetabs.com/v1/proxy/?quest=https://gorivo.mk/_flareact/props/index.json"
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response not OK");
        }
        return res.json();
      })
      .then((data) => {
        const mainFuelsData = data.pageProps.mainFuelsData;
        const otherFuelsData = data.pageProps.otherFuelsData;

        function getCurrentPrice(fuelData) {
          if (!fuelData || !fuelData.price || !fuelData.updatedPrice) {
            return { value: null, trend: null };
          }

          const now = new Date();
          const validAt = new Date(fuelData.updatedPriceValidAt);
          const useUpdated = validAt <= now;
          const current = useUpdated ? fuelData.updatedPrice : fuelData.price;

          let trend = "same";
          if (fuelData.updatedPrice > fuelData.price) trend = "up";
          if (fuelData.updatedPrice < fuelData.price) trend = "down";

          return { value: current, trend };
        }

        setPrices([
          {
            label: t("fuel_diesel"),
            unit: "MKD/L",
            ...getCurrentPrice(mainFuelsData.DIZEL_ID),
          },
          {
            label: t("fuel_gasoline_95"),
            unit: "MKD/L",
            ...getCurrentPrice(mainFuelsData.BENZIN_ID),
          },
          {
            label: t("fuel_gasoline_98"),
            unit: "MKD/L",
            ...getCurrentPrice(mainFuelsData.BENZIN98_ID),
          },
          {
            label: t("fuel_extra_light"),
            unit: "MKD/L",
            ...getCurrentPrice(mainFuelsData.EKSTRALESNO_ID),
          },
          {
            label: t("fuel_heavy_oil"),
            unit: "MKD/KG",
            ...getCurrentPrice(mainFuelsData.MAZUT_ID),
          },
          {
            label: t("fuel_lpg"),
            unit: "MKD/L",
            ...getCurrentPrice(otherFuelsData.PLINLPG_ID),
          },
          {
            label: t("fuel_cng"),
            unit: "MKD/L",
            ...getCurrentPrice(otherFuelsData.METANCNG_ID),
          },
        ]);

        setLastUpdated(data.pageProps.date || mainFuelsData.DIZEL_ID.updatedAt);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
      });
  }, [t]);

  // Force styles to light mode colors
  const lightTextColor = "#000";
  const lightBackgroundColor = "#fff";

  return (
    <div
      className="main-content-columns"
      style={{ backgroundColor: lightBackgroundColor, color: lightTextColor }}
    >
      <div className="product-list-column">
        <div className="main-category-title" style={{ color: lightTextColor }}>
          <MainTitleIcon color={iconColor} width={iconSize} height={iconSize} />
          {categoryName}
        </div>
        <div className="product-list">
          {prices ? (
            <table
              className="fuel-table"
              style={{ backgroundColor: lightBackgroundColor, color: lightTextColor }}
            >
              <tbody>
                {prices.map((fuel, idx) => (
                  <tr key={idx}>
                    <td className="fuel-name" style={{ color: lightTextColor }}>
                      {fuel.label}
                    </td>
                    <td
                      className={`fuel-price ${
                        fuel.trend === "up"
                          ? "up"
                          : fuel.trend === "down"
                          ? "down"
                          : ""
                      }`}
                      style={{ color: lightTextColor }}
                    >
                      {fuel.value !== null && fuel.value !== undefined
                        ? fuel.value.toFixed(3)
                        : "-"}{" "}
                      {fuel.unit}
                    </td>
                    <td className={`trend-arrow ${fuel.trend}`} style={{ color: lightTextColor }}>
                      {fuel.trend === "up" && "↗"}
                      {fuel.trend === "down" && "↘"}
                      {fuel.trend === "same" && "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={{ color: lightTextColor }}>{t("loading_prices")}</p>
          )}

          {lastUpdated && (
            <p className="updated-time" style={{ color: lightTextColor }}>
              {t("last_updated")} {new Date(lastUpdated).toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gorivo;
