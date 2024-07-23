import * as Unicons from "@iconscout/react-unicons";
import {
  UilAirplay,
  UilStore,
  UilFileShieldAlt,
  UilHome,
  UilUserSquare,
  UilCoins,
  UilDatabase,
  UilFileContract,
} from "@iconscout/react-unicons";
import RunQuery from "../pages/CustomQuery/RunQuery";
import QueryBuilderComponent from "../pages/CustomQuery/QueryBuilder";
import BIDashboard from "../pages/BusinessIntelligence/BIDashboard";
import AdvancedQueryBuilderComponent from "../pages/CustomQuery/AdvancedQueryBuilder";
import TestTable from "../pages/DataPlusAnalytics/TestTable";
import CommonPowerBI from "../pages/CommonPowerBI";

import DataPlusAnalytics from "../pages/DataPlusAnalytics";
import LaverView from "../pages/LaverView";
import DBConfig from "../pages/CustomQuery/DBConfig";
import SavedQueries from "../pages/CustomQuery/SavedQueries";
import AlertConfigure from "../pages/AlertMonitoringSystem/AlertConfigure";
import ViewMtandaoComplaints from "../pages/MtandaoComplaints/ViewMtandaoComplaints";
import AlertScheduler from "../pages/AlertMonitoringSystem/AlertScheduler";
import UserManagement from "../pages/Admin/UserManagement/UserManagement";
import RoleManagement from "../pages/Admin/RoleManagement/RoleManagement";
import Registration from "../pages/Registration";
import Cart from "../pages/Cart";
import Carts from "../pages/Carts";
import Home from "../pages/Home";
import InvestmentDiscovery from "../pages/Investment/InvestmentDiscovery";
import Kycregister from "../pages/Kycregister";
import NokiaToolManagementQuery from "../pages/NokiaToolManagement/NokiaToolManagementQuery";
// import NetworkAnalyticsPro from '../pages/DataPlusAnalytics/NetworkAnalyticsPro';
import SiteAnalyticsPro from "../pages/DataPlusAnalytics/SiteAnalyticsPro";
import ProRulesQuery from "../pages/ProRules/ProRulesQuery";
import Portfolio from "../pages/Portfolio";
import Profile from "../pages/Profile";
import PitchDeck from "../pages/PitchDeck/PitchDeck";
import InvestmentTransaction from "../pages/Investment/InvestmentTransaction";
import InvestorCrm from "../pages/Investment/InvestorCrm";
import Details from "../pages/Details";

import InvestorCRMDetails from "../pages/InvestorCRMDetails";
import ViewPitchDeck from "../pages/PitchDeck/ViewPitchDeck";
import BlobFileViewer from "../pages/testing/BlobFile";
import SendEmail from "../pages/Admin/RoleManagement/SendEmail";
import KYCManagement from "../pages/KYCManagement/KYCManagement";
import PitchDeckAdmin from "../pages/PitchDeck/viewPitchDeckAdmin";
import InvestmentDetailsManagement from "../pages/InvestmentDetails/InvestmentDetails";
import FundSeekerDetails from "../pages/FundSeekerDetails/FundSeekerDetails";
import OperationManagement from "../pages/OperationManagement/OperationManagement";
import AgreementManagement from "../pages/Admin/AgreementManagement/AgreementManagement";

// newimport
import ManageCustomer from "../pages/PMIS/Admin/ManageCustomer/ManageCustomer";
import UserAllocation from "../pages/PMIS/HR/UserAllocation/UserAllocation";
import ManageVendor from "../pages/PMIS/ManageVendor/ManageVendor";
import ManageProjectType from "../pages/PMIS/Admin/ManageProjectType/ManageProjectType";
import ManageCircle from "../pages/PMIS/Admin/ManageCircle/ManageCircle";
import ManageZone from "../pages/PMIS/Admin/ManageZone/ManageZone";
import MyHome from "../pages/PMIS/MyHome/Home";
import EmpDetails from "../pages/PMIS/MyHome/EmpDetails";
import PersonalInfo from "../pages/PMIS/MyHome/PersonalInfo";
import EmpDetailsTable from "../pages/PMIS/MyHome/EmpDetailsTable";
import HRHomeView from "../pages/PMIS/HR";
import ManageSite from "../pages/PMIS/Admin/ManageSite/ManageSite";
// import Home from "../pages/PMIS/MyHome/Home"

