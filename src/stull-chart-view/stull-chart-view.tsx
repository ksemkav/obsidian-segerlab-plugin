import { StullChart, StullChartCalculatorPoint } from "../calculator-block/stull-chart/stull-chart";
import { useTranslation } from "react-i18next";
import { useParentSize } from "@visx/responsive";
import Atata from "../assets/atata.svg";
import styles from "./stull-chart-view.module.css";

export const StullChartView = ({ points, header }: { points: StullChartCalculatorPoint[], header: string }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.viewContainer}>
      <div className={styles.chartWrapper}>
        <h3>{header}</h3>
        <ChartContainer points={points} />
      </div>
      {points.length === 0 && (
        <div className={styles.emptyStateContainer}>
          <div className={styles.emptyStateContent}>
            <div className={styles.emptyStateMessage}>{t("NoPoints.Message")}</div>
            <div className={styles.emptyStateHint}>{t("NoPoints.Hint")}</div>
          </div>
          <Atata className={styles.emptyStateIllustration} />
        </div>
      )}
    </div>
  );
};

const ChartContainer = ({ points }: { points: StullChartCalculatorPoint[] }) => {
  const { parentRef, width } = useParentSize({ debounceTime: 50 });
  return <div ref={parentRef} className={styles.chartContainer}>
    <StullChart width={width} height={width / 3 * 2} points={points} />
  </div>;
};
