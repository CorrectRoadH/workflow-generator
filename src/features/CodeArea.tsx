import React from "react";
import type { RootState } from "../store";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const CodeArea = () => {
  const code = useSelector((state: RootState) => state.app.code);
  const { t } = useTranslation();
  return (
    <div className="bg-red-500 h-screen">
      {t("area3")}
      <br></br>
      <textarea
        value={code}
        className="h-96 w-full bg-black text-white"
      ></textarea>
      <div className="flex bg-blue-200 hover:bg-blue-300 rounded-md	w-48	h-10 m-auto">
        <button className="m-auto 	w-48	h-10 "
          onClick={() => {
            if (navigator.clipboard) {
              navigator.clipboard.writeText(code);
            }
            alert(t("copy success"));
          }}
        >
          {t("copy")}
        </button>
      </div>
    </div>
  );
};

export default CodeArea;