import Claim from "../pages/PMIS/MyHome/Claim";
import Asset from "../pages/PMIS/MyHome/Asset";
import AssetRegistration from "../pages/PMIS/Admin/AssetRegistration/AssetRegistration";
import SuperAdmin from "../pages/PMIS/HR/SuperAdmin";
import ManageCostCenter from "../pages/PMIS/Admin/ManageCostCenter/ManageCostCenter";
import ManageProjectGroup from "../pages/PMIS/Admin/ManageProjectGroup/ManageProjectGroup";
// import Project from "../pages/PMIS/Admin/Project/Project";
import ManageSubProject from "../pages/PMIS/Admin/ManageSubProject/ManageSubProject";
import ManageUserProjectAllocation from "../pages/PMIS/Admin/ManageUserProjectAllocation/ManageUserProjectAllocation";
import VendorProjectAllocation from "../pages/PMIS/Admin/VendorProjectAllocation/VendorProjectAllocation";
import ManageProject from "../pages/PMIS/Admin/ManageProject/ManageProject";
import ManageDepartment from "../pages/PMIS/Admin/ManageDepartment/ManageDepartment";
import ManageDesignation from "../pages/PMIS/Admin/ManageDesignation/ManageDesignation";
import ManageProfile from "../pages/PMIS/Admin/ManageProfile(userrole)/ManageProfile";
import ManageProjectSiteId from "../pages/PMIS/Admin/ManageProjectSiteId/ManageProjectSiteId";
import ExpenseAndAdvance from "../pages/PMIS/MyHome/ExpAdvForClaim";
import ManageVendorForm from "../pages/PMIS/ManageVendor/ManageVendorForm";
import VendorCards from "../pages/PMIS/VendorCards/VendorCards";
import VendorProject from "../pages/PMIS/VendorCards/VendorProject";
import ManageUserProjectSiteId from "../pages/PMIS/Admin/ManageProjectSiteId/ManageUserProjectSiteId";
import ISONForm from "../pages/iSON/ISONForm";
import UserComponentManagement from "../pages/UserComponentManagement/UserComponentManagement";
import UserAccessManagement from "../pages/Admin/UserAccessManagement/UserAccessManagement";
import ManageCompletionCriteria from "../pages/PMIS/Admin/ManageCompletionCriteria/ManageCompletionCriteria";
import ManageClaimType from "../pages/PMIS/Admin/ManageClaimType/ManageClaimType";
import { getAccessType } from "./commonFunnction";
import FinancialCards from "../pages/PMIS/FinancialCards/FinancialCards";
import FormsCards from "../pages/PMIS/Formss/FormsCards";
import WorkdoneForecastCards from "../pages/PMIS/Formss/WorkdoneForecastCards";
import InvoiceBased from "../pages/PMIS/FinancialCards/InvoiceBased/InvoiceBased";
import POWorkDoneBased from "../pages/PMIS/FinancialCards/POWorkDoneBased/POWorkDoneBased";
import POMgmtCards from "../pages/PMIS/FinancialCards/POMgmtCards";
import InvoiceMgmtt from "../pages/PMIS/FinancialCards/InvoiceMgmtt";
import Invoice from "../pages/PMIS/FinancialCards/InvoiceManagement/Invoice";
import AccrualRevenue from "../pages/PMIS/FinancialCards/AccrualRevenue/AccrualRevenue";
import UnbilledWaterfall from "../pages/PMIS/FinancialCards/UnbilledWaterfall/UnbilledWaterfall";
import WorkDone from "../pages/PMIS/FinancialCards/WorkdoneManagement/WorkDone";
import UnbilledCards from '../pages/PMIS/FinancialCards/UnbilledCards'
import EarnValueMgmtFinancial from '../pages/PMIS/Formss/EarnValueMgmtFinancial/EarnValueMgmtFinancial'
import ClaimTypeCards from "../pages/PMIS/HR/ClaimTypeCards";
import ManageClaimTypeDesignation from "../pages/PMIS/Admin/ManageClaimTypeDesignation/ManageClaimTypeDesignation";
import ManageClaimTypeUnitRate from "../pages/PMIS/Admin/ManageClaimTypeUnitRate/ManageClaimTypeUnitRate";
import ClaimAndAdvance from "../pages/PMIS/MyHome/ClaimAndAdvance/ClaimAndAdvance";
import ClaimAndAdvanceOnclick from "../pages/PMIS/MyHome/ClaimAndAdvance/ClaimAdvanceOnclick";
import HomeCards from "../pages/PMIS/MyHome/HomeCards";
import FillExpense from "../pages/PMIS/MyHome/ClaimAdvExpenseForm/FillExpense";
import FillAdvance from "../pages/PMIS/MyHome/ClaimAdvAdvanceForm/FillAdvance";
import L1Form from "../pages/PMIS/MyHome/L1Form/L1Form";
import ApproverCards from "../pages/PMIS/MyHome/ApproverCards";
import L2Form from "../pages/PMIS/MyHome/L2Form/L2Form";
import L3Form from "../pages/PMIS/MyHome/L3Form/L3Form";
import L1AdvanceForm from "../pages/PMIS/MyHome/L1Form/L1AdvanceForm";
import L2AdvanceForm from "../pages/PMIS/MyHome/L2Form/L2AdvanceForm";
import L3AdvanceForm from "../pages/PMIS/MyHome/L3Form/L3AdvanceForm";
import DAFormFill from "../pages/PMIS/MyHome/DAFormFill/DAFormFill";
import GapAnalysisCards from "../pages/PMIS/Formss/GapAnalysisCards";
import ActualWorkdone from "../pages/PMIS/Formss/ActualWorkdone/ActualWorkdone";
import PL from "../pages/PMIS/Formss/P&L/PL";
import Dashboard1 from "../pages/PMIS/Dashboard1/Dashboard1";
import Dashboard from "../pages/Dashboard";
import ExpAdvForClaim from "../pages/PMIS/MyHome/ExpAdvForClaim";
import ExpAdvForAdvance from "../pages/PMIS/MyHome/ExpAdvForAdvance";
import AccrualRevenueTrend from "../pages/PMIS/Formss/AccrualRevenueTrend/AccrualRevenueTrend";
import DashboardCard from "../pages/PMIS/Dashboard1/DashboardCard";
import MyTask from "../pages/PMIS/MyTask/MyTask";

