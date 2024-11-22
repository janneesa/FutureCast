import React from "react";

const Switcher = ({ isChecked, onChange }) => {
  return (
    <label className="flex cursor-pointer select-none items-center">
      <div className="relative">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={`box block h-6 w-10 rounded-full border ${
            isChecked ? "bg-primaryButton" : "bg-mutedText"
          }`}
        ></div>
        <div
          className={`absolute left-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white transition ${
            isChecked ? "translate-x-full" : ""
          }`}
        ></div>
      </div>
    </label>
  );
};

export default Switcher;
