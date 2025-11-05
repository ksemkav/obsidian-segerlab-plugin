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

  return (
    <div style={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: "1.5em",
      alignItems: "top",
    }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <div ref={parentRef} style={{ width: "7.8em", height: "7.8em" }}>
          <StullChart
            minimized
            width={width}
            height={height}
            points={[{
              al2O3Value: stullChartPoint.al2O3Value,
              siO2Value: stullChartPoint.siO2Value,
              id: 0,
              name: title,
            }]} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: "2em",
          }}
        >
          <div
            style={{
              fontWeight: 600,
              fontSize: "1.2em",
              lineHeight: "1.2em",
              fontFamily: "system-ui",
            }}
          >
            {title}
          </div>
          <div
            style={{
              color: "var(--text-faint)",
              fontSize: "0.9em",
              lineHeight: "2em",
              fontFamily: "system-ui",
            }}
          >
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
