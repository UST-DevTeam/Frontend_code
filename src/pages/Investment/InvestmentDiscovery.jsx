// import React, { useEffect, useState } from "react";
// import InvestorDetailsCard from "../../components/InvestorDetailsCard";
// import Investment_Discovery_Filters from "../../components/Investment_Discovery_Filters";
// import FilterView from "../../components/FilterView";
// import { useForm } from "react-hook-form";

// const data = [
//   {
//     name: "Alliance of Angels",
//     type:"Foundations",
//     description:
//       "The Alliance of Angels is the largest and most active angel group in the Pacific Northwest. We are comprised of 160+ accredited investor members committed to financing and supporting high-growth startups in technology, hardware, consumer and the life sciences.",
//     investments: [
//       {
//         name: "Carlsmed",
//         amount: "$12,630,000",
//         stage: "Later stage VC",
//       },
//       {
//         name: "Food.ee",
//         amount: "$11,000,000",
//         stage: "Early stage VC",
//       },
//       {
//         name: "Blokable, Inc.",
//         amount: "$4,886,194",
//         stage: "Later stage VC",
//       },
//     ],
//   },
//   {
//     name: "Fourbrick Tech",
//     type:"Technology",
//     description:
//       "The Alliance of Angels is the largest and most active angel group in the Pacific Northwest. We are comprised of 160+ accredited investor members committed to financing and supporting high-growth startups in technology, hardware, consumer and the life sciences.",
//     investments: [
//       {
//         name: "Carlsmed",
//         amount: "$12,630,000",
//         stage: "Later stage VC",
//       },
//       {
//         name: "Food.ee",
//         amount: "$11,000,000",
//         stage: "Early stage VC",
//       },
//       {
//         name: "Blokable, Inc.",
//         amount: "$4,886,194",
//         stage: "Later stage VC",
//       },
//     ],
//   },
//   {
//     name: "Government of India",
//     type:"Goverment",
//     description:
//       "The Alliance of Angels is the largest and most active angel group in the Pacific Northwest. We are comprised of 160+ accredited investor members committed to financing and supporting high-growth startups in technology, hardware, consumer and the life sciences.",
//     investments: [
//       {
//         name: "Carlsmed",
//         amount: "$12,630,000",
//         stage: "Later stage VC",
//       },
//       {
//         name: "Food.ee",
//         amount: "$11,000,000",
//         stage: "Early stage VC",
//       },
//       {
//         name: "Blokable, Inc.",
//         amount: "$4,886,194",
//         stage: "Later stage VC",
//       },
//     ],
//   },
//   {
//     name: "IIIT Sonepat",
//     type:"Education",
//     description:
//       "The Alliance of Angels is the largest and most active angel group in the Pacific Northwest. We are comprised of 160+ accredited investor members committed to financing and supporting high-growth startups in technology, hardware, consumer and the life sciences.",
//     investments: [
//       {
//         name: "Carlsmed",
//         amount: "$12,630,000",
//         stage: "Later stage VC",
//       },
//       {
//         name: "Food.ee",
//         amount: "$11,000,000",
//         stage: "Early stage VC",
//       },
//       {
//         name: "Blokable, Inc.",
//         amount: "$4,886,194",
//         stage: "Later stage VC",
//       },
//     ],
//   },
// ];
// const InvestmentDiscovery = () => {
//   const [layoutGrid, setLayoutGrid] = useState(true);
//   const layoutClasses = layoutGrid
//     ? "xl:grid-cols-3 sm:grid-cols-2 grid-cols-1"
//     : "grid-cols-1";

//   const setLayout = () => {
//     if (window.innerWidth < 600) {
//       setLayoutGrid(true);
//     }
//   };
//   useEffect(() => {
//     window.addEventListener("resize", setLayout);

//     return () => {
//       window.removeEventListener("resize", setLayout);
//     };
//   }, []);

//   let filterview = [
//     {
//       label: "Type",
//       type: "text",
//       name: "subscriberNo",
//       props: {},
//     },
//     {
//       label: "Industry",
//       type: "text",
//       name: "incidentNo",
//       props: {},
//     },
//     {
//       label: "Location",
//       type: "datetime",
//       name: "dateTime",
//       props: {},
//     },
//     {
//       label: "Stage Focus",
//       type: "select",
//       name: "status",
//       option: [
//         {
//           label: "Open",
//           value: "Open",
//         },
//         {
//           label: "Closed",
//           value: "Closed",
//         },
//       ],
//       props: {},
//     },
//   ];

