import { ObsidianIngredientFieldV1 } from "../../obsidian-segerlab-dtos";
import { useTranslation } from "react-i18next";
import AttachmentIcon from "../../assets/icons/attachment.svg";
import styles from "./ingredient-field.module.css";
import clsx from "clsx";
import { Switch } from "./switch/switch";

interface ItemProps {
  textAlign?: "center" | "right";
  showBorder?: boolean;
}

const Item = (
  {
    children,
    textAlign = undefined,
    showBorder = true,
  }: ItemProps & { children: React.ReactNode }) => (
  <div
    className={clsx(styles.ingredientItem, { [styles.noBorder]: !showBorder }, { [styles.alignTextCenter]: textAlign === "center" }, { [styles.alignTextRight]: textAlign === "right" })}>
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
          <Item>{name}</Item>
        </div>
        <div style={flexIngredientAmountStyle}>
          <Item textAlign={"center"}>
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

const HorizontalDivider = () => (<div className={styles.horizontalDivider} />);

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
            <AttachmentIcon className={styles.additionsIcon} />
            <div className={styles.additionsTitle}>
              {t("RecipeCalculator.Additions")}
            </div>
          </div>
          <Switch checked={includeAdditionsIntoCalculations} />
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


