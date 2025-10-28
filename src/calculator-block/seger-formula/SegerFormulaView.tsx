import { FormulaViewType, Oxide, OxideRoles } from "../../obsidian-segerlab-dtos";
import { FC } from "react";
import { SegerFormulaItem } from "./SegerFormulaItem";
import { useTranslation } from "react-i18next";

type SegerFormulaProps = {
  isPrintView?: boolean;
  formula?: {
    [key in keyof typeof OxideRoles]?: { [key in keyof typeof Oxide]?: number };
  };
  viewType: FormulaViewType;
};

const VerticalDivider = () => (
  <div
    style={{
      borderLeft: "1px solid #007aff",
      alignSelf: "stretch",
    }}
  />
);

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

  const segerFormulaViewHeaderStyle = {
    alignSelf: "center",
    fontWeight: 400,
    fontSize: "10px",
    lineHeight: "1rem",
    paddingBottom: "1rem",
    letterSpacing: "0.1em",
    color: "#007AFF",
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <div style={segerFormulaViewHeaderStyle}>
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
        <div style={segerFormulaViewHeaderStyle} />
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

      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <div style={segerFormulaViewHeaderStyle}>{t("Oxide.R2O3")}</div>
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

      <div style={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
        <div style={segerFormulaViewHeaderStyle}>{t("Oxide.RO2")}</div>
        {gFormers?.map(([oxide, value]) => (
          <SegerFormulaItem
            key={oxide}
            viewType={viewType}
            oxide={oxide}
            value={value}
          />
        ))}
        <div style={segerFormulaViewHeaderStyle}>{t("OxideRole.Other")}</div>
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
