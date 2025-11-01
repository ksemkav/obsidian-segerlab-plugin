import { StullChartPointDto } from "../../obsidian-segerlab-dtos";
import { StullChart } from "../stull-chart/stull-chart";
import { localFormat } from "../../localization/date-helpers";
import styles from "./calculator-header.module.css";
import SegerIcon from "../../assets/icons/seger.svg";

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
  }: CalculatorHeaderProps) => (
  <div style={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
    alignItems: "top",
  }}>
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <StullChart
        minimized
        width={125}
        height={125}
        points={[{
          al2O3Value: stullChartPoint.al2O3Value,
          siO2Value: stullChartPoint.siO2Value,
          id: 0,
          name: title,
        }]} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: "2rem",
        }}
      >
        <div
          style={{
            fontWeight: 600,
            fontSize: "1.2rem",
            lineHeight: "1.2rem",
            fontFamily: "system-ui",
          }}
        >
          {title}
        </div>
        <div
          style={{
            color: "var(--text-faint)",
            fontSize: "0.9rem",
            lineHeight: "2rem",
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