let user = JSON.parse(localStorage.getItem("user"));
let permission = JSON.parse(localStorage.getItem("permission")) || {};
const pmpermission = permission?.pmpermission;

let smartComponent = <>Hello</>;

let abcd = [];
if (user) {
  // let cpv = getAccessType("Customer Page View");
  // let ptpv = getAccessType("Project Type Page View");
  // let ppv = getAccessType("Project Page View");
  // let spv = getAccessType("Site Page View");

  let cpv = "visible"
  let ptpv = "visible"
  let ppv = "visible"
  let spv = "visible"

  // console.log(cpv, "cpv", ptpv, "ptpv", ppv, "ppv", spv, "spv", "mergedAll");
  if (cpv != "invisible") {
    smartComponent = <ManageCustomer />;

    abcd = [
      {
        name: "Project Management",
        link: "/manageCustomer",
        // component: ["Field Resource", "QE", "Circle Support", "Project Manager", "Vendor"].indexOf(rolename)==-1?<ManageCustomer />:<ManageUserProjectSiteId />,
        component: <ManageCustomer />,
        subMenu: [],
        icon: <UilFileShieldAlt className="hover:text-heading cursor-pointer" />,
      },
    ];
  } else if (ptpv != "invisible") {
    abcd = [
      {
        name: "Project Management",
        link: "/projectManagement",
        subMenu: [],
        component: <ManageProjectType />,
        icon: <UilFileShieldAlt className="hover:text-heading cursor-pointer"/>,
      },
    ];
    smartComponent = <ManageProjectType />;
  } else if (ppv != "invisible") {
    abcd = [
      {
        name: "Project Management",
        link: "/project",
        subMenu: [],
        component: <ManageProject />,
        icon: <UilFileShieldAlt className="hover:text-heading cursor-pointer"/>,
      },
    ];
    smartComponent = <ManageProject />;
  } else if (spv != "invisible") {
    abcd = [
      {
        name: "Project Management",
        link: "/prjmgmt",
        component: <ManageUserProjectSiteId />,
        subMenu: [],
        icon: <UilFileShieldAlt className="hover:text-heading cursor-pointer"/>,
      },
    ];
    smartComponent = <ManageProjectSiteId />;
  }
}


// console.log(abcd,"abcdabcdabcd")

let rolename = user?.roleName;

