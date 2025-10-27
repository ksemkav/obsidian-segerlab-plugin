import { RecipeCalculationDto } from "./dtos";
import { SegerFormula } from "./seger-formula/SegerFormula";
import { localFormat } from "./localization/date-helpers";
import { Ingredients } from "./ingredient-field";

const Header = (
  {
    title,
    versionCreatedAt,
  }: {
    title: string;
    versionCreatedAt: Date;
  }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      marginBottom: "1rem",
    }}
  >
    <div
      style={{
        fontWeight: 600,
        fontSize: "1.2rem",
        lineHeight: "2rem",
        fontFamily: "system-ui",
      }}
    >
      {title}
    </div>
    <div
      style={{
        color: "rgba(0, 0, 0, 0.5)",
        fontSize: "0.9rem",
        lineHeight: "1.5rem",
        fontFamily: "system-ui",
      }}
    >
      {localFormat(versionCreatedAt, "Pp")}
    </div>
  </div>
);

export const Calculator = (
  {
    name,
    ingredients,
    versionCreatedAt,
    calculation,
    includeAdditionsIntoCalculations,
    formulaViewType,
  }: RecipeCalculationDto) => {
  return (
    <div
      style={{
        display: "block",
        minWidth: "400px",
        border: "1px solid #626262",
        padding: "1.5rem",
        margin: "3px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Header title={name} versionCreatedAt={versionCreatedAt} />
        <SegerFormula
          disabled
          viewType={formulaViewType}
          calculation={calculation}
          showMoreCoefficients
        />
        <Ingredients
          ingredients={ingredients}
          includeAdditionsIntoCalculations={includeAdditionsIntoCalculations}
          ingredientsOverallSum={calculation.ingredientsOverallSum}
        />
      </div>
    </div>
  );
};
