import React from "react";
import { Group } from "@visx/group";
import { GridColumns, GridRows } from "@visx/grid";
import { AxisBottom, AxisLeft } from "@visx/axis";
import { AreaClosed, Circle } from "@visx/shape";
import { StullChartPointDto } from "../../obsidian-segerlab-dtos";
import { GlyphTriangle } from "@visx/glyph";
import { useTooltip, useTooltipInPortal } from "@visx/tooltip";
import styles from "./stull-chart.module.css";
import clsx from "clsx";
import { localPoint } from "@visx/event";
import { crazingData, mattesData, semiMattesData, underfiredData, unfusedData } from "./areas-constants";
import { scaleLinear } from "@visx/scale";

// Maximum and minimum values of Al2O3 and SiO2 that can be displayed on the Stull chart.
const getMaxSiO2Value = (minimized?: boolean) => (minimized ? 6.6 : 7.2);
const minSiO2Value = 0.6;
const getMaxAl2O3Value = (minimized?: boolean) => (minimized ? 0.9 : 1);
const minAl2O3Value = 0;

// Dummy points to render points that are outside the Stull chart.
const maxX = (minimized?: boolean) => (minimized ? 6.4 : 7.1);
const minX = 0.75;
const maxY = (minimized?: boolean) => (minimized ? 0.86 : 0.98);
const minY = 0.02;

const calculatePointCoordinate = (p: StullChartPointDto, minimized = true): StullChartPointDto => ({
  siO2Value: Math.min(Math.max(p.siO2Value, minX), maxX(minimized)),
  al2O3Value: Math.min(Math.max(p.al2O3Value, minY), maxY(minimized)),
});

/**
 * Defines the rotation of triangle symbol in case when point is outside the chart.
 * When null is returned, normal circle symbol is rendered.
 */
const defineSymbol = (point: StullChartPointDto, minimized = true) => {
  if (point && point.al2O3Value > getMaxAl2O3Value(minimized)) {
    return "rotate(0)";
  }
  if (point && point.siO2Value > getMaxSiO2Value(minimized)) {
    return "rotate(90)";
  }
  if (point && point.siO2Value <= minSiO2Value) {
    return "rotate(270)";
  }
  if (point && point.al2O3Value <= minAl2O3Value) {
    return "rotate(180)";
  }
  return null;
};

export interface StullChartCalculatorPoint {
  al2O3Value: number;
  siO2Value: number;
  id: number;
  name: string;
}

export type StullChartProps = {
  points: StullChartCalculatorPoint[];
  minimized?: boolean;
  width?: number;
  height?: number;
};

const fullSize = { defaultWidth: 350, defaultHeight: 270, margin: { top: 0, right: 0, bottom: 25, left: 0 } };
const minimizedSize = { defaultWidth: 150, defaultHeight: 150, margin: { top: 0, right: 0, bottom: 0, left: 0 } };