//   const {
//     register,
//     handleSubmit,
//     watch,
//     setValue,
//     setValues,
//     getValues,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = () => {
//     if (window.innerWidth < 600) {
//       setLayoutGrid(true);
//     }
//   };

//   return (
//     <div className="p-4 bg-cover">
//       {/* <Investment_Discovery_Filters /> */}
//       <div className="w-full justify-end pb-2 hidden sm:flex">
//         {/* <FilterView
//           tablefilter={filterview}
//           onSubmit={onSubmit}
//           handleSubmit={handleSubmit}
//           // table={table}
//           data={data}
//           errors={errors}
//           register={register}
//           setValue={register}
//           getValues={getValues}
//         /> */}

//         <button
//           className={`${
//             layoutGrid ? "bg-[var(--mainsec)] text-white" : ""
//           } font-light border border-solid border-txt-neavy py-1 px-2`}
//           onClick={() => setLayoutGrid(true)}
//         >
//           Grid
//         </button>
//         <button
//           className={`${
//             layoutGrid ? "" : "bg-[var(--mainsec)] text-white"
//           } font-light border border-solid border-txt-neavy py-1 px-2`}
//           onClick={() => setLayoutGrid(false)}
//         >
//           List
//         </button>
//       </div>
//       <div className={`grid ${layoutClasses} gap-4 overflow-auto`}>
//         {data.map((cur, index) => {
//           return (
//             <InvestorDetailsCard
//               key={index}
//               data={cur}
//               layoutGrid={layoutGrid}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default InvestmentDiscovery;

