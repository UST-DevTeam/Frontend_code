import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import CommonForm from "./CommonForm";
import Button from "./Button";

const owner = [
  {
    value: "mabojaw696@gmail.com",
    label: "mabojaw696@gmail.com",
    selected: false,
  },
];

const pipeline = [
  { value: "Default Pipeline", label: "Default Pipeline", selected: false },
];

const pipeline_stage = [
  { value: "Research", label: "Research", selected: false },
  { value: "Contacted", label: "Contacted", selected: false },
  { value: "Pitched", label: "Pitched", selected: false },
  { value: "Diligence", label: "Diligence", selected: false },
  { value: "Committed", label: "Committed", selected: false },
];

const priority = [
  { value: "low", label: "Low", selected: false },
  { value: "medium", label: "Med", selected: false },
  { value: "high", label: "High", selected: false },
];

const answer = [
  { value: "yes", label: "Yes", selected: false },
  { value: "no", label: "No", selected: false },
];

const InvestorCRMDetailsHeader = ({ data, setData }) => {
  const [selectedOwner, setSelectedOwner] = useState("");
  const [selectedPipeline, setSelectedPipeline] = useState("");
  const [selectedPipelineStage, setSelectedPipelineStage] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [modalBody, setModalBody] = useState(<></>);
  const [modalHead, setModalHead] = useState(<></>);

  const headerInfoForm = [
    {
      label: "Investor Name",
      value: "",
      name: "investorName",
      required: true,
      type: "text",
    },
    {
      label: "Investor Location",
      value: "",
      name: "investorLocation",
      required: true,
      type: "text",
    },
  ];

  const reviewsForm = [
    {
      label: "Comment",
      value: "",
      name: "comment",
      required: true,
      type: "text",
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

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      investorName: data.name,
      investorLocation: data.location,
    },
  });

  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  const handleReviewSubmit = (res) => {
    setData((prev) => ({
      ...prev,
      reviews: [
        ...data.reviews,
        {
          rating: res?.rating,
          advice: res?.advice,
        },
      ],
    }));
    reset();
    setIsOpen(false);
  };

  const handleHeaderSubmit = (data) => {
    setData((prev) => {
      return {
        ...prev,
        name: data?.investorName,
        location: data?.investorLocation,
      };
    });
    setIsOpen(false);
  };

  const handleConnectorAdd = (dat) => {

    console.log("handleConnectorAdd", dat)

    dat["fundseekerCmpId"] = data?.uniqueId
    dispatch(InvestmentDiscoveryActions.postComment(dat, () => { setIsOpen(false) }))

  }



  return (
    <div className="my-5 bg-white border border-gray-200 rounded-md p-4 border-t-secLine border-t-4">
      <Modal
        size={"sm"}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalHead={modalHead}
      >
        {modalBody}
      </Modal>

      <div className="flex lg:flex-row flex-col w-full">
        <div className="flex ">
          <div className="rounded-full overflow-hidden w-24 h-fit mr-4 flex justify-between text-center">
            <img
              src="../../detail_logo.png"
              className="object-contain"
              alt=""
            />
          </div>
          <div className="flex justify-between flex-col">
            <div className="text-sm text-gray-600 font-poppins">Last Activity Today</div>
            <div className="flex items-center">
              <div className="text-3xl mr-2 text-secLine font-poppins font-semibold">{data?.name}</div>
              <button
                className="underline hover:cursor-pointer text-sm font-semibold font-poppins"
                onClick={() => {
                  setIsOpen(true);
                  setModalHead(<h1>Edit Header</h1>);
                  setModalBody(
                    <div>
                      <CommonForm
                        classes={"grid-cols-1 gap-1"}
                        Form={headerInfoForm}
                        errors={errors}
                        register={register}
                        setValue={setValue}
                        getValues={getValues}
                      />
                      <Button
                        name="Save"
                        onClick={handleSubmit(handleConnectorAdd)}
                      />
                    </div>
                  );
                }}
              >
                Edit
              </button>
            </div>
            <div className="flex items-center overflow-hidden whitespace-nowrap text-ellipsis font-poppins">
              <img src="../../icon.png" className="w-3 mr-2" />
              <div className="text-md  font-medium">
                {data?.location}
              </div>
            </div>
          </div>
        </div>
        {/* <div className='flex'>
                <div className='rounded-full overflow-hidden w-24 h-fit mr-4 flex justify-between text-center'>
                    <img src='../../detail_logo.png' className='w-24 object-contain' alt=''/>
                </div>
                <div className='flex justify-between flex-col'>
                    <div className='text-xs text-gray-600'>
                        Last Activity Today
                    </div>
                    <div className='flex items-center'>
                        <div className='text-2xl mr-2'>
                            {data?.name}
                        </div>
                        <button className='underline hover:cursor-pointer text-sm font-semibold text-secLine'>Edit</button>
                    </div>
                    <div className='flex items-center'>
                        <img src='../../icon.png' className='w-4 mr-2 '/>
                        <div className='overflow-hidden text-ellipsis text-sm  font-medium'>{data?.location}</div>
                    </div>
                </div>
            </div> */}
        <div className="flex lg:ml-auto lg:mx-0 mx-auto mt-2">
          <button
            className="px-2 py-1 h-fit rounded-sm text-sm mr-2"
            onClick={() => {
              setIsOpen(true);
              setModalHead(<h1>Add Review</h1>);
              setModalBody(
                <div>
                  <CommonForm
                    classes={"grid-cols-1 gap-1"}
                    Form={reviewsForm}
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                  <Button
                    name="Save"
                    onClick={handleSubmit(handleReviewSubmit)}
                  />
                </div>
              );
            }}
          >
            <Button name={"Review"} />
          </button>
          <button className="px-2 py-1 h-fit rounded-sm text-sm">
            <Button name={"Delete"} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 mt-6 sm:gap-0 sm:flex sm:justify-between">
        <div className="mb-4 w-full mr-4">
          <label
            htmlFor="owner"
            className="block text-md text-secLine font-poppins font-semibold tracking-wide "
          >
            Owner
          </label>
          <select
            id="owner"
            className="w-full mt-1 p-1 text-sm bg-gray-100 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent font-poppins"
            value={selectedOwner}
            onChange={(e) => handleChange(e, setSelectedOwner)}
          >
            {/* <option value="">Choose or type...</option> */}
            {owner?.map((type) => (
              <option key={type?.value} value={type?.value}>
                {type?.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full mr-4">
          <label
            htmlFor="pipeline"
            className="block text-md text-secLine font-poppins font-semibold tracking-wide "
          >
            Pipeline
          </label>
          <select
            id="pipeline"
            className="w-full mt-1 p-1 text-sm bg-gray-100 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent font-poppins"
            value={selectedPipeline}
            onChange={(e) => handleChange(e, setSelectedPipeline)}
          >
            {/* <option value="">Choose or type...</option> */}
            {pipeline?.map((type) => (
              <option key={type?.value} value={type?.value}>
                {type?.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full mr-4">
          <label
            htmlFor="pipeline-stage"
            className="block text-md text-secLine font-poppins font-semibold tracking-wide"
          >
            Pipeline Stage
          </label>
          <select
            id="pipeline-stage"
            className="w-full mt-1 p-1 text-sm bg-gray-100 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent font-poppins"
            value={selectedPipelineStage}
            onChange={(e) => handleChange(e, setSelectedPipelineStage)}
          >
            {/* <option value="">Choose or type...</option> */}
            {pipeline_stage?.map((type) => (
              <option key={type?.value} value={type?.value}>
                {type?.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full mr-4">
          <label
            htmlFor="priority"
            className="block text-md text-secLine font-poppins font-semibold tracking-wide "
          >
            Priority
          </label>
          <select
            id="priority"
            className="w-full mt-1 p-1 text-sm bg-gray-100 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent font-poppins"
            value={selectedPriority}
            onChange={(e) => handleChange(e, setSelectedPriority)}
          >
            {/* <option value="">Choose or type...</option> */}
            {priority?.map((type) => (
              <option key={type?.value} value={type?.value}>
                {type?.label}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4 w-full mr-4">
          <label
            htmlFor="answer"
            className="block text-md text-secLine font-poppins font-semibold tracking-wide "
          >
            Answer
          </label>
          <select
            id="answer"
            className="w-full mt-1 p-1 text-sm bg-gray-100 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent font-poppins"
            value={selectedAnswer}
            onChange={(e) => handleChange(e, setSelectedAnswer)}
          >
            {/* <option value="">Choose or type...</option> */}
            {answer?.map((type) => (
              <option key={type?.value} value={type?.value}>
                {type?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default InvestorCRMDetailsHeader;
