export const baseUrl="http://localhost:7980"
export const backendassetUrl="http://localhost:7980/"

// export const baseUrl="http://192.168.29.70:7980"
// export const backendassetUrl="http://192.168.29.70:7980/"


// export const baseUrl="http://192.168.0.116:7980"
// export const backendassetUrl="http://192.168.0.116:7980/"

// export const baseUrl="http://192.168.0.128:7980"
// export const backendassetUrl="http://192.168.0.128:7980/"


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
    admin_profile:"/hr/manageProfile",
    admin_project_allocation:"/hr/projectAllocation",
    admin_uamView:"/uamView",
    admin_completion_criteria:"/admin/complectionCriteria",
    upload_bulk_site:"/uploadBulkSite",
    
    admin_getProjectSubType:"/admin/getProjectSubType",
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
    vendor_details:"/vendorDetails",
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
    admin_claim_type:"/expenses/ClaimType",




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

}


export const WebSocketUrls = {siteAnalytics: "siteanalytics"};