import { ObsidianCalculatorViewV1 } from "../obsidian-segerlab-dtos";
import { SegerFormula } from "./seger-formula/SegerFormula";
import { localFormat } from "../localization/date-helpers";
import { Ingredients } from "./ingredient-field";
import { ErrorBoundary } from "../error-boundary";
import LinkIcon from "../assets/icons/log-out.svg";

const Header = (
  {
    title,
    versionCreatedAt,
    recipeId,
  }: {
    title: string;
    versionCreatedAt: Date;
    recipeId: number;
  }) => (
  <div style={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "1rem",
    alignItems: "center",
  }}>
    <div
      style={{
        display: "flex",
        flexDirection: "column",
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
    <a href={`https://segerlab.ru/recipe/${recipeId}/calculations`}>
      <LinkIcon />
    </a>
  </div>

);

export interface CalculatorProps {
  calculatorView: ObsidianCalculatorViewV1;
  showMoreCoefficients: boolean;
}

export const Calculator = (
  {
    calculatorView: {
      name,
      recipeId,
      ingredients,
      versionCreatedAt,
      calculationResult,
      includeAdditionsIntoCalculations,
      formulaViewType,
    },
    showMoreCoefficients
  }: CalculatorProps) => {
  return (
    <ErrorBoundary>
      <div
        style={{
          display: "block",
          minWidth: "400px",
          border: "1px solid #626262",
          padding: "1rem 1.5rem",
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
          <Header title={name} recipeId={recipeId} versionCreatedAt={versionCreatedAt} />
          <SegerFormula
            disabled
            viewType={formulaViewType}
            calculation={calculationResult}
            showMoreCoefficients={showMoreCoefficients}
          />
          <Ingredients
            ingredients={ingredients}
            includeAdditionsIntoCalculations={includeAdditionsIntoCalculations}
            ingredientsOverallSum={calculationResult.ingredientsOverallSum}
          />
        </div>
      </div>
    </ErrorBoundary>
  );
};
