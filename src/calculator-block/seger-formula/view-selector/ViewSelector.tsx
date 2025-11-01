import { FormulaViewType } from "../../../obsidian-segerlab-dtos";
import { useScopedTranslation } from "../../../localization/useScopedTranslation";
import styles from "./view-selector.module.css";
import clsx from "clsx";


export const ViewSelector = ({ value }: { value: FormulaViewType }) => {
  const { t } = useScopedTranslation("RecipeCalculator");
  const viewOptions = Object.values(FormulaViewType);

  return (
    <div className={styles.viewSelectorContainer}>
      {viewOptions.map((option, index) => (
        <div
          key={option}
          className={clsx(styles.viewSelectorOption, { [styles.viewSelectorOptionActive]: option === value })}
        >
          {t(`View.${option}`)}
        </div>
      ))}
    </div>
  );
};
