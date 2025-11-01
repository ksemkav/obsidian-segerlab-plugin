import { FormulaViewType, Oxide, OxideRoles } from "../../obsidian-segerlab-dtos";
import { FC } from "react";
import { SegerFormulaItem } from "./SegerFormulaItem";
import { useTranslation } from "react-i18next";
import styles from "./seger-formula.module.css";

type SegerFormulaProps = {
  isPrintView?: boolean;
  formula?: {
    [key in keyof typeof OxideRoles]?: { [key in keyof typeof Oxide]?: number };
  };
  viewType: FormulaViewType;
};

const VerticalDivider = () => (<div className={styles.verticalDivider}/>);

export const SegerFormulaView: FC<SegerFormulaProps> = (
  {
    formula,
    viewType,
  }) => {
  const { t } = useTranslation();

  const alcali = formula?.Alcali && Object.entries(formula.Alcali);
  const aEarth = formula?.AEarth && Object.entries(formula.AEarth);
  const stabs = formula?.Stabs && Object.entries(formula.Stabs);
  const gFormers = formula?.GFormers && Object.entries(formula.GFormers);
  const other = formula?.Other && Object.entries(formula.Other);

  return (
    <div className={styles.segerFormulaContainer}>
      <div className={styles.segerFormulaColumnContainer}>
        <div className={styles.segerFormulaViewHeaderStyle}>
          {`${t("Oxide.R2O")}/${t("Oxide.RO")}`}
        </div>
        {alcali?.map(([oxide, value]) => (
          <SegerFormulaItem
            key={oxide}
            viewType={viewType}
            oxide={oxide}
            value={value}
          />
        ))}
        <div className={styles.segerFormulaViewHeaderStyle} />
        {aEarth?.map(([oxide, value]) => (
          <SegerFormulaItem
            key={oxide}
            viewType={viewType}
            oxide={oxide}
            value={value}
          />
        ))}
      </div>

      <VerticalDivider />

      <div className={styles.segerFormulaColumnContainer}>
        <div className={styles.segerFormulaViewHeaderStyle}>{t("Oxide.R2O3")}</div>
        {stabs?.map(([oxide, value]) => (
          <SegerFormulaItem
            key={oxide}
            viewType={viewType}
            oxide={oxide}
            value={value}
          />
        ))}
      </div>

      <VerticalDivider />

      <div className={styles.segerFormulaColumnContainer}>
        <div className={styles.segerFormulaViewHeaderStyle}>{t("Oxide.RO2")}</div>
        {gFormers?.map(([oxide, value]) => (
          <SegerFormulaItem
            key={oxide}
            viewType={viewType}
            oxide={oxide}
            value={value}
          />
        ))}
        <div className={styles.segerFormulaViewHeaderStyle}>{t("OxideRole.Other")}</div>
        {other?.map(([oxide, value]) => (
          <SegerFormulaItem
            key={oxide}
            viewType={viewType}
            oxide={oxide}
            value={value}
          />
        ))}
      </div>
    </div>
  );
};
