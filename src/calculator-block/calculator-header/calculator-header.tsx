import { StullChartPointDto } from "../../obsidian-segerlab-dtos";
import { StullChart } from "../stull-chart/stull-chart";
import { localFormat } from "../../localization/date-helpers";
import styles from "./calculator-header.module.css";
import SegerIcon from "../../assets/icons/seger.svg";
import { useParentSize } from "@visx/responsive";

interface CalculatorHeaderProps {
  title: string;
  versionCreatedAt: Date;
  recipeId: number;
  stullChartPoint: StullChartPointDto;
}

export const CalculatorHeader = (
  {
    title,
    versionCreatedAt,
    recipeId,
    stullChartPoint,
  }: CalculatorHeaderProps) => {
  const { parentRef, width, height } = useParentSize({ debounceTime: 50 });
  // Forcing the chart to be square.
  const size = Math.max(width, height);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <div ref={parentRef} className={styles.chartContainer}>
          <StullChart
            minimized
            width={size}
            height={size}
            points={[{
              al2O3Value: stullChartPoint.al2O3Value,
              siO2Value: stullChartPoint.siO2Value,
              id: 0,
              name: title,
            }]} />
        </div>
        <div className={styles.headerInfo}>
          <div className={styles.headerTitle}>
            {title}
          </div>
          <div className={styles.headerDate}>
            {localFormat(versionCreatedAt, "Pp")}
          </div>
        </div>
      </div>
      <a href={`https://segerlab.ru/recipe/${recipeId}/calculations`} className={styles.logo}>
        <SegerIcon />
      </a>
    </div>

  );
};
