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

const FormCard = ({ sIndex, projectData, L1Approver, l1ApproverForm }) => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState(false);
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm({
    index: null,
    image: null,
  });

  const handleFormState = () => {
    setFormState((prev) => !prev);
  };

  const handleImageSubmition = (data) => {
    const formData = new FormData();
    const content = { ...data, fieldName: sIndex, ...projectData };
    console.log("content", content);
    Object.keys(content).forEach((itm) => {
      formData.append(itm, content[itm]);
    });
    formData.delete("img");
    if (!l1ApproverForm){
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
      dispatch(AdminActions.patchComplinaceSnapImageSubmition(formData, handleFormState));
    }
    else {
      dispatch(AdminActions.patchComplinaceApproverSnapImageSubmition(formData,projectData?.uniqueId,handleFormState));
    }
    
  };

  const imageSubmitionForm = [
    {
      label: "Index",
      value: "",
      name: "index",
      required: true,
      type: "select",
      option: Array.from({ length: 10 }).map((_, index) => ({
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
        className="p-4 h-[160px] border-2 overflow-hidden relative rounded-md border-gray-500 group cursor-pointer grid place-items-center"
      >
        <h2 className="text-2xl font-bold absolute top-4 left-4 text-gray-100">
          {sIndex}
        </h2>
        <div className="w-12 h-12 absolute -top-4 -left-4 formCard-shadow" />
        <div className="w-12 h-12 absolute -bottom-4 -right-4 formCard-shadow-2" />
        <svg
          className="w-[80px] group-hover:scale-[105%] h-[80px] fill-slate-300 transition-transform duration-300"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M21 15V18H24V20H21V23H19V20H16V18H19V15H21ZM21.0082 3C21.556 3 22 3.44495 22 3.9934V13H20V5H4V18.999L14 9L17 12V14.829L14 11.8284L6.827 19H14V21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082ZM8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7Z"></path>
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
}) => {
  const dispatch = useDispatch();
  const handleFullView = (_) => {
    setFullView({ index: null, image: null });
  };

  const handleImageNavigation = (direction) => {
    if (direction === "LEFT" && fullView.index !== 1) {
      setFullView({
        index: fullView.index - 1,
        image: images[fullView.index - 1 - 1].image,
      });
    } else if (direction === "RIGHT" && fullView.index !== 10) {
      setFullView({
        index: fullView.index + 1,
        image: images[fullView.index + 1 - 1].image,
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
    // dispatch()
  };

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,.8)] text-white z-[99999]">
      <div className="absolute top-6 left-6 flex items-center gap-4">
        <svg
          onClick={handleFullView}
          className="fill-white cursor-pointer hover:fill-gray-100 hover:scale-[110%] duration-300 transition-all  h-7 w-7 grid place-items-center right-4 top-[50%] rounded-full hover:bg-[rgba(0,0,0,.5)] group"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path>
        </svg>
        <h2>{sIndex}</h2>
        <div className="w-3 h-[2px] bg-white"></div>
        <p>{fullView.index}</p>
      </div>
      <img
        src={backendassetUrl + fullView.image}
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
      <div className="absolute bottom-0 left-0 right-0 bg-[rgba(0,0,0,.2)] h-20 flex justify-center items-center">
        <button
          onClick={handleImageApproval}
          className="flex justify-center items-center space-x-2"
        >
          <svg
            className="w-6 h-6 cursor-pointer fill-green-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z"></path>
          </svg>
          <p className="cursor-pointer">Approve</p>
        </button>
      </div>
    </div>
  );
};

const ImageCard = ({ index, images, sIndex, image, approvedIndex }) => {
  const [fullView, setFullView] = useState({
    index: null,
    image: null,
  });
  const handleFullView = (event) => {
    setFullView({ index, image });
  };

  return (
    <>
      <div
        onClick={handleFullView}
        className="group relative overflow-hidden rounded-tl-md rounded-br-md"
      >
        <img
          src={backendassetUrl + image}
          className="w-full h-full object-cover group-hover:scale-[110%] rounded-sm transition-all duration-500"
        />
        <div className="absolute text-white scale-125 place-items-center transition-all font-semibold duration-300 group-hover:grid hidden inset-0 bg-[rgba(0,0,0,.4)]">
          {index}
        </div>
      </div>
      {fullView.image ? (
        ReactDOM.createPortal(
          <FullViewImage
            images={images}
            sIndex={sIndex}
            setFullView={setFullView}
            fullView={fullView}
            approvedIndex={approvedIndex}
          />,
          document.getElementById("fullview")
        )
      ) : (
        <></>
      )}
    </>
  );
};

const ImageGrid = ({ sIndex, approvedIndex, images }) => {
  return (
    <div className="grid grid-cols-5 grid-rows-2 h-[160px] border-2 gap-1 p-1 rounded-md border-gray-300 cursor-pointer">
      {images.map((item) => (
        <ImageCard
          images={images}
          key={sIndex + Math.random()}
          sIndex={sIndex}
          index={+item.index}
          image={item.image}
          approvedIndex={approvedIndex}
        />
      ))}
    </div>
  );
};

const ManageSnap = ({ projectData, L1Approver, snapData, l1ApproverForm=false }) => {
  const snaps = useSelector((state) => {
    const data = state.adminData?.getOneComplianceDyform?.[0]?.result?.snap;
    if (Array.isArray(data)) return data;
    return [];
  });

  return (
    <div className="grid grid-cols-2 content-start md:grid-cols-4 gap-4 py-6 p-4 !overflow-y-scroll">
      {snaps && snaps.length ? (
        snaps.map((item) => {
          const sIndex = item.fieldName;
          // const fieldData = JSON.parse(JSON.stringify(snapData[sIndex])) || 
          const fieldData = 
          {
            images: [],
            approvedIndex: null,
          };
          fieldData.images = fieldData.images?.sort((a,b) => +a.index - +b.index)
          
          return (
            <>  
              <FormCard
                key={sIndex}
                sIndex={sIndex}
                projectData={projectData}
                L1Approver={L1Approver}
                l1ApproverForm = {l1ApproverForm}
              />
              {fieldData?.images?.length ? (
                <ImageGrid
                  sIndex={sIndex}
                  approvedIndex={fieldData?.approvedIndex}
                  images={fieldData?.images}
                />
              ) : (
                <></>
              )}
            </>
          );
        })
      ) : (
        <p className="text-gray-100">No data to display</p>
      )}
    </div>
  );
};

export default ManageSnap;
