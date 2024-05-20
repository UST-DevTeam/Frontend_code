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
import Dashboard from "../pages/Dashboard";
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
import ExpenseAndAdvance from "../pages/PMIS/MyHome/ExpenseAndAdvance";
import ManageVendorForm from "../pages/PMIS/ManageVendor/ManageVendorForm";
import VendorCards from "../pages/PMIS/VendorCards/VendorCards";
import VendorProject from "../pages/PMIS/VendorCards/VendorProject";
import ManageUserProjectSiteId from "../pages/PMIS/Admin/ManageProjectSiteId/ManageUserProjectSiteId";
import ISONForm from "../pages/iSON/ISONForm";
import UserComponentManagement from "../pages/UserComponentManagement/UserComponentManagement";
import UserAccessManagement from "../pages/Admin/UserAccessManagement/UserAccessManagement";
import ManageCompletionCriteria from "../pages/PMIS/Admin/ManageCompletionCriteria/ManageCompletionCriteria";
import { getAccessType } from "./commonFunnction";
import FinancialCards from "../pages/PMIS/FinancialCards/FinancialCards";
import InvoiceBased from "../pages/PMIS/FinancialCards/InvoiceBased/InvoiceBased";
import POWorkDoneBased from "../pages/PMIS/FinancialCards/POWorkDoneBased/POWorkDoneBased";
import POMgmtCards from "../pages/PMIS/FinancialCards/POMgmtCards";
import InvoiceMgmtt from "../pages/PMIS/FinancialCards/InvoiceMgmtt";
import Invoice from "../pages/PMIS/FinancialCards/InvoiceManagement/Invoice";
import AccrualRevenue from "../pages/PMIS/FinancialCards/AccrualRevenue/AccrualRevenue";
import UnbilledWaterfall from "../pages/PMIS/FinancialCards/UnbilledWaterfall/UnbilledWaterfall";
import WorkDone from "../pages/PMIS/FinancialCards/WorkdoneManagement/WorkDone";
import UnbilledCards from '../pages/PMIS/FinancialCards/UnbilledCards'

let user = JSON.parse(localStorage.getItem("user"));
let permission = JSON.parse(localStorage.getItem("permission")) || {};
const pmpermission = permission?.pmpermission;

let smartComponent = <>Hello</>;

let abcd = [];
if (user) {
  let cpv = getAccessType("Customer Page View");
  let ptpv = getAccessType("Project Type Page View");
  let ppv = getAccessType("Project Page View");
  let spv = getAccessType("Site Page View");

  console.log(cpv, "cpv", ptpv, "ptpv", ppv, "ppv", spv, "spv", "mergedAll");
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


console.log(abcd,"abcdabcdabcd")

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
      link: "/personalInfo",
      subMenu: [],
      component: <PersonalInfo />,
    },
    {
      name: "",
      link: "/hr/empdetailstable",
      subMenu: [],
      component: <EmpDetailsTable />,
    },
    {
      name: "",
      link: "/hr/expenseAdvance",
      subMenu: [],
      component: <ExpenseAndAdvance />,
    },
    {
      name: "",
      link: "/vendorForm",
      subMenu: [],
      component: <ManageVendorForm />,
    },
    {
      name: "",
      link: "/claim&Reimbursement",
      subMenu: [],
      component: <Claim />,
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
      link: "/hr/superAdmin/vendorProjectAllocation",
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
      link: "/manageVendor",
      component: <ManageVendor />,
      icon: <UilStore className="hover:text-heading cursor-pointer"/>,
      subMenu: [],
    },
    {
      name: "",
      link: "/vendorProject",
      component: <VendorProject />,
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
        component: <>Dashboard</>,
        icon: <UilAirplay className="hover:text-heading cursor-pointer"/>,
        subMenu: [],
      },
      {
        name: "My Home",
        link: "/home",
        component: <MyHome />,
        icon: <UilHome className="hover:text-heading cursor-pointer"/>,
        subMenu: [],
      },
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
        name: "Vendor Management",
        link: "/vendorCards",
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
        name: "Form",
        link: "/form",
        // component: <OperationManagement />,
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


