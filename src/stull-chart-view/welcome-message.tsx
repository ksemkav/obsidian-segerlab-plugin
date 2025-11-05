import { useTranslation } from "react-i18next";
import Rioppike from "../assets/rioppike.svg";

export const WelcomeMessage = () => {
  const { t } = useTranslation();
  return <div
    style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", width: "100%" }}>
    <Rioppike style={{ width: "70%", maxWidth: "20em", marginTop: "5em" }} />
    <h2 style={{ marginTop: "4em" }}>{t("Welcome.Title")}</h2>
    <div style={{ textAlign: "center", maxWidth: "20em", marginTop: "0.5em" }}>{t("Welcome.Text1")}</div>
    <div style={{ textAlign: "center", marginTop: "0.7em" }}>{t("Welcome.Text2")}</div>
  </div>;
};
