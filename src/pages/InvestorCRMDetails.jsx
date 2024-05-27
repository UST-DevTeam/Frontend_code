import React, { useEffect, useState } from "react";
import InvestorCRMDetailsHeader from "../components/InvestorCRMDetailsHeader";
import InvestorCRMTabs from "../components/InvestorCRMTabs";
import { useParams } from "react-router-dom";

const tempData = {
  name: "Wavemaker Partnerst",
  location: "United States, Asia, Singapore Singapore, Santa Monica California",
  type: "Venture Capital",
  industry_focus: [
    "Crypto / Web3 / Blockchain",
    "Sales and Marketing",
    "Analytics",
    "Internet of Things (IOT)",
    "SaaS",
    "Business Intelligence",
    "Financial Technology (FinTech)",
    "AgTech",
    "Energy & Clean Tech",
    "Enterprise Software",
    "Mobile",
    "Marketing Tech & Automation",
  ],
  links: ["google.com", "linkedin.com"],
  stage_focus: ["Seed Round", "Early stage VC", "Later stage VC"],
  geography_focus: "Southeast Asia, United States",
  fund_size: "111,000,000",
  description:
    "Wavemaker Partners is an early-stage venture capital firm that was founded in 2003 with offices in Los Angeles and Singapore. The firm invests primarily in Enterprise and Deep Tech startups.",
  reviews: [],
  commitments: [{ commitment_probability: 10, amount_commited: 10 }],
  previous_investments: [
    "Smartkarma - $13,500,000 - Later stage VC",
    "Globe - $3,000,000 - Seed Round",
    "Wootag - $2,700,000 - Seed Round",
    "News Deeply - $2,500,000 - Seed Round",
    "ZUZU Hospitality Solutions - $2,000,000 - Seed Round",
    "Balloonr - $2,000,000 - Seed Round",
    "GIZTIX - $1,650,000 - Early stage VC",
    "Credibook - $1,500,000 - Seed Round",
    "Parcel Perform Pte. Ltd. - $1,100,000 - Seed Round",
    "Bambu - $1,000,000 - Later stage VC",
    "Lemnis Technologies - Seed Round",
    "uHoo",
    "Gem 0",
  ],
  custom_fields: [],
};

const InvestorCRMDetails = () => {
  const [data, setData] = useState(tempData);


  const {uid} = useParams()

  
  useEffect(() => {
    const savedContactList = localStorage.getItem("contactList");
  }, []);


  return (
    <div className="bg-gray-200 py-2 px-10 min-h-full">
      <InvestorCRMDetailsHeader data={data} setData={setData} />
      <InvestorCRMTabs data={data} setData={setData} /> 
    </div>
  );
};

export default InvestorCRMDetails;
