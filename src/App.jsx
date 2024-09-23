import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import "./index.css";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import DataPlusAnalytics from "./pages/DataPlusAnalytics";
import LaverView from "./pages/LaverView";
import RunQuery from "./pages/CustomQuery/RunQuery";
import CommonForm from "./components/CommonForm";
import DBConfig from "./pages/CustomQuery/DBConfig";
import Modal from "./components/Modal";
import TopBar from "./components/TopBar";
import BIDashboard from "./pages/BusinessIntelligence/BIDashboard";
import QueryBuilderComponent from "./pages/CustomQuery/QueryBuilder";
import { PowerBIEmbed } from "powerbi-client-react";
import { Sidebar_content } from "./utils/sidebar_values";
import Navigation from "./Navigation";
import SweetAlerts from "./components/SweetAlerts";
import { useSelector } from "react-redux";
import Loaders from "./components/Loaders";
import WebSocketClient from "./components/WebSocketClient";
import SetupPassword from "./pages/SetupPassword";
import Kycregister from "./pages/Kycregister";
import Agreement from "./pages/Agreement";
import Otp from "./pages/Otp";
import ViewPitchDeck from "./pages/PitchDeck/ViewPitchDeck";
import PitchDeckAdmin from "./pages/PitchDeck/viewPitchDeckAdmin";
import Sidebar from "./components/Sidebar";
import Business_Registration from "./pages/Business_Registration";
import SetUpRegistration from "./pages/setupRegistration";
import MonthRevenueTrend from "./pages/PMIS/Formss/FinancialGraph/MonthRevenueTrend";
import MonthlyRevenueCircle from "./pages/PMIS/Formss/FinancialGraph/MonthlyRevenueCircle";
import CumulativeTrendPlanVsActual from "./pages/PMIS/Formss/FinancialGraph/CumulativeTrendPlanVsActual";
import MS1AndMS2CircleWise from "./pages/PMIS/Dashboard1/MS1AndMS2CircleWise";

function App() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  
  let permission = JSON.parse(localStorage.getItem("permission")) || {};
  let user = JSON.parse(localStorage.getItem("user"));
  let rolename = user?.roleName;
  const unProtectedUrl = [
    {
      url: "/login",
      component: <Login />,
    },
    {
      url: "/register",
      component: <Registration />,
    },
    {
      url: "/setupRegistration/:uid",
      component: <SetUpRegistration />,
    },
    {
      url: "/kycregister/:uid",
      component: <Kycregister />,
    },
    {
      url: "/agreement/:uid",
      component: <Agreement />,
    },
    {
      url: "/otp",
      component: <Otp />,
    },
    {
      url: "/setupPassword",
      component: <SetupPassword />,
    },
    {
      url: "/",
      component: <></>,
    },
    {
      url: "/viewPitch/:pitchId",
      component: <ViewPitchDeck />,
    },
    {
      url: "/businessRegistration/:uid",
      component: <Business_Registration />,
    },
  ];

  const [sidebarOpen, setsidebarOpenn] = useState(true);
  let checkAuth = localStorage.getItem("auth");
  if (checkAuth == undefined || checkAuth == false) {
    localStorage.setItem("auth", false);
    navigate("/login");
  }
  // let checkAuth = useSelector((state) => {
  //     let interdata=state?.auth?.authenticated
  //     return interdata
  // })
  let locdata = useLocation();
  // console.log(locdata, "locdatalocdata");
  let unsecured = ["login", "register", "setupPassword"];

  useEffect(() => {
    // console.log("dsadsadsadsadsa", Roles);
  }, []);


  window.addEventListener('popstate',function(event){
    console.log("backaddEventListeneraddEventListener")
  })
  return (
    <main className="flex h-screen overflow-hidden  justify-center">
      {locdata.pathname != "/login" && <WebSocketClient />}
      {/* 
            <div class="flex">
                <div class="w-1/4 bg-gray-200 p-4">
                    <h2 class="text-xl font-semibold mb-4">Sidebar</h2>
                    <ul>
                        <li><a href="#" class="text-blue-500 hover:underline">Link 1</a></li>
                        <li><a href="#" class="text-blue-500 hover:underline">Link 2</a></li>
                        <li><a href="#" class="text-blue-500 hover:underline">Link 3</a></li>
                    </ul>
                </div>
                <div class="flex-1 bg-white p-4">
                    <h1 class="text-2xl font-semibold mb-4">Main Content</h1>
                    <p>This is the main content of your page.</p>
                </div>
            </div> */}
      {/* <div class="flex"> */}
      {/* <div class="flex flex-1"> */}
      {/* <Layout sidebarOpen={sidebarOpen} child={<QueryBuilderComponent />} />  */}
      <Routes>
        {unProtectedUrl.map((itm) => {
          return <Route path={itm.url} element={itm.component} />;
        })}
      </Routes>
      {!locdata.pathname.includes("/login") &&
      !locdata.pathname.includes("/register") &&
      !locdata.pathname.includes("/setupPassword") &&
      !locdata.pathname.includes("/agreement") &&
      !locdata.pathname.includes("/kycregister") &&
      !locdata.pathname.includes("/otp") &&
      !locdata.pathname.includes("/viewPitch") &&
      !locdata.pathname.includes("/companydetail") &&
      !locdata.pathname.includes("/businessRegistration") &&
      !locdata.pathname.includes("/setupRegistration") ? (
        <div className="flex flex-row flex-1">
          <Sidebar
            sidebarOpen={sidebarOpen}
            setsidebarOpenn={setsidebarOpenn}
          />
          <div className="flex relative flex-col flex-1">
            <TopBar
              sidebarOpen={sidebarOpen}
              setsidebarOpenn={setsidebarOpenn}
            />
            <Navigation sidebarOpen={sidebarOpen} />
          </div>
        </div>
      ) : (
        <></>
      )}
      {/* <div className='flex-1'>
                    <BIDashboard />
                </div> */}
      {/* </div> */}
      {/* <div class="flex-1 bg-white p-4"> */}
      {/* <Layout child={<DBConfig />} /> */}
      {/* </div> */}
      {/* </div> */}
      {/* <div className='grid grid-cols-12'>
                <div className='bg-red-900 col-span-2'>  
                </div>
                <div className='bg-blue-900 col-span-10'>
                    hiii
                </div>
            </div> */}
      {/* <Modal size={"xl"} children={<>Hello</>} isOpen={sidebarOpen} setIsOpen={setsidebarOpenn}/> */}
      {/* <Layout child={<RunQuery />}/> */}
      {/* <CommonForm/> */}
      {/* <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/' element={1==2} >
                    <Route path='/' element={<Layout child={<DataPlusAnalytics />} />} />
                    <Route path='/dataPlusAnaltyics' element={<Layout child={<DataPlusAnalytics />} />} />
                    <Route path='/laverView' element={<Layout child={<LaverView />} />} />
                    <Route path='/custom_query/run_query' element={<Layout child={<RunQuery />} />} />
                </Route>

            </Routes> */}

      {/* <QueryBuilderComponent/> */}

      <SweetAlerts />

      <Loaders />
    </main>

    // <div className="min-h-screen min-w-screen">
    // <div>

    //     {/* <Login/> */}
    // </div>
  );
}

export default App;