export const StullChart = (
  {
    points, minimized, width: widthProp, height: heightProp,
  }: StullChartProps) => {
  const {
    tooltipData,
    tooltipLeft,
    tooltipTop,
    tooltipOpen,
    showTooltip,
    hideTooltip,
  } = useTooltip();

  const { defaultWidth, defaultHeight, margin } = minimized ? minimizedSize : fullSize;
  const width = widthProp || defaultWidth;
  const height = heightProp || defaultHeight;

  const { containerRef, TooltipInPortal } = useTooltipInPortal({
    detectBounds: true,
    scroll: true,
  });

  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;

  const yScale = scaleLinear({
    domain: [minAl2O3Value, getMaxAl2O3Value(minimized)],
    range: [yMax, 0],
  });
  const xScale = scaleLinear({
    domain: [minSiO2Value, getMaxSiO2Value(minimized)],
    range: [0, xMax],
  });

  const handleMouseOver = (point: StullChartCalculatorPoint) => (event: React.MouseEvent) => {
    const svgElement = (event.target as SVGElement).ownerSVGElement;
    if (svgElement) {
      const coords = localPoint(svgElement, event);
      showTooltip({
        tooltipLeft: coords?.x,
        tooltipTop: coords?.y,
        tooltipData: point,
      });
    }
  };

  /** Calculates tick values for the axes. First and last ticks are excluded. */
  const calcTicks = (startValue: number, step: number, maxValue: number) => {
    const ticks = [];
    for (let value = startValue + step; value <= maxValue - step; value += step) {
      ticks.push(value);
    }
    return ticks;
  };
  const xTicks = calcTicks(minSiO2Value, 0.6, getMaxSiO2Value(minimized));
  const yTicks = calcTicks(minAl2O3Value, 0.1, getMaxAl2O3Value(minimized));

  return (
    <div className={clsx(styles.stullChartWrapper)}>
      <svg width={width} height={height} ref={containerRef}>
        <rect className={styles.stullChartContainer} x={0} y={0} width={width} height={height} />
        <Group left={margin.left} top={margin.top}>
          {!minimized && (<>
            <GridRows stroke={"var(--background-modifier-border)"} scale={yScale} width={xMax} height={yMax}
                      tickValues={yTicks} />
            <GridColumns stroke={"var(--background-modifier-border)"} scale={xScale} width={xMax} height={yMax}
                         tickValues={xTicks} />
            <AxisBottom top={yMax - 5} scale={xScale} hideTicks hideAxisLine tickValues={xTicks}
                        tickLabelProps={{ className: styles.stullChartTickLabels }} />
            <AxisLeft left={30} scale={yScale} hideTicks hideAxisLine numTicks={9} tickValues={yTicks}
                      tickLabelProps={{ className: styles.stullChartTickLabels }} />
          </>)}
          <AreaClosed
            data={crazingData}
            x={(d) => xScale(d[0])}
            y={(d) => yScale(d[1])}
            yScale={yScale}
            className={styles.stullChartCrazingArea}
          />
          <AreaClosed
            data={unfusedData}
            x={(d) => xScale(d[0])}
            y={(d) => yScale(d[1])}
            yScale={yScale}
            className={styles.stullChartUnfusedArea}
          />
          <AreaClosed
            data={mattesData}
            x={(d) => xScale(d[0])}
            y={(d) => yScale(d[1])}
            yScale={yScale}
            className={styles.stullChartMattesArea}
          />
          <AreaClosed
            data={semiMattesData}
            x={(d) => xScale(d[0])}
            y={(d) => yScale(d[1])}
            yScale={yScale}
            className={styles.stullChartSemiMattesArea}
          />
          <AreaClosed
            data={underfiredData}
            x={(d) => xScale(d[0])}
            y={(d) => yScale(d[1])}
            yScale={yScale}
            className={styles.stullChartUnderfiredArea}
          />
          {
            points.map((point, index) => {
              const rotation = defineSymbol(point, minimized);
              if (rotation !== null) {
                const adjustedPoint = calculatePointCoordinate(point, minimized);
                return (
                  <GlyphTriangle
                    key={`point-${index}`}
                    className={styles.stullPoint}
                    left={xScale(adjustedPoint.siO2Value)}
                    top={yScale(adjustedPoint.al2O3Value)}
                    r={"0.31em"}
                    fill="#ffffff"
                    transform={rotation}
                    cursor={"pointer"}
                    onMouseLeave={hideTooltip}
                    onMouseOver={handleMouseOver(point)}
                  />
                );
              } else {
                return (
                  <Circle
                    key={`point-${index}`}
                    className={styles.stullPoint}
                    cx={xScale(point.siO2Value)}
                    cy={yScale(point.al2O3Value)}
                    r={"0.31em"}
                    onMouseLeave={hideTooltip}
                    onMouseOver={handleMouseOver(point)}
                  />
                );
              }
            })
          }
        </Group>
      </svg>
      <TooltipInPortal
        key={Math.random()}
        top={tooltipTop}
        left={tooltipLeft}
        detectBounds
        offsetLeft={10}
        offsetTop={10}
        className={clsx(styles.stullPointTooltip, { [styles.stullPointTooltipHidden]: !tooltipOpen })}
        unstyled
        applyPositionStyle>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {!minimized && (<div style={{ fontWeight: 600 }}>{(tooltipData as StullChartCalculatorPoint)?.name}</div>)}
          <div>{`${(tooltipData as StullChartCalculatorPoint)?.siO2Value?.toFixed(3)} SiO₂, ${(tooltipData as StullChartPointDto)?.al2O3Value?.toFixed(3)} Al₂O₃`}</div>
        </div>
      </TooltipInPortal>
    </div>
  );
};
