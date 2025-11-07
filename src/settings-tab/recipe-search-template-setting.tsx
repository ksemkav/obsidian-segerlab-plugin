import React from "react";
import { useTranslation } from "react-i18next";

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

  return <div style={{
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    font: "var(--font-interface-theme)",
  }}>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span className="setting-item-name">{t("Settings.RecipeSearchTemplate.Title")}</span>
      <div className="setting-item-description" style={{ whiteSpace: "pre-line", marginBottom: "1em" }}>
        {t("Settings.RecipeSearchTemplate.Description")}
      </div>
      <table className="setting-item-description">
        <tbody>
        {recipeSearchTemplates.map((template, index) => (
          <tr key={index} style={{ margin: "0.5em 0.5em 0 0" }}>
            <td style={{
              backgroundColor: "var(--background-modifier-hover)",
              padding: "0.25em 0.3em",
              borderRadius: "0.25em",
              userSelect: "text",
            }}>{template.value}</td>
            <td>{template.name}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
    <input type={"text"} defaultValue={defaultValue} onChange={onChange} />
  </div>;
};