import React, { useEffect, useState } from "react";
import InvestorDetailsCard from "../../components/InvestorDetailsCard";
import { useDispatch, useSelector } from "react-redux";
import InvestmentDiscoveryActions from "../../store/actions/InvestmentDiscoveryActions";
const InvestmentDiscovery = () => {
  let dispatch = useDispatch();
  const datae = useSelector((state) => {
    let interstatedata = state?.investmentDiscovery?.company_list || [];
    console.log(interstatedata, 'judhbdelet');
    return interstatedata
    ;
  });
  const data = [
    {
      name: "Alliance of Angels",
      type: "Foundations",
      description:"The Alliance of Angels is the largest and most active angel group in the Pacific Northwest. We are comprised of 160+ accredited investor members committed to financing and supporting high-growth startups in technology, hardware, consumer and the life sciences.",
      investments: [
        {
          name: "Carlsmed",
          amount: "$12,630,000",
          stage: "Later stage VC",
        },
        {
          name: "Food.ee",
          amount: "$11,000,000",
          stage: "Early stage VC",
        },
        {
          name: "Blokable, Inc.",
          amount: "$4,886,194",
          stage: "Later stage VC",
        },
      ],
    },
    {
      name: "Fourbrick Tech",
      type: "Technology",
      description:
        "The Alliance of Angels is the largest and most active angel group in the Pacific Northwest. We are comprised of 160+ accredited investor members committed to financing and supporting high-growth startups in technology, hardware, consumer and the life sciences.",
      investments: [
        {
          name: "Carlsmed",
          amount: "$12,630,000",
          stage: "Later stage VC",
        },
        {
          name: "Food.ee",
          amount: "$11,000,000",
          stage: "Early stage VC",
        },
        {
          name: "Blokable, Inc.",
          amount: "$4,886,194",
          stage: "Later stage VC",
        },
      ],
    },
    {
      name: "Government of India",
      type: "Goverment",
      description:
        "The Alliance of Angels is the largest and most active angel group in the Pacific Northwest. We are comprised of 160+ accredited investor members committed to financing and supporting high-growth startups in technology, hardware, consumer and the life sciences.",
      investments: [
        {
          name: "Carlsmed",
          amount: "$12,630,000",
          stage: "Later stage VC",
        },
        {
          name: "Food.ee",
          amount: "$11,000,000",
          stage: "Early stage VC",
        },
        {
          name: "Blokable, Inc.",
          amount: "$4,886,194",
          stage: "Later stage VC",
        },
      ],
    },
    {
      name: "IIIT Sonepat",
      type: "Education",
      description:
        "The Alliance of Angels is the largest and most active angel group in the Pacific Northwest. We are comprised of 160+ accredited investor members committed to financing and supporting high-growth startups in technology, hardware, consumer and the life sciences.",
      investments: [
        {
          name: "Carlsmed",
          amount: "$12,630,000",
          stage: "Later stage VC",
        },
        {
          name: "Food.ee",
          amount: "$11,000,000",
          stage: "Early stage VC",
        },
        {
          name: "Blokable, Inc.",
          amount: "$4,886,194",
          stage: "Later stage VC",
        },
      ],
    },
    {
      name: "XYZ",
      type: "ABC",
      description:
        "The Alliance of Angels is the largest and most active angel group in the Pacific Northwest. We are comprised of 160+ accredited investor members committed to financing and supporting high-growth startups in technology, hardware, consumer and the life sciences.",
      investments: [
        {
          name: "Carlsmed",
          amount: "$12,630,000",
          stage: "Later stage VC",
        },
        {
          name: "Food.ee",
          amount: "$11,000,000",
          stage: "Early stage VC",
        },
        {
          name: "Blokable, Inc.",
          amount: "$4,886,194",
          stage: "Later stage VC",
        },
      ],
    },
  ];
  const [layoutGrid, setLayoutGrid] = useState(true);
  const layoutClasses = layoutGrid
    ? "xl:grid-cols-3 sm:grid-cols-2 grid-cols-1"
    : "grid-cols-1";

  const setLayout = () => {
    if (window.innerWidth < 600) {
      setLayoutGrid(true);
    }
  };
  useEffect(() => {
    dispatch(InvestmentDiscoveryActions.getinvestmentDiscoverylist())
    dispatch(InvestmentDiscoveryActions.getinvestorCrmlist())
    window.addEventListener("resize", setLayout);
    return () => {
      window.removeEventListener("resize", setLayout);
    };
  }, []);

  //Adding fileteration funtinality
  const [typeFilter, setTypeFilter] = useState('');
  const [companyNameFilter, setCompanyNameFilter] = useState('');
  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  };
  const handleCompanyNameFilterChange = (e) => {
    setCompanyNameFilter(e.target.value);
  };
  const filteredData = data?.filter(item => {
    const matchesType = item.type.toLowerCase().includes(typeFilter.toLowerCase());
    const matchesCompanyName = item.name.toLowerCase().includes(companyNameFilter.toLowerCase());
    return matchesType && matchesCompanyName;
  });
  return (
    <div className="p-4 bg-cover">
      {/* <Investment_Discovery_Filters /> */}
      <div className="w-full justify-end pb-2 hidden sm:flex">
        <div className="w-full justify-end pb-2 hidden sm:flex px-2">
          <input
            type="text"
            placeholder="Filter by Company Name"
            value={companyNameFilter}
            onChange={handleCompanyNameFilterChange}
            className="bg-gray-100 px-2 py-1 border border-gray-300 rounded-md mr-2 font-poppins"
          />
          <input
            type="text"
            placeholder="Filter by Type"
            value={typeFilter}
            onChange={handleTypeFilterChange}
            className="bg-gray-100 px-2 py-1 border border-gray-300 rounded-md font-poppins"
          />
        </div>
        <button
          className={`${layoutGrid ? "bg-secLine text-white" : ""
            } font-light border border-gray-300 px-2 rounded-md text-md font-poppins`}
          onClick={() => setLayoutGrid(true)}
        >
          Grid
        </button>
        <button
          className={`${layoutGrid ? "" : "bg-secLine text-white"
            } font-light border border-gray-300 px-2 rounded-md text-md font-poppins`}
          onClick={() => setLayoutGrid(false)}
        >
          List
        </button>
      </div>
      <div className={`grid ${layoutClasses} gap-4 overflow-auto`}>
        {datae.map((cur, index) => {
          return (
            <InvestorDetailsCard
              key={index}
              data={cur}
              layoutGrid={layoutGrid}
            />
          );
        })}
      </div>
    </div>
  );
};

export default InvestmentDiscovery;
