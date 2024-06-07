import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    getManageCustomer: [],
    getManageCircle:[],
    getCardProjectType:[],
    getManageProjectType:[],
    getManageZone:[],
    getAssetRegistration:[],
    getManageCostCenter:[],
    getManageProjectGroup:[],
    getManageSubProject:[],
    getProject:[],
    getManageDepartment:[],
    getManageDesignation:[],
    getManageProfile:[], 
    getState:[], 
    getManageProject:[],
    getCities:[],
    getProjectAllocation:[],
    getOneManageProject:[],
    getProjectTypeDyform:[],
    getOneSEProjectTypeDyform:[],
    getVishal:[],
    getPOProjectType:[],
    getPOSubProjectType:[],
    getPOProjectID:[],
    getInvoiceSiteId:[],
    getInvoiceSSID:[],
    getVendorProjectAllocation:[],
    getComponentAllocation:[],
    getOldComponentAllocation:[],
    getManageCompletionCriteria:[],
    getManageClaimType:[],
    getManageClaimTypeUnitRate:[],
    getManageClaimTypeDesignation:[],
    getManageExpenseAdvance:[],

}

const adminData = createSlice({
    name:'adminData',
    initialState,
    reducers:{

        GET_MANAGE_CUSTOMER:(state,{payload}) => {
            if(payload.reset){
                state.getManageCustomer = payload.dataAll
            }else{
                state.getManageCustomer  = [...state.getManageCustomer,...payload.dataAll]
            }
        },
        GET_COMPONENT_ALLOCATION:(state,{payload}) => {
            if(payload.reset){
                state.getComponentAllocation = payload.dataAll
            }else{
                state.getComponentAllocation  = [...state.getComponentAllocation,...payload.dataAll]
            }
        },
        GET_OLD_COMPONENT_ALLOCATION:(state,{payload}) => {
            if(payload.reset){
                state.getOldComponentAllocation = payload.dataAll
            }else{
                state.getOldComponentAllocation  = [...state.getOldComponentAllocation,...payload.dataAll]
            }
        },
        

        

        // GET_MANAGE_PROJECT_TYPE:(state,{payload}) => {
        //     if(payload.reset){
        //         state.getManageProject = payload.dataAll
        //     }else{
        //         state.getManageProject  = [...state.getManageProject,...payload.dataAll]
        //     }
        // },
        GET_MANAGE_PROJECT_TYPE_DY_FORM:(state,{payload}) => {
            if(payload.reset){
                state.getProjectTypeDyform = payload.dataAll
            }else{
                state.getProjectTypeDyform  = [...state.getProjectTypeDyform,...payload.dataAll]
            }
        },
        GET_ONE_MANAGE_PROJECT_TYPE_DY_FORM:(state,{payload}) => {
            if(payload.reset){
                state.getOneProjectTypeDyform = payload.dataAll
            }else{
                state.getOneProjectTypeDyform  = [...state.getProjectTypeDyform,...payload.dataAll]
            }
        },

        
        
        GET_MANAGE_CIRCLE:(state,{payload}) => {
            if(payload.reset){
                state.getManageCircle = payload.dataAll
            }else{
                state.getManageCircle  = [...state.getManageCircle,...payload.dataAll]
            }
        },


        GET_ONE_MANAGE_PROJECT:(state,{payload}) => {
            if(payload.reset){
                state.getOneManageProject = payload.dataAll
            }else{
                state.getOneManageProject  = [...state.getOneManageProject,...payload.dataAll]
            }
        },

        GET_MANAGE_ZONE:(state,{payload}) => {
            if(payload.reset){
                state.getManageZone = payload.dataAll
            }else{
                state.getManageZone  = [...state.getManageZone,...payload.dataAll]
            }
        },

        GET_MANAGE_COST_CENTER:(state,{payload}) => {
            if(payload.reset){
                state.getManageCostCenter = payload.dataAll
            }else{
                state.getManageCostCenter  = [...state.getManageCostCenter,...payload.dataAll]
            }
        },

        GET_MANAGE_PROJECT_TYPE:(state,{payload}) => {
            if(payload.reset){
                state.getManageProjectType = payload.dataAll
            }else{
                state.getManageProjectType  = [...state.getManageProjectType,...payload.dataAll]
            }
        },

        GET_MANAGE_PROJECT_GROUP:(state,{payload}) => {
            if(payload.reset){
                state.getManageProjectGroup = payload.dataAll
            }else{
                state.getManageProjectGroup  = [...state.getManageProjectGroup,...payload.dataAll]
            }
        },

        GET_CARD_PROJECT_TYPE:(state,{payload}) => {
            if(payload.reset){
                state.getCardProjectType = payload.dataAll
            }else{ 
                state.getCardProjectType  = [...state.getCardProjectType,...payload.dataAll]
            }
        },

        GET_PROJECT:(state,{payload}) => {
            if(payload.reset){
                state.getProject = payload.dataAll
            }else{
                state.getProject  = [...state.getProject,...payload.dataAll]
            }
        },

        GET_MANAGE_DEPARTMENT:(state,{payload}) => {
            if(payload.reset){
                state.getManageDepartment = payload.dataAll
            }else{
                state.getManageDepartment  = [...state.getManageDepartment,...payload.dataAll]
            }
        },

        GET_MANAGE_DESIGNATION:(state,{payload}) => {
            if(payload.reset){
                state.getManageDesignation = payload.dataAll
            }else{
                state.getManageDesignation  = [...state.getManageDesignation,...payload.dataAll]
            }
        },

        GET_MANAGE_PROFILE:(state,{payload}) => {
            if(payload.reset){
                state.getManageProfile = payload.dataAll
            }else{
                state.getManageProfile  = [...state.getManageProfile,...payload.dataAll]
            }
        },

        GET_MANAGE_COMPLETION_CRITERIA:(state,{payload}) => {
            if(payload.reset){
                state.getManageCompletionCriteria = payload.dataAll
            }else{
                state.getManageCompletionCriteria  = [...state.getManageCompletionCriteria,...payload.dataAll]
            }
        },

        GET_MANAGE_CLAIM_TYPE:(state,{payload}) => {
            if(payload.reset){
                state.getManageClaimType = payload.dataAll
            }else{
                state.getManageClaimType  = [...state.getManageClaimType,...payload.dataAll]
            }
        },

        GET_MANAGE_CLAIM_TYPE_UNIT_RATE:(state,{payload}) => {
            if(payload.reset){
                state.getManageClaimTypeUnitRate = payload.dataAll
            }else{
                state.getManageClaimTypeUnitRate  = [...state.getManageClaimTypeUnitRate,...payload.dataAll]
            }
        },

        GET_MANAGE_CLAIM_TYPE_DESIGNATION:(state,{payload}) => {
            if(payload.reset){
                state.getManageClaimTypeDesignation = payload.dataAll
            }else{
                state.getManageClaimTypeDesignation  = [...state.getManageClaimTypeDesignation,...payload.dataAll]
            }
        },

        GET_MANAGE_EXPENSE_ADVANCE:(state,{payload}) => {
            if(payload.reset){
                state.getManageExpenseAdvance = payload.dataAll
            }else{
                state.getManageExpenseAdvance  = [...state.getManageExpenseAdvance,...payload.dataAll]
            }
            
        },
        

        GET_MANAGE_SUB_PROJECT:(state,{payload}) => {
            if(payload.reset){
                state.getManageSubProject = payload.dataAll
            }else{
                state.getManageSubProject  = [...state.getManageSubProject,...payload.dataAll]
            }
        },

        GET_STATE:(state,{payload}) => {
            if(payload.reset){
                state.getState = payload.dataAll
            }else{
                state.getState  = [...state.getState,...payload.dataAll]
            }
        },

        GET_CITIES:(state,{payload}) => {
            if(payload.reset){
                state.getCities = payload.dataAll
            }else{
                state.getCities  = [...state.getCities,...payload.dataAll]
            }
        },


        GET_PROJECT_ALLLOCATION:(state,{payload}) => {
            if(payload.reset){
                state.getProjectAllocation = payload.dataAll
            }else{
                state.getProjectAllocation  = [...state.getProjectAllocation,...payload.dataAll]
            }
        },

        GET_VISHAL:(state,{payload}) => {
            if(payload.reset){
                state.getVishal = payload.dataAll
            }else{
                state.getVishal  = [...state.getVishal,...payload.dataAll]
            }
        },

        GET_PO_PROJECTTYPE:(state,{payload}) => {
            console.log('payloadpayload',payload)
            if(payload.reset){
                state.getPOProjectType = payload.dataAll
            }else{
                state.getPOProjectType  = [...state.getPOProjectType,...payload.dataAll]
            }
        },

        GET_PO_SUB_PROJECTTYPE:(state,{payload}) => {
            console.log('payloadpayload',payload)
            if(payload.reset){
                state.getPOSubProjectType = payload.dataAll
            }else{
                state.getPOSubProjectType  = [...state.getPOSubProjectType,...payload.dataAll]
            }
        },

        GET_PO_PROJECTID:(state,{payload}) => {
            console.log('payloadpayload',payload)
            if(payload.reset){
                state.getPOProjectID = payload.dataAll
            }else{
                state.getPOProjectID  = [...state.getPOProjectID,...payload.dataAll]
            }
        },
        
        GET_INVOICE_SITEID:(state,{payload}) => {
            console.log('payloadpayload',payload)
            if(payload.reset){
                state.getInvoiceSiteId = payload.dataAll
            }else{
                state.getInvoiceSiteId  = [...state.getInvoiceSiteId,...payload.dataAll]
            }
        },

        GET_INVOICE_SSID:(state,{payload}) => {
            console.log('payloadpayload',payload)
            if(payload.reset){
                state.getInvoiceSSID = payload.dataAll
            }else{
                state.getInvoiceSSID  = [...state.getInvoiceSSID,...payload.dataAll]
            }
        },

        GET_VENDOR_PROJECT_ALLLOCATION:(state,{payload}) => {
            if(payload.reset){
                state.getVendorProjectAllocation = payload.dataAll
            }else{
                state.getVendorProjectAllocation  = [...state.getVendorProjectAllocation,...payload.dataAll]
            }
        },

        
        

        // GET_ASSET_REGISTRATION:(state,{payload}) => {
        //     if(payload.reset){
        //         state.getAssetRegistration = payload.dataAll
        //     }else{
        //         state.getAssetRegistration  = [...state.getAssetRegistration,...payload.dataAll]
        //     }
        // },
    }
})

