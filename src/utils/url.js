// export const baseUrl="http://localhost:7980"
// export const backendassetUrl="http://localhost:7980/"

export const baseUrl="http://192.168.29.23:7980"
export const backendassetUrl="http://192.168.29.23:7980/"

// export const baseUrl="https://pmisfbapi.fourbrick.in"
// export const backendassetUrl="https://pmisfbapi.fourbrick.in/"   

export const Urls={

    login:"/login",
    sendMail :"/sendMail",
    logout:"/logout",
    admin_userList:"/admin/users",
    admin_roleList:"/admin/roles",

    // new url
    admin_userAccess:"/admin/userAccess",
    admin_customer:"/admin/manageCustomer",
    admin_projecttype:"/admin/manageProjectType",
    admin_getOneSiteEngg:"/getOneSiteEngg",
    admin_getProjectTypeDyform:"/admin/getProjectTypeDyform",
    admin_sub_projecttype:"/admin/manageSubProjectType",
    admin_circle:"/admin/manageCircle",
    admin_zone:"/admin/manageZone",
    admin_cost_center:"/admin/manageCostCenter",
    admin_project_group:"/admin/manageProjectGroup",
    admin_card_projecttype:'/admin/cardProjectType',
    admin_project:"/admin/manageProject",
    admin_department:"/admin/manageDepartment",
    admin_designation:"/admin/manageDesignation",
    admin_empdetails:"/hr/manageEmployee",
    admin_all_empdetails:"/hr/allEmployee",
    admin_hr_manager_emp:"/hr/allHr",
    admin_profile:"/hr/manageProfile",
    admin_project_allocation:"/hr/projectAllocation",
    admin_uamView:"/uamView",
    admin_completion_criteria:"/admin/complectionCriteria",
    upload_bulk_site:"/uploadBulkSite",
    
    admin_getProjectSubType:"/admin/getProjectSubType",
    admin_getMappedData:"/mappedData",
    admin_getCircleWithPG:"/circlewithPG",
    projectList_getproject_allocation:"/projectAllocationList/",
    projectList_financialData:"/financialData",
    projectList_issueData:"/issueData",
    projectList_trackingData:"/trackingData",
    projectList_siteEngineer:"/siteEngineer",
    projectList_milestone:"/milestone",
    projectList_globalSaver:"/globalSaver",
    projectList_changeTaskStatus:"/changeTaskStatus",
    projectList_closeMilestone:"/closeMilestone/",
    project_circle:'/project/circle',



    State:"/state",
    Cities:"/city",
    admin_vishal:"/vishal",
    myHome_personal_info:"/myHome/getPersonalInfo",
    Hr_Expense_Advance:"/hr/expenseAdavance",
    
    MyHome:"/myHome/Cards",
    admin_assetRegistration:"/myHome/assetRegistration",
    common_file_uploadr:"/commonUploadFile",
    common_file_uploadr1:"/UploadFile",
    templateUploadFile:"/templateUploadFile",
    vendor_details:"/hr/vendor",
    vendor_project_allocation:"/vendorProjectAllocation",
    vendor_project_list:"/vendorSiteId",
    common_update_site_milestone :"/commonUpdate",

    finance_poinvoice_based:"/finance/poInvoiceBased",
    finance_Invoice:"/finance/invoice",
    finance_poworkdone_based:"/finance/poWorkdoneBased",
    finance_poworkdone_itemCode:"/finance/commercial",
    finance_poworkdone_dashboard:"/finance/poTrackingWorkdone",
    // finance_poaccrual_revenue:"/finance/accrualRevenue",
    finance_poaccrual_revenue:"/finance/accrualRevenue",



    projectEvent:"/projectEventLog",
    siteEventLog:"/siteEventLog",
    milestoneEvent:"/milestoneEventLog",
    admin_poProjectType:"/finance/projectType",
    admin_poSubProjectType:"/finance/subProject",
    admin_poProjectID:"/finance/poProjectID",
    admin_invoiceSiteId:"/finance/siteId",
    admin_invoiceSSID:"/finance/ssId",

    formss_earnValue_mgmt_financial:"/forms/earnValue",
    formss_EVM_delivery:"/forms/EVMActual",
    formss_accrualrevenue_trend: "/forms/accrualRevenueTrend",
    forms_profit_loss: "/forms/profilt&loss",
    admin_claim_type:"/expenses/ClaimType",

    admin_claim_type:"/expenses/ClaimType",
    admin_claim_type_unit_rate:"/expenses/unitRate",
    admin_claim_type_designation:"/expenses/ClaimTypeDesignation",
    admin_expense_advance:"/expenses/claimTypeRole",
    expAdv_fill_expense:"/expenses/fillExpense",
    expAdv_fill_advance:"/expenses/fillAdvance",
    expAdv_claimType_advance:"/expenses/claimTypeAdvance",
    expAdv_project_details:"/expenses/projectDetails",
    expAdv_siteId:"/expenses/projectSite",
    expAdv_taskName:"/expenses/projectSiteTask",
    expAdv_unitRate_claimType:"/expenses/unitRateClaimType",
    expAdv_L1Data:"/approval/l1Approval",
    expAdv_L1AdvanceData:"/Advance/approval/l1Approval",
    expAdv_L2Data:"/approval/l2Approval",
    expAdv_L2AdvanceData:"/Advance/approval/l2Approval",
    expAdv_L3Data:"/approval/financeApprover",
    expAdv_L3AdvanceData:"/Advance/approval/l3Approval",
    expAdv_Approval:"/approval/status",
    expAdv_all_expense_approve:"/approval/statusBulk",
    expAdv_expense_emp_name:"/expenses/fillDAEmpName",
    expAdv_expense_emp_code:"/expenses/fillDAEmpData",
    expAdv_DA_Fill:"/expenses/fillDA",
    expAdv_DA_project_Id:"/expenses/DAFillProjectId",
    expAdv_DA_cost_center:"expenses/DAFillcostCenter",
    expAdv_expenses_by_expensesNo_in_popup:"/expenses/ExpenseNo",
    expAdv_claim_and_advance:"/expenses/claimAndAdvance",
    expAdv_download_attachment:"/expenses/DownloadAttachment",
    expAdv_hr_all_expenses:"/expenses/AllExpenses",
    expAdv_hr_all_advance:"/Advance/AllAdvance",

    // FILTER

    filter_project_circle:'/filter/project/circle',
    filter_project_projectId:'/filter/project/projectId',
    filter_project_projectGroup:'/filter/project/projectGroup',
    filter_project_projectType:'/filter/project/projectType',
    filter_project_projectManager:'/filter/project/projectManager',

    filter_site_subProject:'/filter/site/subProject',

    filter_financial_poManagement_customer:'/filter/financial/pomanagement/customer',
    filter_financial_poManagement_projectGroup:'/filter/financial/pomanagement/projectGroup',
    filter_financial_poManagement_projectId:'/filter/financial/pomanagement/projectId',

    filter_financial_RevenueManagement_customer:'/filter/financial/revenueManagement/customer',
    filter_financial_RevenueManagement_projectGroup:'/filter/financial/revenueManagement/projectGroup',


    filter_financial_poWorkDone_customer:'/filter/financial/poWorkDone/customer',
    autosuggestion_projectManager:'/autosuggestion/projectManger',

    //  GRAPH

    graph_project_status:"/graph/projectStatus",
    graph_milestone_status:"/graph/milestoneStatus",
    graph_po_status:"/graph/poStatus",
    graph_po_tracing_workdone:"/graph/poTrackingWorkdone",
    graph_accrual_revenue_trend:"/graph/accrualRevenueTrend",


    // currentuser
    
    current_user_PG:"/currentuser/ProjectGroup",
    current_user_PT:"/currentuser/ProjectType",
    current_user_PID:"/currentuser/ProjectId"



}


export const WebSocketUrls = {siteAnalytics: "siteanalytics"};