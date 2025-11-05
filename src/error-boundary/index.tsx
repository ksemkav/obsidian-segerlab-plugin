import React, { Component, ErrorInfo, ReactNode } from "react";
import Kafootka from "../assets/kafootka.svg";
import i18next from "i18next";
import { Trans } from "react-i18next";

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

export const ErrorMessage = ({message}: {message?: string}) => (<div
    style={{
      display: "block",
      minWidth: "400px",
      border: "1px solid var(--background-modifier-border)",
      padding: "1.5em",
      margin: "3px",
      boxSizing: "border-box",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Kafootka style={{
        width: "10em",
        height: "10em",
        minWidth: "10em",
        minHeight: "10em",
        marginRight: "2em",
      }} />
      <div style={{ display: "flex", flexDirection: "column", padding: "1em", gap: "1em" }}>
        <div style={{ fontWeight: 600, marginBottom: "1em" }}>{i18next.t("Error.Title")}</div>
        <div>
          <Trans i18nKey={"Error.Description"} style={{ whiteSpace: "pre-line" }}>
            Попробуйте ещё раз скопировать калькулятор или <a href={"https://t.me/glazprosvet/34074"} style={{
            color: "var(--text-accent)",
            cursor: "pointer",
            textDecoration: "none",
          }}> свяжитесь с нами</a>.
          </Trans>
        </div>
        { message && (<div>{message}</div>) }
        <div />
      </div>
    </div>
  </div>
);
