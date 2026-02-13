import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./recipe-search-template.module.css";

export const RecipeSearchTemplateSetting = ({ defaultValue, onChange }: {
  defaultValue: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>
}) => {
  const {t} = useTranslation();

  const recipeSearchTemplates = [
    { name: t("Settings.RecipeSearchTemplate.Options.Option1"), value: `/\\"recipeId\\":\\s*{{recipeId}}/` },
    { name: t("Settings.RecipeSearchTemplate.Options.Option2"), value: `"{{recipeName}}"` },
    { name: t("Settings.RecipeSearchTemplate.Options.Option3"), value: "[\"segerlab-recipe-id\":{{recipeId}}]" },
  ];

  return <div className={styles.container}>
    <div className={styles.contentSection}>
      <span className="setting-item-name">{t("Settings.RecipeSearchTemplate.Title")}</span>
      <div className={`setting-item-description ${styles.description}`}>
        {t("Settings.RecipeSearchTemplate.Description")}
      </div>
      <table className="setting-item-description">
        <tbody>
        {recipeSearchTemplates.map((template, index) => (
          <tr key={index} className={styles.optionRow}>
            <td className={styles.optionCode}>{template.value}</td>
            <td>{template.name}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
    <input type={"text"} defaultValue={defaultValue} onChange={onChange} />
  </div>;
};
