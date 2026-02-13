import { Component, ErrorInfo, ReactNode } from "react";
import Kafootka from "../assets/kafootka.svg";
import i18next from "i18next";
import { Trans } from "react-i18next";
import styles from "./error-boundary.module.css";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (<ErrorMessage />);
    }

    return this.props.children;
  }
}

export const ErrorMessage = ({message}: {message?: string}) => (
  <div className={styles.errorContainer}>
    <div className={styles.errorContent}>
      <Kafootka className={styles.errorIllustration} />
      <div className={styles.errorDetails}>
        <div className={styles.errorTitle}>{i18next.t("Error.Title")}</div>
        <div>
          <Trans i18nKey={"Error.Description"} className={styles.errorDescription}>
            Попробуйте ещё раз скопировать калькулятор или <a href={"https://t.me/glazprosvet/34074"} className={styles.errorLink}> свяжитесь с нами</a>.
          </Trans>
        </div>
        { message && (<div>{message}</div>) }
        <div />
      </div>
    </div>
  </div>
);
