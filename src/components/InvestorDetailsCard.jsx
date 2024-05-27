import React, { useState } from "react";
import Button from "./Button";
import InvestmentDiscoveryActions from "../store/actions/InvestmentDiscoveryActions";
import { useDispatch } from "react-redux";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import CommonForm from "./CommonForm";
import { useNavigate } from "react-router-dom";

const InvestorDetailsCard = ({ data, layoutGrid }) => {
  const buttonContainerClasses = layoutGrid
    ? "flex-row flex-wrap"
    : "flex-col justify-between";

  let navigate = useNavigate()
  let dispatch = useDispatch()

  const [isOpen, setIsOpen] = useState(false)



  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();



  const handleConnectorAdd = (dat) => {

    console.log("handleConnectorAdd", dat)

    dat["fundseekerCmpId"] = data?.uniqueId
    dispatch(InvestmentDiscoveryActions.postComment(dat, () => { setIsOpen(false) }))

  }
  const companyDetails = (uniqueId) => {
    navigate("/investor/crm/details/"+uniqueId)
  }


  const addtocrm = (uniqueId) => {

    let dtaa = {
      fundseekerCmpId: uniqueId
    }

    dispatch(InvestmentDiscoveryActions.postinvestorCrmlist(dtaa))
  }


  // const contactAddForm = [
  //   {
  //     label: "Comment",
  //     value: "",
  //     name: "comment",
  //     required: true,
  //     type: "textarea",
  //   }
  // ]

  const contactAddForm = [
    {
      label: "Comment",
      value: "",
      name: "comment",
      required: true,
      type: "textarea",
    },
    {
      label:
        "What is your best piece of advice for approaching, pitching, or closing this Investor?",
      value: "",
      name: "advice",
      required: true,
      type: "textarea",
    },
  ];

  return (
    <div
      className={`p-4 border-solid border border-gray bg-white w-full investor-detail-card col-auto rounded-xl shadow-lg transition-all duration-700`}
    >
      <div
        className={`flex ${layoutGrid ? "flex-col" : "flex-row justify-between"
          } lg:justify-between mb-2 items-center`}
      >
        <div
          className={`min-w-fit mr-2 flex flex-col pb-2 lg:pb-1 py-1 ${layoutGrid ? "items-center" : "items-start"
            } text-blue-1 font-medium`}
        >
          <div className="ml-2 flex items-center text-secLine text-lg">
            <img className="w-12" src="../../investor-logo.png" alt="Logo" />
            {/* title */}
            <div>{data?.cName}</div>
          </div>
          {/* Investor type */}
          <div className="rounded-full m-0.5 px-4 bg-[var(--mainsec)] text-white w-fit">
            {data?.industryInterest}
          </div>
        </div>
        <div className="links flex md:mt-0 mt-2">
          {/* links */}
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noreferrer"
            className="flex bg-[var(--mainsec)] items-center justify-center w-7 h-7 p-1.5 mr-2 rounded-full shadow-md transition duration-200"
          >
            <img
              src="../../link.png"
              alt="link"
              className="w-6 h-6 object-contain text-gray-600 hover:text-gray-800"
            />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noreferrer"
            className="flex bg-[var(--mainsec)] items-center justify-center w-7 h-7 p-1.5 mr-2 rounded-full shadow-md transition duration-200"
          >
            <img
              src="../../twitter-white.png"
              alt="twitter"
              className="w-6 h-6 object-contain text-gray-600 hover:text-gray-800"
            />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="flex bg-[var(--mainsec)] items-center justify-center w-7 h-7 p-1.5 mr-2 rounded-full shadow-md transition duration-200"
          >
            <img
              src="../../linkedin-white.png"
              alt="linkedin"
              className="w-6 h-6 object-contain text-gray-600 hover:text-gray-800"
            />
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            className="flex bg-[var(--mainsec)] items-center justify-center w-7 h-7 p-1.5 mr-2 rounded-full shadow-md transition duration-200"
          >
            <img
              src="../../facebook-white.png"
              alt="facebook"
              className="w-6 h-6 object-contain text-gray-600 hover:text-gray-800"
            />
          </a>
          <a
            href="https://www.google.com"
            target="_blank"
            rel="noreferrer"
            className="flex bg-[var(--mainsec)] items-center justify-center w-7 h-7 p-1.5 mr-2 rounded-full shadow-md transition duration-200"
          >
            <img
              src="../../Google-white.png"
              alt="google"
              className="w-6 h-6 object-contain text-gray-600 hover:text-gray-800"
            />
          </a>
        </div>
      </div>
      <div
        className={`w-full flex ${layoutGrid ? `flex-col` : `flex-row justify-between`
          }`}
      >
        <div className={`${layoutGrid ? "" : "w-4/5"}`}>
          <div className="pb-1 font-poppins text-justify text-md">
            {/* description */}
            {data?.description}
          </div>
          <div className="pt-3 pl-12">
            <div className="font-bold text-txt-neavy">
              Smart Card Number : {data.smartcardnumber}
            </div>
            {/* {investments} */}
            <div className="font-poppins">
              {data?.investments?.map((investment) => (
                <div>{`${investment?.name} - ${investment?.amount} - ${investment?.stage}`}</div>
              ))}
            </div>
          </div>
        </div>
        <div className={`flex ${buttonContainerClasses} pt-2 w-fit justify-center my-4`}>
          <Button onClick={(e) => { addtocrm(data?.uniqueId) }} classes='font-bold text-base p-1 w-48 mb-2 mr-2' name={"Add to Investor CRM"}></Button>
          <Button onClick={() => { setIsOpen(true) }} classes='font-bold text-base p-1 w-48 mb-2 mr-2' name={"Add Review"}></Button>
          <Button onClick={(e) => { companyDetails(data?.uniqueId) }}  classes='font-bold text-base p-1 w-48 mb-2 mr-2' name={"View Details"}></Button>

        </div>
      </div>
      <Modal
        size={"lg"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalHead={"modalHead"}
      >
        <CommonForm
          classes={"grid-cols-1 gap-1"}
          Form={contactAddForm}
          errors={errors}
          register={register}
          setValue={setValue}
          getValues={getValues}
        />
        <Button
          classes="w-full d-block mx-auto p-10"
          name="Submit"
          onClick={handleSubmit(handleConnectorAdd)}
        />
      </Modal>
    </div>
  );
};

export default InvestorDetailsCard;