export const { 
    
    GET_MANAGE_CUSTOMER,
    GET_MANAGE_CIRCLE, 
    GET_MANAGE_ZONE,
    GET_MANAGE_COST_CENTER, 
    GET_MANAGE_PROJECT_GROUP, 
    GET_CARD_PROJECT_TYPE,
    GET_MANAGE_PROJECT_TYPE,
    GET_PROJECT,
    GET_MANAGE_DEPARTMENT,
    GET_MANAGE_DESIGNATION,
    GET_MANAGE_PROFILE,
    GET_STATE,
    GET_CITIES,
    GET_PROJECT_ALLLOCATION,
    GET_VENDOR_PROJECT_ALLLOCATION,
    GET_ONE_MANAGE_PROJECT,
    GET_MANAGE_PROJECT_TYPE_DY_FORM,
    GET_ONE_MANAGE_PROJECT_TYPE_DY_FORM,
    GET_MANAGE_COMPLETION_CRITERIA,
    GET_MANAGE_CLAIM_TYPE,
    GET_MANAGE_CLAIM_TYPE_UNIT_RATE,
    GET_MANAGE_CLAIM_TYPE_DESIGNATION,
    GET_MANAGE_EXPENSE_ADVANCE,
    // Not in use
    // GET_MANAGE_PROJECT,
    GET_MANAGE_SUB_PROJECT,  
    // GET_ASSET_REGISTRATION
    GET_VISHAL,
    GET_PO_PROJECTTYPE,
    GET_PO_SUB_PROJECTTYPE,
    GET_PO_PROJECTID,
    GET_INVOICE_SITEID,
    GET_INVOICE_SSID,
    GET_COMPONENT_ALLOCATION,
    GET_OLD_COMPONENT_ALLOCATION

} = adminData.actions
    
export default adminData.reducer