import { FormulaViewType } from "../dtos";
import { FC } from "react";
import { useScopedTranslation } from "src/localization/useScopedTranslation";

type SegerFormulaItemProps = {
  oxide: string;
  value: number;
  viewType: FormulaViewType;
};

export const SegerFormulaItem: FC<SegerFormulaItemProps> = ({
                                                              viewType,
                                                              oxide,
                                                              value,
                                                            }) => {
  const { t } = useScopedTranslation("Oxide");

  const styles = {
    segerFormulaItem: {
      display: "flex" as const,
      flexDirection: "row" as const,
      flexWrap: "nowrap" as const,
    },
    segerFormulaItemOxide: {
      flexBasis: "50%",
      fontSize: "0.875rem",
      lineHeight: "1rem",
    },
    segerFormulaItemValue: {
      flexBasis: "50%",
      fontSize: "0.875rem",
      lineHeight: "1rem",
      textAlign: "right" as const,
    },
  };

  return (
    <div style={styles.segerFormulaItem}>
      <div style={styles.segerFormulaItemOxide}>{t(oxide)}</div>
      <div style={styles.segerFormulaItemValue}>
        {viewType === FormulaViewType.PercentsMolar
          ? `${value.toFixed(3)}%`
          : value.toFixed(3)}
      </div>
    </div>
  );
};
