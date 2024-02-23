import * as Unicons from "@iconscout/react-unicons";
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
  ],
 

  all_routes: [
    
    {
      name: "Investment Dashboard",
      link: "/investment/dashboard",
      component: <Cart />,
      icon: <Unicons.UilReact />,
      subMenu: [],
    },
    {
      name: "Investment Discovery",
      link: "/investment/discovery",
      component: <InvestmentDiscovery />,
      icon: <Unicons.UilReact />,
      subMenu: [],
    },
    {
      name: "Investor crm",
      link: "/investor/crm",
      component: <InvestorCrm />,
      icon: <Unicons.UilReact />,
      subMenu: [],
    },
    {
      name: "Investment Transactions",
      link: "/communication",
      component: <InvestmentTransaction />,
      icon: <Unicons.UilReact />,
      subMenu: [],
    },
    {
      name: "Fundseeker Details",
      link: "/fundseeker_details",
      component: <FundSeekerDetails/>,
      icon: <Unicons.UilReact />,
      subMenu: [],
    },
    // {
    //     name: "Details",
    //     link: "/details",
    //     component: <Details/>,
    //     icon: <Unicons.UilReact />,
    //     subMenu: [],
    // },
    {
      name: "Details",
      link: "/investor/crm/details",
      component: <InvestorCRMDetails />,
      icon: <Unicons.UilReact />,
      subMenu: [],
    },
    {
      name: "Details",
      link: "/investor/crm/details/:uid",
      component: <InvestorCRMDetails />,
      icon: <Unicons.UilReact />,
      subMenu: [],
    },
    
    
    {
      name: "Company Details",
      link: "/details",
      component: <Details />,
      icon: <Unicons.UilReact />,
      subMenu: [],
    },
    // {
    //   name: "Portfolio",
    //   link: "/portfolio",
    //   component: <Portfolio />,
    //   icon: <Unicons.UilReact />,
    //   subMenu: [],
    // },
    
    {
      name: "KYC Status",
      link: "/kyc-status",
      component: <KYCManagement />,
      icon: <Unicons.UilReact />,
      subMenu: [],
    },
    {
      name: "Investment Details",
      link: "/investment-Details",
      component: <InvestmentDetailsManagement />,
      icon: <Unicons.UilReact />,
      subMenu: [],
    },
    {
      name: "Send Email",
      link: "/send_email",
      component: <SendEmail />,
      icon: <Unicons.UilReact />,
      subMenu: [],
    },
    {
      name: "Pitch Deck",
      link: "/pitch/deck",
      component: <PitchDeck />,
      icon: <Unicons.UilReact />,
      subMenu: [],
    },
    {
      name: "Pitch Deck",
      link: "/BlobFileViewer",
      component: <BlobFileViewer />,
      icon: <Unicons.UilReact />,
      subMenu: [],
    },
    {
      name: "Profile",
      link: "/profile",
      component: <Profile />,
      icon: <Unicons.UilReact />,
      subMenu: [],
    }, {
      name: "Agreement",
      link: "/agreemenView",
      component: <AgreementManagement/>,
      icon: <Unicons.UilReact />,
      subMenu: [],
    },

   
  ],
  Admin: [
    {
      name: "Operation Team",
      link: "/operation-team",
      component: <OperationManagement/>,
      icon: <Unicons.UilReact />,
      subMenu: [],
    },
    {
      name: "View Pitches",
      link: "/view-pitches",
      component: <PitchDeckAdmin/>,
      icon: <Unicons.UilReact />,
      subMenu: [],
    },
    
   
    {
      name: "Admin",
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
};
