// import React, { useEffect, useState } from "react";
// import Select from "react-select";

// const NewSingleSelectForm45 = ({ itm, errors, setValue, getValues }) => {
//   const [selectedValue, setSelectedValue] = useState(null);

//   const options = itm.option.map(option => ({
//     value: option.id,
//     label: option.name,
//   }));

//   useEffect(() => {
//     if (getValues()[itm.name]) {
//       const oldValue = getValues()[itm.name];
//       const selectedOption = options.find(option => option.value === oldValue);
//       setSelectedValue(selectedOption);
//     }
//   }, [getValues, itm.name, options]);

//   const handleSelectChange = (selected) => {
//     setSelectedValue(selected);
//     setValue(itm.name, selected ? selected.value : '');
//   };

//   return (
//     <div className="max-w-[180px] min-w-[180px] relative p-0 z-50 w-full">
//       <Select
//         value={selectedValue}
//         onChange={handleSelectChange}
//         options={options}
//         styles={{
//           control: (provided) => ({
//             ...provided,
//             border: "1px solid black",
//             borderRadius: "0.375rem",
//             height: "38px",
//             boxShadow: "none",
//             "&:hover": {
//               borderColor: "indigo",
//             },
//           }),
//           input: (provided) => ({
//             ...provided,
//             color: "black",
//             padding: "0px",
//           }),
//           placeholder: (provided) => ({
//             ...provided,
//             color: "gray",
//           }),
//         }}
//         className="pt-1 text-black bg-white block h-12 rounded-md py-1.5 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
//       />
//       {errors[itm.name] && <span className="text-red-500">{errors[itm.name].message}</span>}
//     </div>
//   );
// };

// export default NewSingleSelectForm45;
import { MultiSelect } from "react-multi-select-component";
import React, { useEffect, useState } from "react";
// import { Select } from "@material-ui/core";
import Select from "react-select";


const NewSingleSelectForm45 = ({
  itm,
  errors,
  handleSubmit,
  setValue,
  getValues,
  register,
  classes,
}) => {
  const [selectedValues, setSelectedValues] = useState([]);

  console.log(itm,"_________itmitm")

  const SelectAllOption = { name: "Select All", id: "select-all" };
  let datew = [];
  if (getValues()[itm.name]) {
    let oldData = getValues()[itm.name].split(",");

    datew = itm.option.filter((itm) => {
      if (oldData.indexOf(itm.id) != -1) {
        return itm;
      }
    });
  }

  useEffect(() => {
    if (itm.props.selectType) {
      setSelectedValues([]);
      setValue(itm.name, '');
    }
  }, [itm.props.selectType]);

  const handleSelect = (e) => {
    let finalselection = e.map((itm) => itm.id);
    setSelectedValues(e);
    console.log("asasfasfasfafasfadsaf__onSelect",e);
    setValue(itm.name, finalselection.join());
  };

  const handleRemove = (e) => {
    let finalselection = e.map((itm) => itm.id);
    setSelectedValues(e);
    console.log("afafafafasdfadsasfasdf__onRemove",e);
    setValue(itm.name, finalselection.join());
  };
  console.log("asdfasadfsasafasfadsfadf__selectedValues",selectedValues);
  return (
        <div className={`max-w-[180px] min-w-[180px]  relative p-0 z-50  w-full`}>
            <Select
                // className="outline-none border rounded-md border-main w-full mt-[2px] z-9999"
                options={itm.option}
                // value={value}
                defaultIsOpen={false}
                onChange={(data) => {
                    cb(data) 
                    setLength(data.length)
                    }
                }
                style={{
                    searchBox: {
                        border: "none",
                        "border-radius": "0px",
                        padding: "0px",
                        color: "black !important",
                        height: "38px",
                    },
                }}
                className="pt-1 text-black bg-white border-black border block h-12 rounded-md py-1.5 p-2 text-black-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-200 sm:text-sm sm:leading-6"
            />
        </div>

    )
};

export default NewSingleSelectForm45;
