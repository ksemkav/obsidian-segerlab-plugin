import { ObsidianCalculatorViewV1 } from "../obsidian-segerlab-dtos";
import { SegerFormula } from "./seger-formula/SegerFormula";
import { Ingredients } from "./ingredient-field/ingredient-field";
import { ErrorBoundary } from "../error-boundary";
import styles from "./calculator-view.module.css";
import { CalculatorHeader } from "./calculator-header/calculator-header";


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
    showMoreCoefficients,
  }: CalculatorProps) => {

  return (
    <ErrorBoundary>
      <div className={styles.calculatorViewContainer}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <CalculatorHeader
            title={name}
            recipeId={recipeId}
            versionCreatedAt={versionCreatedAt}
            stullChartPoint={calculationResult.stullChartPoint}
          />
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
