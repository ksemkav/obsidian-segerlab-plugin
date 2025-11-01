import { SegerFormulaView } from "./SegerFormulaView";
import {
  FormulaViewType,
  ObsidianCalculationResultsV1,
  TemperatureZone,
} from "../../obsidian-segerlab-dtos";
import { FC } from "react";
import styles from "./seger-formula.module.css";

import { ViewSelector } from "./view-selector/ViewSelector";
import { useTranslation } from "react-i18next";

type SegerFormulaProps = {
  disabled: boolean;
  isPrintView?: boolean;
  viewType: FormulaViewType;
  calculation?: ObsidianCalculationResultsV1;
  showMoreCoefficients?: boolean;
};

export const SegerFormula: FC<SegerFormulaProps> = (
  {
    viewType,
    calculation,
    showMoreCoefficients,
    isPrintView,
  }) => {
  const { t } = useTranslation();

  const fluxibilityTemperatureSign =
    calculation?.calculatedFluxibility?.temperatureZone ===
    TemperatureZone.Below
      ? "<"
      : calculation?.calculatedFluxibility?.temperatureZone ===
      TemperatureZone.Above
        ? ">"
        : "";

  return (
    <>
      <SegerFormulaView
        formula={calculation?.formula}
        viewType={viewType}
        isPrintView={isPrintView}
      />
      <div className={styles.oxideSumContainer}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
            <div>
              <span className={styles.oxideSum}>{`${t("Oxide.R2O")}/${t("Oxide.RO")}: `}</span>
              {calculation?.alcaliSum && calculation?.aEarthSum
                ? `${calculation?.alcaliSum.toFixed(3)}/${calculation?.aEarthSum.toFixed(3)}`
                : "—"}
            </div>
            <div>
              <span className={styles.oxideSum}>{`${t("OxideRole.SiliconAluminumOxidesRatio")}: `}</span>
              {calculation && calculation.siliconAluminumOxidesRatio !== 0
                ? calculation?.siliconAluminumOxidesRatio
                : "—"}
            </div>
          </div>
          {showMoreCoefficients && (
            <div className={styles.coefficients}>
              <div>
                <span className={styles.oxideSum}>{`${t("RecipeCalculator.ThermalExpansion")}: `}</span>
                <>
                  {calculation?.molarThermalExpansion &&
                  calculation?.molecularMassThermalExpansion
                    ? `${calculation?.molecularMassThermalExpansion.toFixed(2)}`
                    : "—"}
                </>
              </div>
              <div>
                <span className={styles.oxideSum}>{`${t("RecipeCalculator.Fluxibility.Label")}: `}</span>
                <>
                  {calculation?.calculatedFluxibility
                    ? `${fluxibilityTemperatureSign}` +
                    `${calculation?.calculatedFluxibility.temperature}°C`
                    : "—"}
                </>
              </div>
              <div>
                <span className={styles.oxideSum}>{`${t("RecipeCalculator.AcidityRatio.Label")}: `}</span>
                <>
                  {calculation?.acidityRatio
                    ? `${calculation?.acidityRatio}`
                    : "—"}
                </>
              </div>
            </div>
          )}
        </div>
        <ViewSelector value={viewType} />
      </div>
    </>
  );
};
