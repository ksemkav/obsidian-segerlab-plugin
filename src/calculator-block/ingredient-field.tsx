import { ObsidianIngredientFieldV1 } from "../obsidian-segerlab-dtos";
import { useTranslation } from "react-i18next";
import AttachmentIcon from "../assets/icons/attachment.svg";

interface ItemProps {
  textAlign?: "start" | "center" | "end" | "left" | "right" | "justify";
  showBorder?: boolean;
}

const Item = (
  {
    children,
    textAlign = "start",
    showBorder = true,
  }: ItemProps & { children: React.ReactNode }) => (
  <div
    style={{
      backgroundColor: "#fff",
      padding: "0.4rem 0.75rem",
      textAlign: textAlign,
      border: showBorder ? "1px solid rgba(0, 0, 0, 0.1)" : "none",
      borderRadius: 0,
    }}
  >
    {children}
  </div>
);

const flexContainerStyle: React.CSSProperties = {
  display: "flex",
  gap: "8px",
};

const flexIngredientNameStyle: React.CSSProperties = {
  flex: `1 1 100%`,
};

const flexIngredientAmountStyle: React.CSSProperties = {
  flex: `0 0 4.5rem`,
};

export const IngredientField = ({ name, value }: ObsidianIngredientFieldV1) => {
  return (
    <>
      <div style={flexContainerStyle}>
        <div style={flexIngredientNameStyle}>
          <Item textAlign="left">{name}</Item>
        </div>
        <div style={flexIngredientAmountStyle}>
          <Item textAlign="center">
            {
              parseFloat(
                value.toFixed(3),
              ).toString() /*TODO Check how to ignore trailing zeros */
            }
          </Item>
        </div>
      </div>
    </>
  );
};

const HorizontalDivider = () => (
  <div style={{ borderBottom: "1px solid #007aff" }} />
);

export interface IngredientsProps {
  ingredients: ObsidianIngredientFieldV1[];
  includeAdditionsIntoCalculations?: boolean;
  ingredientsOverallSum: number;
}

export const Ingredients = (
  {
    ingredients,
    ingredientsOverallSum,
    includeAdditionsIntoCalculations,
  }: IngredientsProps) => {
  const { t } = useTranslation();

  const sortedIngredients = ingredients.sort(
    (a, b) => (a.index || 0) - (b.index || 0),
  );
  const mainInredients = sortedIngredients.filter(
    (ingredient) => !ingredient.isAddition,
  );
  const additionalIngredients = sortedIngredients.filter(
    (ingredient) => ingredient.isAddition,
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        marginTop: "1rem",
      }}
    >
      {mainInredients.map((ingredient) => (
        <IngredientField
          key={ingredient.index}
          {...ingredient}
        />
      ))}

      <div style={flexContainerStyle}>
        <div style={flexIngredientNameStyle}>
          <Item textAlign="right" showBorder={false}>
            {t("RecipeCalculator.Total")}
          </Item>
        </div>
        <div style={flexIngredientAmountStyle}>
          <Item textAlign="center" showBorder={false}>
            {ingredientsOverallSum}
          </Item>
        </div>
      </div>

      {additionalIngredients.length > 0 && (<div style={{ marginBottom: "0.5rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "0.5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
          >
            <AttachmentIcon style={{ width: "12px", height: "12px" }} />
            <div
              style={{
                fontSize: "0.625rem",
                lineHeight: "1rem",
                color: "#007aff",
                letterSpacing: "0.1em",
              }}
            >
              {t("RecipeCalculator.Additions")}
            </div>
          </div>
          <SwitchDisplay checked={includeAdditionsIntoCalculations} />
        </div>
        <HorizontalDivider />
      </div>)}

      {additionalIngredients.map((ingredient) => (
        <IngredientField
          key={ingredient.index}
          {...ingredient}
        />
      ))}
    </div>
  );
};

const SwitchDisplay = ({ checked = false }: { checked?: boolean }) => {
  const trackStyle: React.CSSProperties = {
    width: "26px",
    height: "10px",
    backgroundColor: checked ? "rgb(230, 239, 252)" : "rgb(224, 224, 224)",
    borderRadius: "7px",
    position: "relative",
    display: "inline-block",
    margin: "0 8px",
  };

  const thumbStyle: React.CSSProperties = {
    width: "16px",
    height: "16px",
    borderRadius: "50%",
    position: "absolute",
    top: "-3px",
    left: checked ? "13px" : "-3px",
    backgroundColor: checked ? "rgb(175, 206, 248)" : "rgb(245, 245, 245)",
    boxSizing: "border-box",
  };

  return (
    <div style={trackStyle}>
      <div style={thumbStyle} />
    </div>
  );
};
