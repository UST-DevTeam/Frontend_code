import React, { useEffect, useState } from "react";
import Button from "./Button";
import { UilAngleDown, UilAngleUp } from "@iconscout/react-unicons";
import Modalmoreinfo from "./Modalmoreinfo";
import { useForm } from "react-hook-form";

const AdvancedTableExpandableOneRow = ({
  multiSelect,
  setOpenModal,
  setModalBody,
  table,
  itm,
  hide,
}) => {
  const [expand, setExpand] = useState(false);
//   const [addRow, setAddRow] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

  return (
    <>
      <tr>
        <td className="text-[12px] pl-1 border-pcol border-[0.1px] text-primaryLine">
          <span
            onClick={() => {
              setExpand((prev) => !prev);
            }}
          >
            {expand ? <UilAngleUp /> : <UilAngleDown />}
          </span>
        </td>

        {/* <td className="text-[12px] pl-1 border-primaryLine border-[1.5px] text-primaryLine">
          <Button
            name="Add Expense"
            classes="w-fit"
            onClick={() => {
              setAddRow((prev) => !prev);
            }}
          /> 
        </td> */}

        {table.columns.map((innerItm, index) => {
          return hide.indexOf(String(index)) == -1 ? (
            <td
              className={`text-[12px] pl-1 border-pcol border-[0.1px] text-white ${
                innerItm.style ? innerItm.style : " min-w-[300px] max-w-[500px]"
              }`}
            >
              <Modalmoreinfo
                ctt={32}
                setModalBody={setModalBody}
                setOpenModal={setOpenModal}
                value={itm[innerItm.value]}
              />
            </td>
          ) : (
            <></>
          );
        })}
      </tr>

      {expand &&
        table?.childs &&
        Object.entries(table.childs)?.map((onewq) => {
          return itm[onewq[0]]?.map((onewqq) => {
            {/* console.log(onewqq.uniqueId, "onewqq.uniqueId"); */}
            return (
              <tr>
                <td className="text-[12px] pl-1 border-pcol border-[0.1px] bg-[#3e454d] text-primaryLine ">
                  {multiSelect ? (
                    <div className="flex justify-center">
                      <input
                        type="checkbox"
                        name="groupOfCheck[]"
                        value={onewqq.uniqueId}
                      />
                    </div>
                  ) : (
                    <></>
                  )}
                </td>

                {table?.childs[onewq[0]]?.map((itts) => {
                  {/* console.log(itts, onewqq, "ittsittsittsittsitts"); */}
                  return (
                    <td
                      className={`text-[12px] pl-1 cursor-pointer border-pcol border-[0.1px] bg- text-white ${
                        itts.style ? itts.style : " min-w-[300px] max-w-[500px]"
                      }`}
                    >
                      <Modalmoreinfo
                        ctt={32}
                        setModalBody={setModalBody}
                        setOpenModal={setOpenModal}
                        value={onewqq[itts.value]}
                      />
                    </td>
                  );
                })}
                {/* {
                            Object.entries(table.childs).map((onewq) => {

                                console.log(onewq, "onewqonewqonewqonewq")
                                return onewq[1].map((innerItm, index) => {

                                    console.log(itm[onewq[0]], innerItm.value, "innerItminnerItminnerItm")

                                    return itm[onewq[0]].map((itts) => {
                                        return <td className={`text-[14px] pl-1 border-primaryLine border-2 text-primaryLine ${innerItm.style ? innerItm.style : " min-w-[300px] max-w-[500px]"}`}>
                                            <Modalmoreinfo ctt={32} setModalBody={setModalBody} setOpenModal={setOpenModal} value={itts[innerItm.value]} />
                                        </td>
                                    })
                                })
                            })
                        } */}
              </tr>
            );
          });
        })}

      {/* {addRow && (
        
        <tr className="!text-[11.px]">
            <td></td>
            <td></td>
          <td>
            <p>{itm?.ExpenseNo}</p>
          </td>
          <td>
            <input className="!border-2 border-green-500 rounded-sm p-2 w-full"
              type="text"
              placeholder=""
              {...register("expense", {
                required: true,
              })}
            />
          </td>
          <td>
            <input className="!border-2 border-green-500 rounded-sm p-2 w-full"
              type="text"
              placeholder=""
              {...register("expense", {
                required: true,
              })}
            />
          </td>
          <td>
            <input className="!border-2 border-green-500 rounded-sm p-2 w-full"
              type="text"
              placeholder=""
              {...register("expense", {
                required: true,
              })}
            />
          </td>
          <td>
            <input className="!border-2 border-green-500 rounded-sm p-2 w-full"
              type="datetime"
              placeholder=""
              {...register("expense", {
                required: true,
              })}
            />
          </td>
          <td>
            <input className="!border-2 border-green-500 rounded-sm p-2 w-full"
              type="text"
              placeholder=""
              {...register("expense", {
                required: true,
              })}
            />
          </td>
          <td>
            <input className="!border-2 border-green-500 rounded-sm p-2 w-full"
              type="text"
              placeholder=""
              {...register("expense", {
                required: true,
              })}
            />
          </td>
          <td>
            <input className="!border-2 border-green-500 rounded-sm p-2 w-full"
              type="text"
              placeholder=""
              {...register("expense", {
                required: true,
              })}
            />
          </td>
          <td>
            <input className="!border-2 border-green-500 rounded-sm p-2 w-full"
              type="text"
              placeholder=""
              {...register("expense", {
                required: true,
              })}
            />
          </td>
          <td>
            <input className="!border-2 border-green-500 rounded-sm p-2 w-full"
              type="number"
              placeholder=""
              {...register("expense", {
                required: true,
              })}
            />
          </td>
          <td>
            <input className="!border-2 border-green-500 rounded-sm p-2 w-full"
              type="number"
              placeholder=""
              {...register("expense", {
                required: true,
              })}
            />
          </td>
          <td>
            <input className="!border-2 border-green-500 rounded-sm p-2 w-full"
              type="number"
              placeholder=""
              {...register("expense", {
                required: true,
              })}
            />
          </td>
          <td>
            <input className="!border-2 border-green-500 rounded-sm p-2 w-full"
              type="text"
              placeholder=""
              {...register("expense", {
                required: true,
              })}
            />
          </td>
          <div>
            <Button name='Submit' />
          </div>
        </tr>
      )} */}
    </>
  );
};

export default AdvancedTableExpandableOneRow;
