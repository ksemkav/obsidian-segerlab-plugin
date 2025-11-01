import { FormulaViewType } from "../../obsidian-segerlab-dtos";
import { FC } from "react";
import { useScopedTranslation } from "../../localization/useScopedTranslation";
import styles from "./seger-formula.module.css";

type SegerFormulaItemProps = {
  oxide: string;
  value: number;
  viewType: FormulaViewType;
};

export const SegerFormulaItem: FC<SegerFormulaItemProps> = (
  {
    viewType,
    oxide,
    value,
  }) => {
  const { t } = useScopedTranslation("Oxide");

  return (
    <div className={styles.segerFormulaItem}>
      <div className={styles.segerFormulaItemOxide}>{t(oxide)}</div>
      <div className={styles.segerFormulaItemValue}>
        {viewType === FormulaViewType.PercentsMolar
          ? `${value.toFixed(3)}%`
          : value.toFixed(3)}
      </div>
    </div>
  );
};
