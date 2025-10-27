import { FormulaViewType } from "../dtos";
import { useScopedTranslation } from "src/localization/useScopedTranslation";

export const ViewSelector = ({ value }: { value: FormulaViewType }) => {
  const { t } = useScopedTranslation("RecipeCalculator");
  const viewOptions = Object.values(FormulaViewType);

  return (
    <div style={{
      display: "inline-flex",
      border: "1px solid rgba(0, 0, 0, 0.12)",
      borderRadius: "4px",
      overflow: "hidden",
    }}>
      {viewOptions.map((option, index) => (
        <div
          key={option}
          style={{
            width: "43px",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.875rem",
            fontWeight: 500,
            cursor: "default",
            borderRight: index < viewOptions.length - 1 ? "1px solid rgba(47, 128, 237, 0.08)" : "none",
            backgroundColor: option === value ? "rgba(47, 128, 237, 0.08)" : "transparent",
            color: option === value ? "rgb(47, 128, 237)" : "rgba(0, 0, 0, 0.26)",
          }}
        >
          {t(`View.${option}`)}
        </div>
      ))}
    </div>
  );
};