console.log(
  rolename,
  [
    "Field Resource",
    "QE",
    "Circle Support",
    "Project Support",
    "Vendor",
  ].indexOf(rolename),
  "rolenamerolenamerolename"
);
export const Sidebar_content = {
  temp: [],
  GlobalUrl: [
    {
      name: "Not Found",
      link: "*",
      subMenu: [
        {
          name: "dasdaas",
          link: "*",
          component: <h4 className="text-xl">Coming Soon</h4>,
          subMenu: [],
        },
      ],
    },
    {
      name: "",
      link: "/isoning",
      subMenu: [],
      component: <UserComponentManagement />,
    },
    {
      name: "",
      link: "/dashboard/:cname/:customeruniqueId",
      subMenu: [],
      component: <Dashboard1 />,
    },
    {
      name: "",
      link: "/projectManagement/:cname/:customeruniqueId",
      subMenu: [],
      component: <ManageProjectType />,
    },
    {
      name: "",
      link: "/ManageSite/:customeruniqueId",
      subMenu: [],
      component: <ManageSite />,
      // component: <ManageProjectType />,
    },
    {
      name: "",
      link: "/projectManagement/:cname/:customeruniqueId/:projecttypeuniqueId",
      subMenu: [],
      component: <ManageProjectType />,
    },
    {
      name: "",
      link: "/subProject/:projecttypeuniqueId",
      subMenu: [],
      component: <ManageSubProject />,
    },
    {
      name: "",
      link: "/projectManagement_1/:cname/:ptname/:customeruniqueId/:projecttypeuniqueId",
      subMenu: [],
      component: <ManageProject />,
    },
    {
      name: "",
      link: "/projectManagement_1/:cname/:ptname/:customeruniqueId",
      subMenu: [],
      component: <ManageProject />,
    },
    {
      name: "",
      link: "/projectManagement_2/:cname/:ptype/:proId/:projectuniqueId",
      subMenu: [],
      component: <ManageProjectSiteId />,
    },
    {
      name: "",
      link: "/hr/superAdmin/userProjectAllocation",
      subMenu: [],
      component: <ManageUserProjectAllocation />,
    },
    {
      name: "",
      link: "/hr/superAdmin/manageProfile",
      subMenu: [],
      component: <ManageProfile />,
    },
    {
      name: "",
      link: "/empdetails/:empuid",
      subMenu: [],
      component: <EmpDetails />,
    },

    {
      name: "",
      link: "/empdetails",
      subMenu: [],
      component: <EmpDetails />,
    },
    {
      name: "",
      link: "/home/personalInfo",
      subMenu: [],
      component: <PersonalInfo />,
    },
    {
      name: "",
      link: "/home/myTask",
      subMenu: [],
      component: <MyTask />,
    },
    {
      name: "",
      link: "/hr/empdetailstable",
      subMenu: [],
      component: <EmpDetailsTable />,
    },
    {
      name: "",
      link: "/hr/Claim",
      subMenu: [],
      component: <ExpAdvForClaim />,
    },
    {
      name: "",
      link: "/hr/Advance",
      subMenu: [],
      component: <ExpAdvForAdvance />,
    },
    {
      name: "",
      link: "/vendorForm/:empuid",
      subMenu: [],  
      component: <ManageVendorForm />,
    },
    {
      name: "",
      link: "/vendorForm",
      subMenu: [],
      component: <ManageVendorForm />,
    },
    {
      name: "",
      link: "/home/approverCards",
      subMenu: [],
      component: <ApproverCards />,
    },
    {
      name: "",
      link: "/home/claimAndAdvance",
      subMenu: [],
      component: <ClaimAndAdvance />,
    },
    {
      name: "",
      link: "/home/claimAndAdvance/claimAndAdvanceOnclick/:id",
      subMenu: [],
      component: <ClaimAndAdvanceOnclick />,
    },
    {
      name: "",
      link: "/home/claimAndAdvance/Expense",
      subMenu: [],
      component: <FillExpense />,
    },
    {
      name: "",
      link: "/home/claimAndAdvance/Advance",
      subMenu: [],
      component: <FillAdvance />,
    },
    {
      name: "",
      link: "/home/claimAndAdvance/DAFormFill",
      subMenu: [],
      component: <DAFormFill />,
    },
    {
      name: "",
      link: "/home/approverCards/L1Approver",
      subMenu: [],
      component: <L1Form />,
    },
    {
      name: "",
      link: "/home/approverCards/L1Advance",
      subMenu: [],
      component: <L1AdvanceForm />,
    },
    {
      name: "",
      link: "/home/approverCards/L2Approver",
      subMenu: [],
      component: <L2Form />,
    },
    {
      name: "",
      link: "/home/approverCards/L2Advance",
      subMenu: [],
      component: <L2AdvanceForm />,
    },
    {
      name: "",
      link: "/home/approverCards/financeApprover",
      subMenu: [],
      component: <L3Form />,
    },
    {
      name: "",
      link: "/home/approverCards/L3Advance",
      subMenu: [],
      component: <L3AdvanceForm />,
    },
    {
      name: "",
      link: "/hr/assetManagement",
      subMenu: [],
      component: <Asset />,
    },
    {
      name: "",
      link: "/hr/superAdmin",
      subMenu: [],
      component: <SuperAdmin />,
    },
    {
      name: "Manage Circle",
      link: "/hr/superAdmin/manageCircle",
      subMenu: [],
      component: <ManageCircle />,
      icon: <Unicons.UilChannel size="16" className="hover:text-heading cursor-pointer"/>,
    },
    {
      name: "Manage Zone",
      link: "/hr/superAdmin/manageZone",
      subMenu: [],
      component: <ManageZone />,
      icon: <Unicons.UilChannel size="16" className="hover:text-heading cursor-pointer"/>,
    },
    {
      name: "Manage Cost Center",
      link: "/hr/superAdmin/manageCostCenter",
      subMenu: [],
      component: <ManageCostCenter />,
      icon: <Unicons.UilChannel size="16" />,
    },
    {
      name: "",
      link: "/hr/superAdmin/projectGroup",
      subMenu: [],
      component: <ManageProjectGroup />,
    },

    {
      name: "",
      link: "/hr/superAdmin/UserAccessManagement",
      subMenu: [],
      component: <UserAccessManagement />,
    },

    {
      name: "",
      link: "/hr/superAdmin/userAccessManagement",
      subMenu: [],
      component: <RoleManagement />,
    },

    {
      name: "",
      link: "/hr/superAdmin/partnerProjectAllocation",
      subMenu: [],
      component: <VendorProjectAllocation />,
    },
    {
      name: "",
      link: "/hr/superAdmin/manageDepartment",
      subMenu: [],
      component: <ManageDepartment />,
    },
    {
      name: "",
      link: "/hr/superAdmin/manageDesignation",
      subMenu: [],
      component: <ManageDesignation />,
    },
    {
      name: "Asset Registration",
      link: "/assetRegistration",
      subMenu: [],
      component: <AssetRegistration />,
      icon: <Unicons.UilChannel size="16" className="hover:text-heading cursor-pointer"/>,
    },

    {
      name: "",
      link: "/vendor/managePartner",
      component: <ManageVendor />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/vendor/projectTracking",
      component: <VendorProject />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/vendor/commercial",
      component: <p className="text-white text-center"> Commercial data is comming soon</p>,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/completionCriteria",
      component: <ManageCompletionCriteria />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/claimType",
      component: <ClaimTypeCards />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/claimType/claimTypeCategories",
      component: <ManageClaimType />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/claimType/claimTypeDesignation",
      component: <ManageClaimTypeDesignation />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/hr/superAdmin/claimType/claimTypeUnitRate",
      component: <ManageClaimTypeUnitRate />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/financial/poManagement",
      component: <POMgmtCards />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/financial/poManagement/poStatusInvoice",
      component: <InvoiceBased />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    // {
    //   name: "",
    //   link: "/financial/invoiceMgmt/invoice",
    //   component: <Invoice />,
    //   icon: <UilStore />,
    //   subMenu: [],
    // },
    {
      name: "",
      link: "/financial/invoiceMgmt/revenueInvoiced",
      component: <Invoice />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/financial/poManagement/poTrackingWorkdone",
      component: <POWorkDoneBased />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/financial/invoiceMgmt",
      component: <InvoiceMgmtt />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/financial/poWorkDone",
      component: <WorkDone />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/financial/invoiceMgmt/accrualRevenue",
      component: <AccrualRevenue />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/financial/Unbilled",
      component: <UnbilledCards />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/financial/Unbilled/unbilledWaterfall",
      component: <UnbilledWaterfall />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/EVMDelivery",
      component: <WorkdoneForecastCards />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/gapAnalysis",
      component: <GapAnalysisCards />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/gapAnalysis/ETPPendingReason",
      // component: <E />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/gapAnalysis/MS2VSWCCPendingReason",
      // component: <E />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/earnValueManagementFinancial",
      component: <EarnValueMgmtFinancial />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/EVMDelivery/ActualWorkDone",
      component: <ActualWorkdone />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/P&L",
      component: <PL />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/forms/AccrualRevenueTrend",
      component: <AccrualRevenueTrend />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    
  ],

  SuperAdmin: [
    {
      name: "Super Admin",
      link: "/admin",
      subMenu: [
        {
          name: "User Management",
          link: "/admin/user-management",
          subMenu: [],
          component: <UserManagement />,
          icon: <Unicons.UilChannel size="16" className="hover:text-heading cursor-pointer"/>,
        },
        {
          name: "Role Management",
          link: "/admin/role-management",
          subMenu: [],
          component: <RoleManagement />,
          icon: <Unicons.UilChannel size="16" className="hover:text-heading cursor-pointer"/>,
        },
      ],
      icon: <Unicons.UilReact className="hover:text-heading cursor-pointer"/>,
    },
  ],
  all_routes: [
    ...[
      {
        name: "My Dashboard",
        link: "/",
        component: <DashboardCard />,
        icon: <UilAirplay className="hover:text-heading cursor-pointer"/>,
        subMenu: [],
      },
      {
        name: "My Home",
        link: "/home",
        component: <HomeCards />,
        icon: <UilHome className="hover:text-heading cursor-pointer"/>,
        subMenu: [],
      }
    ],
    ...abcd,
    ...[
      {
        name: "Human Resource",
        link: "/hr",
        subMenu: [
          // {
          //   name: "Manage Employee",
          //   link: "/manageEmployee",
          //   subMenu: [],
          //   component: <ManageEmp />,
          //   icon: <UilAirplay size="16" />,
          // },
          // {
          //   name: "User Allocation",
          //   link: "/userallocation",
          //   subMenu: [],
          //   component: <UserAllocation />,
          //   icon: <Unicons.UilChannel size="16" />,
          // },
        ],
        component: <HRHomeView />,
        icon: <UilUserSquare className="hover:text-heading cursor-pointer"/>,
      },
      {
        name: "Partner Management",
        link: "/vendor",
        component: <VendorCards />,
        icon: <UilStore className="hover:text-heading cursor-pointer"/>,
        subMenu: [],
      },
      {
        name: "Financial",
        link: "/financial",
        component: <FinancialCards />,
        icon: <UilCoins className="hover:text-heading cursor-pointer"/>,
        subMenu: [],
      },
      {
        name: "Repository",
        link: "/operation-team",
        // component: <OperationManagement />,
        icon: <UilDatabase className="hover:text-heading cursor-pointer"/>,
        subMenu: [],
      },
      {
        name: "Forms",
        link: "/forms",
        component: <FormsCards />,
        icon: <UilFileContract className="hover:text-heading cursor-pointer"/>,
        subMenu: [],
      },
      // {
      //   name: "Super Admin",
      //   link: "/admin",
      //   subMenu: [
      //     {
      //       name: "Manage Circle",
      //       link: "/manageCircle",
      //       subMenu: [],
      //       component: <ManageCircle />,
      //       icon: <Unicons.UilChannel size="16" />,
      //     },
      //     {
      //       name: "Asset Registration",
      //       link: "/assetRegistration",
      //       subMenu: [],
      //       component: <AssetRegistration />,
      //       icon: <Unicons.UilChannel size="16" />,
      //     },
      //     {
      //       name: "Manage Zone",
      //       link: "/manageZone",
      //       subMenu: [],
      //       component: <ManageZone />,
      //       icon: <Unicons.UilChannel size="16" />,
      //     },
      //     // {
      //     //   name: "User Management",
      //     //   link: "/admin/user-management",
      //     //   subMenu: [],
      //     //   component: <UserManagement />,
      //     //   icon: <Unicons.UilChannel size="16" />,
      //     // },
      //     // {
      //     //   name: "Role Management",
      //     //   link: "/admin/role-management",
      //     //   subMenu: [],
      //     //   component: <RoleManagement />,
      //     //   icon: <Unicons.UilChannel size="16" />,
      //     // },
      //   ],
      //   icon: <Unicons.UilReact />,
      // },
    ],
  ],
};


