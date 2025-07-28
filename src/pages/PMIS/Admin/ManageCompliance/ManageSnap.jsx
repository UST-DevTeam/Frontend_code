import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminActions from "../../../../store/actions/admin-actions";
import { backendassetUrl } from "../../../../utils/url";
import ReactDOM from "react-dom";
import CommonForm from "../../../../components/CommonForm";
import Button from "../../../../components/Button";
import { useForm } from "react-hook-form";
import Modal from "../../../../components/Modal";
import { ALERTS } from "../../../../store/reducers/component-reducer";
import projectListActions from "../../../../store/actions/projectList-actions";

const FormCard = ({
  shouldUpload,
  sampleImage,
  sIndex,
  checkL1 = true,
  indexes,
  projectData,
  L1Approver,
  l1ApproverForm,
}) => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState(false);
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    index: null,
    image: null,
  });

  const handleFormState = () => {
    if (shouldUpload) {
      setFormState((prev) => !prev);
    }
  };

  const handleImageSubmition = (data) => {
    const formData = new FormData();

    const content = { ...data, fieldName: sIndex, ...projectData };

    Object.keys(content).forEach((itm) => {
      formData.append(itm, content[itm]);
    });

    formData.delete("img");

    if (!l1ApproverForm) {
      if (checkL1) {
        if (!content?.L1UserId && !L1Approver) {
          let msgdata = {
            show: true,
            icon: "error",
            buttons: [],
            type: 1,
            text: "Please Select Your L1 Approver",
          };
          dispatch(ALERTS(msgdata));
          return;
        }
      }

      dispatch(
        AdminActions.patchComplinaceSnapImageSubmition(
          formData,
          () => {
            handleFormState();
            dispatch(
              projectListActions.globalComplianceTypeDataGet(
                projectData.siteuid,
                projectData.milestoneuid,
                "",
                true
              )
            );
          },
          checkL1 ? "" : projectData.siteuid,
          checkL1 ? "" : projectData.milestoneuid
        )
      );
    } else {
      formData.delete("uniqueId");

      dispatch(
        AdminActions.patchComplinaceApproverSnapImageSubmition(
          formData,
          projectData?.uniqueId,
          () => {
            handleFormState();
            dispatch(
              projectListActions.globalComplianceTypeApproverDataGet(
                projectData?.uniqueId,
                "",
                true
              )
            );
          }
        )
      );
    }
    reset();
  };

  const imageSubmitionForm = [
    {
      label: "Index",
      value: "",
      name: "index",
      required: true,
      type: "select",
      option: Array.from({ length: indexes }).map((_, index) => ({
        label: index + 1,
        value: index + 1,
      })),
    },
    {
      label: "Image",
      name: "img",
      required: true,
      type: "file",
      props: {
        onChange: (event) => {
          setValue("image", event.target.files[0]);
        },
      },
    },
  ];

  return (
    <>
      <div
        onClick={handleFormState}
        className="p-4 h-[160px] border-2 overflow-hidden bg-whit relative rounded-md border-gray-500 group cursor-pointer  grid place-items-center bg-cover bg-center"
        style={{ backgroundImage: `url(${sampleImage})` }}
      >
        <h2 className="text-sm font-bold absolute top-4 left-4 text-gray-100">
          {/* {sIndex} */}
        </h2>
        <div className="w-12 h-12 absolute -top-4 -left-4 formCard-shadow" />
        <div className="w-12 h-12 absolute -bottom-4 -right-4 formCard-shadow-2" />
        <svg
          className="w-[80px] group-hover:scale-[105%] h-[80px] fill-slate-300 transition-transform duration-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="..." />
        </svg>
      </div>
      {formState ? (
        <>
          <Modal
            isOpen={formState}
            setIsOpen={setFormState}
            onClose={true}
            modalHead={`Upload Snap for ${sIndex}`}
            size="sm"
            children={
              <>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-full pb-4">
                  <CommonForm
                    classes="grid-cols-2 gap-1"
                    Form={imageSubmitionForm}
                    errors={errors}
                    register={register}
                    setValue={setValue}
                    getValues={getValues}
                  />
                  <Button
                    classes={"mt-2 w-sm text-center flex mx-auto"}
                    name="Upload"
                    onClick={handleSubmit(handleImageSubmition)}
                  />
                </div>
              </>
            }
          />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const FullViewImage = ({
  fullView,
  sIndex,
  images,
  setFullView,
  approvedIndex,
  projectData,
  l1ApproverForm,
  viewOnly,
  remarks,
  disApprovedIndex
}) => {
  const dispatch = useDispatch();

  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [description, setDescription] = useState("");

  const handleFullView = (_) => {
    setFullView({ index: null, image: null,remark:null});
  };

  const handleImageNavigation = (direction) => {
    if (direction === "LEFT" && fullView.index !== 1) {
      setFullView({
        index: fullView.index - 1,
        image: images[fullView.index - 1 - 1].image,
        remark:remarks[fullView.index - 1 - 1].remark,
      });
    } else if (direction === "RIGHT" && fullView.index !== 10) {
      setFullView({
        index: fullView.index + 1,
        image: images[fullView.index + 1 - 1].image,
        remark:remarks[fullView.index + 1 - 1].remark,
      });
    }
  };

  useEffect(() => {
    const handleKeyPressEvent = (event) => {
      if (event.key === "ArrowLeft") {
        handleImageNavigation("LEFT");
      } else if (event.key === "ArrowRight") {
        handleImageNavigation("RIGHT");
      }
    };
    document.addEventListener("keydown", handleKeyPressEvent);
    return () => {
      document.removeEventListener("keydown", handleKeyPressEvent);
    };
  }, [fullView]);

  const handleImageApproval = () => {
    dispatch(
      projectListActions.globalComplianceTypeApproverDataPost(
        projectData?.uniqueId,
        {
          fieldName: sIndex,
          approvedIndex: `${fullView.index}`,
        },
        () => {
          dispatch(
            projectListActions.globalComplianceTypeApproverDataGet(
              projectData?.uniqueId,
              "",
              true
            )
          );
        }
      )
    );
  };

  const handleImageDisapproval = () => {
    if (!description){
      alert("This field cannot be left blank. Please provide a remark")
    }
    else{
      dispatch(
        projectListActions.globalComplianceTypeApproverDataPost(
          projectData?.uniqueId,
          {
            fieldName: sIndex,
            disApprovedIndex: `${fullView.index}`,
            remark:description
          },
          () => {
            dispatch(
              projectListActions.globalComplianceTypeApproverDataGet(
                projectData?.uniqueId,
                "",
                true
              )
            );
          }
        )
      );
    }
  };

  return (
    <>
    <div className="fixed inset-0 bg-[rgba(0,0,0,.8)] text-white z-[9999]">
      <div className="absolute flex justify-between inset-0 h-16 bg-[rgba(0,0,0,.1)] transition-all duration-500 hover:bg-[rgba(0,0,0,.4)] items-center gap-4 px-8">
        <div className="flex items-center space-x-2">
          <h2>{sIndex}</h2>
          <div className="w-3 h-[2px] bg-white"></div>
          <p>{fullView.index}</p>
        </div>

        <svg
          onClick={handleFullView}
          className="fill-white cursor-pointer hover:fill-gray-100 hover:scale-[110%] duration-300 transition-all  h-8 w-8 grid place-items-center right-4 top-[50%] rounded-full hover:bg-[rgba(0,0,0,.5)] group"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
        </svg>
      </div>
      <img
        src={
          fullView.image
            ? backendassetUrl + fullView.image
            : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
        }
        className="w-full h-full object-contain rounded-md"
      />
      <div className="absolute [transform:translate(0%,-50%)] left-4 top-[50%] h-10 w-10 grid place-items-center right-4 rounded-full hover:bg-[rgba(0,0,0,.2)] group transition-all duration-300">
        <svg
          onClick={() => {
            handleImageNavigation("LEFT");
          }}
          className="w-6 h-6 fill-white cursor-pointer group-hover:fill-gray-200 hover:scale-[115%] transition-all"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M22.0003 12.9999L22.0004 11L8.41421 11V5.58582L2 12L8.41421 18.4142L8.41421 13L22.0003 12.9999Z"></path>
        </svg>
      </div>
      <div className="absolute [transform:translate(0%,-50%)] h-10 w-10 grid place-items-center right-4 top-[50%] rounded-full hover:bg-[rgba(0,0,0,.2)] group transition-all duration-300">
        <svg
          onClick={() => {
            handleImageNavigation("RIGHT");
          }}
          className="w-6 h-6 fill-white rotate-180 cursor-pointer group-hover:fill-gray-200 hover:scale-[115%] transition-all"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M22.0003 12.9999L22.0004 11L8.41421 11V5.58582L2 12L8.41421 18.4142L8.41421 13L22.0003 12.9999Z"></path>
        </svg>
      </div>

      {/* NEW */}
      {fullView.remark ? (
          <div className="absolute bottom-20 group left-0 right-0 bg-[rgba(0,0,0,.1)] hover:bg-[rgba(0,0,0,.4)] transition-all duration-500 h-20 flex justify-center items-center gap-x-10">
            <p>{fullView.remark}</p>
          </div>
        ):(
          ""
        )}
        
        {/* OLD */}
      {/* {viewOnly ? (
        <></>
      ) : fullView.image && l1ApproverForm ? (
        <div className="absolute bottom-0  group left-0 right-0 bg-[rgba(0,0,0,.1)] hover:bg-[rgba(0,0,0,.4)] transition-all duration-500 h-20 flex justify-center items-center">
          {approvedIndex.includes(fullView.index) ? (
            <button
              onClick={handleImageApproval}
              className="flex justify-center items-center space-x-2 border-transparent group-hover:border-rose-500 border-t-2 transition-all duration-300 border-b-2 px-4 py-[6px] rounded-lg"
            >
              <svg
                className="w-8 h-8 cursor-pointer fill-red-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
              </svg>
              <p className="cursor-pointer font-bold text-lg">Disapprove</p>
            </button>
          ) : (
            <button
              onClick={handleImageApproval}
              className="flex justify-center items-center space-x-2 border-t-2 border-b-2 transition-all duration-300 border-transparent group-hover:border-green-500 px-4 py-[6px] rounded-lg"
            >
              <svg
                className="w-8 h-8 cursor-pointer fill-green-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="green"
              >
                <path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z"></path>
              </svg>
              <p className="cursor-pointer font-bold text-lg">Approve</p>
            </button>
          )}
        </div>
      ) : (
        <></>
      )} */}

      {/* NEW */}
      {viewOnly ? null : fullView.image && l1ApproverForm && (
          <div className="absolute bottom-0 group left-0 right-0 bg-[rgba(0,0,0,.1)] hover:bg-[rgba(0,0,0,.4)] transition-all duration-500 h-20 flex justify-center items-center gap-x-10">
           
            {/* Case 1: Not approved or disapproved yet — show both buttons */}
            {!approvedIndex.includes(fullView.index) && !disApprovedIndex.includes(fullView.index) && (
              <>
                <button
                  onClick={handleImageApproval}
                  className="flex justify-center items-center space-x-2 border-t-2 border-b-2 transition-all duration-300 border-transparent group-hover:border-green-500 px-4 py-[6px] rounded-lg"
                >
                  <svg
                    className="w-8 h-8 cursor-pointer fill-green-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="green"
                  >
                    <path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599Z" />
                  </svg>
                  <p className="cursor-pointer font-bold text-lg">Approve</p>
                </button>
 
                <button
                  onClick={() => setShowDescriptionModal(true)}
                  className="flex justify-center items-center space-x-2 border-transparent group-hover:border-rose-500 border-t-2 transition-all duration-300 border-b-2 px-4 py-[6px] rounded-lg"
                >
                  <svg
                    className="w-8 h-8 cursor-pointer fill-red-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672Z" />
                  </svg>
                  <p className="cursor-pointer font-bold text-lg">Reject</p>
                </button>
              </>
            )}
 
            {/* Case 2: Already approved — only show disapprove */}
            {approvedIndex.includes(fullView.index) && (
              <button
                onClick={() => setShowDescriptionModal(true)}
                className="flex justify-center items-center space-x-2 border-transparent group-hover:border-rose-500 border-t-2 transition-all duration-300 border-b-2 px-4 py-[6px] rounded-lg"
              >
                <svg
                  className="w-8 h-8 cursor-pointer fill-red-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672Z" />
                </svg>
                <p className="cursor-pointer font-bold text-lg">Reject</p>
              </button>
            )}
 
            {/* Case 3: Already disapproved — only show approve */}
            {disApprovedIndex.includes(fullView.index) && (
              <button
                onClick={handleImageApproval}
                className="flex justify-center items-center space-x-2 border-t-2 border-b-2 transition-all duration-300 border-transparent group-hover:border-green-500 px-4 py-[6px] rounded-lg"
              >
                <svg
                  className="w-8 h-8 cursor-pointer fill-green-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="green"
                >
                  <path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599Z" />
                </svg>
                <p className="cursor-pointer font-bold text-lg">Approve</p>
              </button>
            )}
          </div>
        )}

    </div>
    {/* Modal Code */}
      {showDescriptionModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[10000]">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-lg">
            <h2 className="text-xl font-bold mb-4">Remark</h2>
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md resize-none text-black"
              placeholder="Write your remark here..."
            />
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => {
                  setShowDescriptionModal(false);
                  setDescription("");
                }}
                className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleImageDisapproval}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>


  );
};

const ImageCard = ({
  index,
  images,
  sIndex,
  image,
  approvedIndex,
  projectData,
  l1ApproverForm,
  viewOnly,
  remarks,
  disApprovedIndex,
  remark,
  
}) => {
  const [fullView, setFullView] = useState({
    index: null,
    image: null,
    remark:null
  });
  const handleFullView = (_) => {
    // setFullView({ index: index, image: image });
    setFullView({ index: index, image: image,remark:remark });
  };

  return (
    <>
      <div
        onClick={handleFullView}
        className="group p-1 relative overflow-hidden border rounded-tl-md rounded-br-md"
      >
        <img
          src={
            image
              ? backendassetUrl + image
              : "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
          }
          className="w-full h-full group-hover:scale-[110%] rounded-sm transition-all duration-500"
        />
        {/* OLD */}
        {/* <div className="absolute text-white scale-125 place-items-center transition-all font-semibold duration-300 group-hover:grid hidden inset-0 bg-[rgba(0,0,0,.4)]">
          {index}
          {approvedIndex.includes(index) ? (
            <div className="w-[6px] h-[6px] bg-green-500 rounded-full -mt-10" />
          ) : (
            <></>
          )}
        </div> */}
        {/* NEW */}
        <div className="absolute text-white scale-125 place-items-center transition-all font-semibold duration-300 group-hover:grid hidden inset-0 bg-[rgba(0,0,0,.4)]">
         {index}
          {approvedIndex.includes(index) ? (
            <div className="w-[8px] h-[8px] bg-green-500 rounded-full -mt-10" />
          ): disApprovedIndex.includes(index) ?(
            <div className="w-[8px] h-[8px] bg-red-500 rounded-full -mt-10" />
          ):
            <></>
          }
        </div>
      </div>
      {fullView.index ? (
        ReactDOM.createPortal(
          <FullViewImage
            images={images}
            sIndex={sIndex}
            setFullView={setFullView}
            fullView={fullView}
            approvedIndex={approvedIndex}
            projectData={projectData}
            l1ApproverForm={l1ApproverForm}
            viewOnly={viewOnly}
            disApprovedIndex={disApprovedIndex}
            remarks = {remarks}
          />,
          document.getElementById("fullview")
        )
      ) : (
        <></>
      )}
    </>
  );
};

const ImageGrid = ({
  sIndex,
  approvedIndex,
  images,
  projectData,
  l1ApproverForm,
  viewOnly,
  disApprovedIndex,
  remarks
}) => {
  return (
    <div className="grid grid-cols-5 grid-rows-2 h-[160px] border-2 gap-1 p-1 rounded-md border-gray-300 cursor-pointer">
      {images.map((item) => (
        <ImageCard
          images={images}
          key={sIndex + Math.random()}
          sIndex={sIndex}

          disApprovedIndex={disApprovedIndex}
          remarks = {remarks}
          remark={(remarks.find(r => r.index == item.index) || {}).remark || null}

          index={+item.index}
          image={item.image}
          approvedIndex={approvedIndex}
          projectData={projectData}
          l1ApproverForm={l1ApproverForm}
          viewOnly={viewOnly}
        />
      ))}
    </div>
  );
};

const ManageSnap = ({
  beforeLoad = () => {},
  externalData = null,
  viewOnly = false,
  projectData = {},
  L1Approver,
  snapData,
  l1ApproverForm = false,
}) => {
  useEffect(() => {
    beforeLoad();
  }, []);

  const snaps = useSelector((state) => {
    const data = state.adminData?.getOneComplianceDyform?.[0]?.result?.snap;
    if (Array.isArray(data)) return data;
    return [];
  });

  return (
    <div className="grid grid-cols-2 content-start md:grid-cols-2 gap-4 py-6 p-4 !overflow-y-scroll">
      {externalData &&
        Object.keys(externalData).map((item) => {
          if (!externalData[item]) return <></>;
          const images = Array.from({ length: externalData[item] }).map(
            (_, index) => ({
              index: index + 1,
              image: snapData[item]
                ? snapData[item]?.images.find(
                    (item) => item.index === `${index + 1}`
                  )?.image
                : null,
            })
          );

          // NEW add
          const remarks = Array.from({ length: externalData[item] }).map((_, index) => ({
            index: index + 1, remark: snapData[item] ? snapData[item]?.remarks.find(item => item.index === `${index + 1}`)?.remark : null
          }))

          console.log(viewOnly, "___viewOnly__");
          return (
            <div key={item} className="col-span-2 space-y-4">
              {/* Header text section */}
              <div className="bg-white rounded-lg shadow-sm p-4 border">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item} {/* or any other text you want to display */}
                </h3>
                <p className="text-sm text-gray-600">
                  Total items: {externalData[item]}
                </p>
              </div>

              {/* Cards section */}
              <div className="grid grid-cols-2 gap-4">
                {viewOnly ? (
                  <></>
                ) : (
                  <FormCard
                    checkL1={false}
                    indexes={externalData[item]}
                    sIndex={item}
                    projectData={projectData}
                    L1Approver={""}
                    l1ApproverForm={false}
                  />
                )}

                {images ? (
                  <ImageGrid
                    sIndex={item}
                    approvedIndex={[]}
                    images={images}
                    projectData={projectData}
                    l1ApproverForm={false}
                    viewOnly={viewOnly}
                    disApprovedIndex={[]}
                    remarks = {remarks}
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })}

      {!externalData && snaps && snaps.length ? (
        snaps.map((item) => {
          const sIndex = item.fieldName;
          const fieldData = snapData?.[sIndex]
            ? { ...snapData[sIndex] }
            : { images: [], approvedIndex: null,remarks:[], disApprovedIndex:null};

          const existingIndices = new Set(
            fieldData.images.map((itm) => +itm.index)
          );

        
          const newImages = Array.from({ length: 10 }, (_, index) => index + 1)
            .filter((idx) => !existingIndices.has(idx))
            .map((idx) => ({ index: `${idx}`, image: "" }));

          fieldData.images = [...fieldData.images, ...newImages].sort(
            (a, b) => +a.index - +b.index
          );

            // New Code
          const existingIndices1 = new Set(
              fieldData?.remarks?.map((itm) => +itm.index)
            );
            const newremarks = Array.from({ length: 10 }, (_, index) => index + 1)
              .filter((idx) => !existingIndices1.has(idx))
              .map((idx) => ({ index: `${idx}`, remark: "" }));
 
            fieldData.remarks = [...fieldData.remarks, ...newremarks].sort(
              (a, b) => +a.index - +b.index
            );

          return (
            <div key={sIndex} className="col-span-2 space-y-4">
              <div className=" shadow-sm">
                <h3 className="text-sm font-semibold text-white mb-4 pl-1">
                  {item.fieldName || sIndex}
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {viewOnly ? (
                  <FormCard
                    indexes={10}
                    sIndex={sIndex}
                    projectData={projectData}
                    L1Approver={L1Approver}
                    l1ApproverForm={l1ApproverForm}
                    sampleImage={`${backendassetUrl + "/" + item?.image}`}
                    shouldUpload={false}
                  />
                ) : (
                  <FormCard
                    indexes={10}
                    sIndex={sIndex}
                    projectData={projectData}
                    L1Approver={L1Approver}
                    l1ApproverForm={l1ApproverForm}
                    sampleImage={backendassetUrl + "/" + item?.image}
                    shouldUpload={true}
                  />
                )}

                {fieldData?.images?.length ? (
                  <ImageGrid
                    sIndex={sIndex}
                    approvedIndex={
                      Array.isArray(fieldData?.approvedIndex)
                        ? fieldData?.approvedIndex?.map((itm) => +itm)
                        : []
                    }
                    images={fieldData?.images}
                    projectData={projectData}
                    l1ApproverForm={l1ApproverForm}
                    viewOnly={viewOnly}
                    remarks={
                      Array.isArray(fieldData?.remarks)
                      ? fieldData?.remarks :[]
                    }
 
                    disApprovedIndex={
                      Array.isArray(fieldData?.disApprovedIndex)
                        ? fieldData?.disApprovedIndex?.map((itm) => +itm)
                        : []
                    }
                  />
                ) : (
                  <></>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};

export default ManageSnap;
