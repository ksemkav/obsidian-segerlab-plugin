export enum FormulaViewType {
  SegerFormula = "SegerFormula",
  PercentsMolar = "PercentsMolar",
}

export interface RecipeCalculationDto {
  /** Id of the Calculation in the system. */
  calculationId: number;
  /**Name of the Calculation. */
  name: string;
  /** Selected formula view type, to display in recipe calculation view. */
  formulaViewType: FormulaViewType;
  /** In case of true, additional ingredients would be included into calculation. */
  includeAdditionsIntoCalculations: boolean;
  /** Ids of calculation versions in historical order. */
  //historyRecordsIds: CalculationHistoryRecordHeaderDto[];
  /** Datetime, when the current version of the Calculation was created. */
  versionCreatedAt: Date;

  /** Ingredients */
  ingredients: IngredientFieldDto[];

  calculation: RecipeCalculationBaseDto;
}

export interface IngredientFieldDto {
  index: number;
  name: string;
  amount: number;
  isAdditional: boolean;
}

export interface RecipeCalculationBaseDto {
  /** Chemical formula of the glaze, that is represented as percents molar.
   Stored as dictionary, where key is  and value is percentage of oxide in the material.
   Null if can't be calculated. */
  formula: {
    [key in keyof typeof OxideRoles]?: {
      [key in keyof typeof Oxide]?: number;
    };
  };
  /** Point to display on Stull chart. */
  stullChartPoint: StullChartPointDto;
  /** Sum of Recipe values without additional ingredients. */
  ingredientsOverallSum: number;
  /** Sum of Alcali oxides in Seger's formula. */
  alcaliSum: number | null;
  /** Sum of AEarth oxides in Seger's formula. */
  aEarthSum: number | null;
  /** Ratio of SiO2 to Al2O3. */
  siliconAluminumOxidesRatio: number;
  /** Calculate molar thermal expansion of the recipe. */
  molarThermalExpansion: number;
  /** Calculate molar thermal expansion of the recipe. */
  molecularMassThermalExpansion: number;
  /** Calculated fluxability parameters. */
  calculatedFluxibility: CalculatedFluxibility;
  /** Calculated acidity ratio. */
  acidityRatio: number | null;
}

export enum OxideRoles {
  Alcali = "Alcali",
  AEarth = "AEarth",
  Stabs = "Stabs",
  GFormers = "GFormers",
  Other = "Other",
}

export enum Oxide {
  Loi = "Loi",
  SiO2 = "SiO2",
  Al2O3 = "Al2O3",
  B2O3 = "B2O3",
  Li2O = "Li2O",
  Na2O = "Na2O",
  K2O = "K2O",
  BeO = "BeO",
  MgO = "MgO",
  CaO = "CaO",
  SrO = "SrO",
  BaO = "BaO",
  P2O5 = "P2O5",
  TiO2 = "TiO2",
  ZrO = "ZrO",
  ZrO2 = "ZrO2",
  V2O5 = "V2O5",
  Cr2O3 = "Cr2O3",
  MnO = "MnO",
  MnO2 = "MnO2",
  FeO = "FeO",
  Fe2O3 = "Fe2O3",
  CoO = "CoO",
  NiO = "NiO",
  CuO = "CuO",
  Cu2O = "Cu2O",
  CdO = "CdO",
  ZnO = "ZnO",
  F = "F",
  PbO = "PbO",
  SnO2 = "SnO2",
  HfO2 = "HfO2",
  Nb2O5 = "Nb2O5",
  Ta2O5 = "Ta2O5",
  MoO3 = "MoO3",
  WO3 = "WO3",
  OsO2 = "OsO2",
  IrO2 = "IrO2",
  PtO2 = "PtO2",
  Ag2O = "Ag2O",
  Au2O3 = "Au2O3",
  GeO2 = "GeO2",
  As2O3 = "As2O3",
  Sb2O3 = "Sb2O3",
  Bi2O3 = "Bi2O3",
  SeO2 = "SeO2",
  La2O3 = "La2O3",
  CeO2 = "CeO2",
  PrO2 = "PrO2",
  Pr2O3 = "Pr2O3",
  Nd2O3 = "Nd2O3",
  U3O8 = "U3O8",
  Sm2O3 = "Sm2O3",
  Eu2O3 = "Eu2O3",
  Tb2O3 = "Tb2O3",
  Dy2O3 = "Dy2O3",
  Ho2O3 = "Ho2O3",
  Er2O3 = "Er2O3",
  Tm2O3 = "Tm2O3",
  Yb2O3 = "Yb2O3",
  Lu2O3 = "Lu2O3",
  Gd2O3 = "Gd2O3",
  Y2O3 = "Y2O3",
  Tl2O3 = "Tl2O3",
  Ga2O3 = "Ga2O3",
}

export interface StullChartPointDto {
  /** Value of the Al2O3. */
  al2O3Value: number;
  /** Value of the SiO2. */
  siO2Value: number;
}

export enum TemperatureZone {
  Within = "Within",
  Below = "Below",
  Above = "Above",
}

export interface CalculatedFluxibility {
  temperature: number;
  coefficient: number;
  temperatureZone: TemperatureZone;
}
