
import React, { useState } from 'react';


// const FilePicker = ({ itm, errors, handleSubmit, setValue, getValues, register }) => {

//     return <>
//         <input type={itm.type}
//             multiple={itm?.multiple ? true : false}
//             {...register(itm.name,
//                 {
//                     required: itm.required ? "This " + " Field is required" : false,
//                     ...itm.props
//                 }
//             )}
//             className=" block w-full text-sm text-black border h-10 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-black focus:outline-none dark:bg-white dark:border-black dark:placeholder-black pl-1.5 pt-1.5"
//             {...itm.props} 
//         />
//         <p className='text-xs text-rose-400 font-bold '>{errors[itm.name]?.message}</p>
//     </>
// };

// export default FilePicker;




const FilePicker = ({ itm, errors, register }) => {
  const [selectedFileName, setSelectedFileName] = useState("");

  const existingFileName = itm?.fieldValue?.split("/").pop();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileName(file.name);
    }
  };

  return (
    <>
      <div className="flex gap-2 items-center w-full text-sm text-black border h-10 border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-black focus:outline-none dark:bg-white dark:border-black dark:placeholder-black pl-1.5 pt-1.5">
        <input
          type={itm.type}
          multiple={itm?.multiple || false}
          {...register(itm.name, {
            required: itm.required ? "This Field is required" : false,
            ...itm.props,
          })}
          className={`block ${(selectedFileName || existingFileName ) ? 'w-[100px]' : 'w-full'} text-sm text-black border h-8 rounded-lg cursor-pointer bg-gray-50 dark:text-black focus:outline-none dark:bg-white pl-1.5 pt-0.3`}
          onChange={handleFileChange}
          {...itm.props}
        />
        { (selectedFileName || existingFileName ) && <p className="truncate max-w-[200px]">
          {selectedFileName
            ? selectedFileName
            : existingFileName
            ? existingFileName.slice(0, 25) + "..."
            : "No File Chosen"}
        </p>}
      </div>
      <p className="text-xs text-rose-400 font-bold">
        {errors[itm.name]?.message}
      </p>
    </>
  );
};

export default FilePicker
