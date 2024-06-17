import React from "react";

const ConditionalButton = ({ onClick, showType, name, classes = "", icon }) => {
  let data = [
    ["bg-", "bg-[#13B497]"],
    ["w-", "w-full"],
  ];

  let tkn = 1;
  let value = "";

  data.map((itm) => {
    if (classes.search(itm[0]) == -1) {
      value = value + " " + itm[1];
    }
  });

  classes = classes + value;

  return (
    <>
      {showType == "invisible" && (
        <></>
      )}
      {showType == "disabled" && (
        <button
          className={`${classes} ${
            classes.includes("bg") ? "   bg-gray-500 " : " bg-gray-100 "
          } flex text-nowrap items-center rounded-md px-3 py-[2px] text-xs font-semibold leading-6 text-white shadow-md hover:bg-onHoverButton transition-colors duration-500`}
        >
          {name} {icon}
        </button>
      )}
      {showType == "visible" && (
        <button
          onClick={onClick}
          className={`${classes} ${
            classes.includes("bg") ? "  " : " bg-pbutton "
          } flex text-nowrap items-center rounded-md px-3 py-[2px] text-xs font-semibold leading-6 text-white shadow-md hover:bg-onHoverButton transition-colors duration-500`}
        >
          {name} {icon}
        </button>
      )}
    </>
  );
};

export default ConditionalButton;
