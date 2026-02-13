import { useTranslation } from "react-i18next";
import Rioppike from "../assets/rioppike.svg";
import styles from "./welcome-message.module.css";

export const WelcomeMessage = () => {
  const { t } = useTranslation();
  return <div className={styles.container}>
    <Rioppike className={styles.logoContainer} />
    <h2 className={styles.title}>{t("Welcome.Title")}</h2>
    <div className={styles.descriptionText}>{t("Welcome.Text1")}</div>
    <div className={styles.descriptionSubtext}>{t("Welcome.Text2")}</div>
  </div>;
};
