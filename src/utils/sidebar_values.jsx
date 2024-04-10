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
import POLifeCycle from "../pages/PMIS/POLifeCycle/POLifeCylce";
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



let user=JSON.parse(localStorage.getItem("user"))
let rolename=user?.roleName

console.log(rolename,["Field Resource", "QE", "Circle Support", "Project Manager", "Vendor"].indexOf(rolename),"rolenamerolenamerolename")
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
    },{
      name: "",
      link: "/isoning",
      subMenu: [],
      component: <UserComponentManagement/>,
      
    },{
      name: "",
      link: "/projectType/:customeruniqueId",
      subMenu: [],
      component: <ManageProjectType/>,
    },{
      name: "",
      link: "/ManageSite/:customeruniqueId",
      subMenu: [],
      component: <ManageSite/>,
      // component: <ManageProjectType />,
    },
    {
      name: "",
      link: "/projectType/:customeruniqueId/:projecttypeuniqueId",
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
      link: "/project/:customeruniqueId/:projecttypeuniqueId",
      subMenu: [],
      component: <ManageProject />,
    },
    {
      name: "",
      link: "/project/:customeruniqueId",
      subMenu: [],
      component: <ManageProject />,
    },
    {
      name: "",
      link: "/projectSiteId/:projectuniqueId",
      subMenu: [],
      component: <ManageProjectSiteId />,
    },
    {
      name: "",
      link: "/userProjectAllocation",
      subMenu: [],
      component: <ManageUserProjectAllocation />,
    },
    {
      name: "",
      link: "/manageProfile",
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
      link: "/empdetailstable",
      subMenu: [],
      component: <EmpDetailsTable />,
    },
    {
      name: "",
      link: "/expenseAdvance",
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
      link: "/Assets",
      subMenu: [],
      component: <Asset />,
    },
    {
      name: "",
      link: "/superAdmin",
      subMenu: [],
      component: <SuperAdmin />,
    },
    {
      name: "Manage Circle",
      link: "/manageCircle",
      subMenu: [],
      component: <ManageCircle />,
      icon: <Unicons.UilChannel size="16" />,
    },
    {
      name: "Manage Zone",
      link: "/manageZone",
      subMenu: [],
      component: <ManageZone />,
      icon: <Unicons.UilChannel size="16" />,
    },
    {
      name: "Manage Cost Center",
      link: "/manageCostCenter",
      subMenu: [],
      component: <ManageCostCenter />,
      icon: <Unicons.UilChannel size="16" />,
    },
    {
      name: "",
      link: "/projectGroup",
      subMenu: [],
      component: <ManageProjectGroup />,
    },
    
    
    {
      name: "",
      link: "/uammg",
      subMenu: [],
      component: <UserAccessManagement />,
    },

    {
      name: "",
      link: "/userAccessManagement",
      subMenu: [],
      component: <RoleManagement />,
    },

    {
      name: "",
      link: "/vendorProjectAllocation",
      subMenu: [],
      component: <VendorProjectAllocation/>,
    },
    {
      name: "",
      link: "/manageDepartment",
      subMenu: [],
      component: <ManageDepartment />,
    },
    {
      name: "",
      link: "/manageDesignation",
      subMenu: [],
      component: <ManageDesignation />,
    },
    {
      name: "Asset Registration",
      link: "/assetRegistration",
      subMenu: [],
      component: <AssetRegistration />,
      icon: <Unicons.UilChannel size="16" />,
    },

  {
      name: "",
      link: "/manageVendor",
      component: <ManageVendor />,
      icon: <UilStore />,
      subMenu: [],
    },
    {
      name: "",
      link: "/vendorProject",
      component: <VendorProject />,
      icon: <UilStore />,
      subMenu: [],
    },
  ],

  // all_routes: [

  //   {
  //     name: "Investment Dashboard",
  //     link: "/investment/dashboard",
  //     component: <Cart />,
  //     icon: <Unicons.UilReact />,
  //     subMenu: [],
  //   },
  //   {
  //     name: "Investment Discovery",
  //     link: "/investment/discovery",
  //     component: <InvestmentDiscovery />,
  //     icon: <Unicons.UilReact />,
  //     subMenu: [],
  //   },
  //   {
  //     name: "Investor crm",
  //     link: "/investor/crm",
  //     component: <InvestorCrm />,
  //     icon: <Unicons.UilReact />,
  //     subMenu: [],
  //   },
  //   {
  //     name: "Investment Transactions",
  //     link: "/communication",
  //     component: <InvestmentTransaction />,
  //     icon: <Unicons.UilReact />,
  //     subMenu: [],
  //   },
  //   {
  //     name: "Fundseeker Details",
  //     link: "/fundseeker_details",
  //     component: <FundSeekerDetails/>,
  //     icon: <Unicons.UilReact />,
  //     subMenu: [],
  //   },
  //   // {
  //   //     name: "Details",
  //   //     link: "/details",
  //   //     component: <Details/>,
  //   //     icon: <Unicons.UilReact />,
  //   //     subMenu: [],
  //   // },
  //   {
  //     name: "Details",
  //     link: "/investor/crm/details",
  //     component: <InvestorCRMDetails />,
  //     icon: <Unicons.UilReact />,
  //     subMenu: [],
  //   },
  //   {
  //     name: "Details",
  //     link: "/investor/crm/details/:uid",
  //     component: <InvestorCRMDetails />,
  //     icon: <Unicons.UilReact />,
  //     subMenu: [],
  //   },

  //   {
  //     name: "Company Details",
  //     link: "/details",
  //     component: <Details />,
  //     icon: <Unicons.UilReact />,
  //     subMenu: [],
  //   },
  //   // {
  //   //   name: "Portfolio",
  //   //   link: "/portfolio",
  //   //   component: <Portfolio />,
  //   //   icon: <Unicons.UilReact />,
  //   //   subMenu: [],
  //   // },

  //   {
  //     name: "KYC Status",
  //     link: "/kyc-status",
  //     component: <KYCManagement />,
  //     icon: <Unicons.UilReact />,
  //     subMenu: [],
  //   },
  //   {
  //     name: "Investment Details",
  //     link: "/investment-Details",
  //     component: <InvestmentDetailsManagement />,
  //     icon: <Unicons.UilReact />,
  //     subMenu: [],
  //   },
  //   {
  //     name: "Send Email",
  //     link: "/send_email",
  //     component: <SendEmail />,
  //     icon: <Unicons.UilReact />,
  //     subMenu: [],
  //   },
  //   {
  //     name: "Pitch Deck",
  //     link: "/pitch/deck",
  //     component: <PitchDeck />,
  //     icon: <Unicons.UilReact />,
  //     subMenu: [],
  //   },
  //   {
  //     name: "Pitch Deck",
  //     link: "/BlobFileViewer",
  //     component: <BlobFileViewer />,
  //     icon: <Unicons.UilReact />,
  //     subMenu: [],
  //   },
  //   {
  //     name: "Profile",
  //     link: "/profile",
  //     component: <Profile />,
  //     icon: <Unicons.UilReact />,
  //     subMenu: [],
  //   }, {
  //     name: "Agreement",
  //     link: "/agreemenView",
  //     component: <AgreementManagement/>,
  //     icon: <Unicons.UilReact />,
  //     subMenu: [],
  //   },

  // ],

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
          icon: <Unicons.UilChannel size="16" />,
        },
        {
          name: "Role Management",
          link: "/admin/role-management",
          subMenu: [],
          component: <RoleManagement />,
          icon: <Unicons.UilChannel size="16" />,
        },
      ],
      icon: <Unicons.UilReact />,
    },
  ],
  all_routes: [
    {
      name: "My Dashboard",
      link: "/",
      component: <>Dashboard</>,
      icon: <UilAirplay />,
      subMenu: [],
    },
    {
      name: "My Home",
      link: "/home",
      component: <MyHome />,
      icon: <UilHome />,
      subMenu: [],
    },
    {
      name: "Project Management",
      link: "/manageCustomer",
      component: ["Field Resource", "QE", "Circle Support", "Project Manager", "Vendor"].indexOf(rolename)==-1?<ManageCustomer />:<ManageUserProjectSiteId />,
      // component: <ManageUserProjectSiteId />,
      subMenu: [
        // {
        //   name: "Manage Project Group",
        //   link: "/manageProjectGroup",
        //   subMenu: [],
        //   component: <ManagePG />,
        //   icon: <Unicons.UilChannel size="16" />,
        // },
        // {
        //   name: "Manage Project Type",
        //   link: "/manageProjectType",
        //   subMenu: [],
        //   component: <ManagePT />,
        //   icon: <Unicons.UilChannel size="16" />,
        // },
        // {
        //   name: "Manage Access Control",
        //   link: "/manageAccessControl",
        //   subMenu: [],
        //   component: <POLifeCycle />,
        //   icon: <Unicons.UilChannel size="16" />,
        // },
        // {
        //   name: "View Expense/Advance",
        //   link: "/viewManage",
        //   subMenu: [],
        //   component: <POLifeCycle />,
        //   icon: <Unicons.UilChannel size="16" />,
        // },
      ],
      icon: <UilFileShieldAlt />,
    },
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
      icon: <UilUserSquare />,
    },
    {
      name: "Vendor Management",
      link: "/vendorCards",
      component: <VendorCards />,
      icon: <UilStore />,
      subMenu: [],
    },
    {
      name: "Financial",
      link: "/POLifeCylce",
      component: <POLifeCycle />,
      icon: <UilCoins />,
      subMenu: [],
    },
    {
      name: "Repository",
      link: "/operation-team",
      component: <OperationManagement />,
      icon: <UilDatabase />,
      subMenu: [],
    },
    {
      name: "Form",
      link: "/operation-team",
      component: <OperationManagement />,
      icon: <UilFileContract />,
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
};
