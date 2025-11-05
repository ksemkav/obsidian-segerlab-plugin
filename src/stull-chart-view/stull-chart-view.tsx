import { StullChart, StullChartCalculatorPoint } from "../calculator-block/stull-chart/stull-chart";
import { useTranslation } from "react-i18next";
import { useParentSize } from "@visx/responsive";
import Atata from "../assets/atata.svg";

export const StullChartView = ({ points, header }: { points: StullChartCalculatorPoint[], header: string }) => {
  const { t } = useTranslation();
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%"
      }}
    >
      <div style={{ width: "100%" }}>
        <h3>{header}</h3>
        <ChartContainer points={points} />
      </div>
      {points.length === 0 && (
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ color: "var(--text-normal)", fontSize: "1.2em", fontWeight: 500 }}>{t("NoPoints.Message")}</div>
            <div
              style={{ marginTop: "0.5em", color: "var(--text-faint)", fontSize: "0.8em" }}>{t("NoPoints.Hint")}</div>
          </div>
          <Atata style={{ width: "8em" }} />
        </div>
      )}
    </div>
  );
};

const ChartContainer = ({ points }: { points: StullChartCalculatorPoint[] }) => {
  const { parentRef, width } = useParentSize({ debounceTime: 50 });
  return <div ref={parentRef} style={{ width: "100%", height: "400px" }}>
    <StullChart width={width} height={width / 3 * 2} points={points} />
  </div>;
};
