"use client";
import React, { useEffect } from "react";
import { Provider, useSelector } from "react-redux";
import store, { persistor } from "../lib/store";
import { PersistGate } from "redux-persist/integration/react";

const GlobalProvider = ({ children }) => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeWrapper>{children}</ThemeWrapper>
        </PersistGate>
      </Provider>
    </>
  );
};

export default GlobalProvider;

const ThemeWrapper = ({ children }) => {
  const mode = useSelector((state) => state.theme.mode);
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [mode]);
  return <div className={`${mode} theme-transition`}>{children}</div>;
};
