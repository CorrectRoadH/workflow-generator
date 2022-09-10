import React from "react";
import type { RootState } from "../store";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const CodeArea = () => {
  const code = useSelector((state: RootState) => state.app.code);
  const { t, i18n } = useTranslation();

  return (
    <div className="bg-red-500 h-screen">
      {t("area3")}
      <br></br>
      <textarea
        value={code}
        className="h-96 w-full bg-black text-white"
      ></textarea>
    </div>
  );
};

export default CodeArea;
