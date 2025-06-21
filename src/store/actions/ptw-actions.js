



import Api from "../../utils/api";
import { Urls } from "../../utils/url";
import { ALERTS } from "../reducers/component-reducer";
import { 
  GET_PTW_CUSTOMERS, 
  GET_PTW_MILESTONE, 
  GET_PTW_EMPLOYEE, 
  GET_PTW_PROJECTTYPE, 
  GET_PTW_PROJECTGROUP,
  GET_PTW_APPROVER_DATA,
  ADD_PTW_APPROVER_DATA,
  UPDATE_PTW_APPROVER_DATA,
  DELETE_PTW_APPROVER_DATA
} from "../reducers/ptw-reducer";

const PTWActions = {
  getPtwCustomers:
    (reset = true, uid = "", args = "") =>
    async (dispatch, _) => {
      try {
        const res = await Api.get({
          url: `${Urls.ptwCustomers}${uid != "" ? "/" + uid : ""}${
            args != "" ? "?" + args : ""
          }`,
        });
        if (res?.status !== 200) return;
        let dataAll = res?.data?.data;
        dispatch(GET_PTW_CUSTOMERS({ dataAll, reset }));
      } catch (error) {}
    },

  getPtwEmployee:
    (reset = true, uid = "", args = "") =>
    async (dispatch, _) => {
      try {
        const res = await Api.get({
          url: `${Urls.ptwEmployee}${uid != "" ? "/" + uid : ""}${
            args != "" ? "?" + args : ""
          }`,
        });
        if (res?.status !== 200) return;
        let dataAll = res?.data?.data;
        dispatch(GET_PTW_EMPLOYEE({ dataAll, reset }));
      } catch (error) {}
    },

  getPtwProjectType:
    (reset = true, uid = "", args = "") =>
    async (dispatch, _) => {
      try {
        const res = await Api.get({
          url: `${Urls.ptwProjectType}${uid != "" ? "/" + uid : ""}${
            args != "" ? "?" + args : ""
          }`,
        });
        if (res?.status !== 200) return;
        let dataAll = res?.data?.data;
        dispatch(GET_PTW_PROJECTTYPE({ dataAll, reset }));
      } catch (error) {}
    },

  getPtwProjectGroup:
    (reset = true, uid = "", args = "") =>
    async (dispatch, _) => {
      try {
        const res = await Api.get({
          url: `${Urls.PtwProjectGroup}${uid != "" ? "/" + uid : ""}${
            args != "" ? "?" + args : ""
          }`,
        });
        if (res?.status !== 200) return;
        let dataAll = res?.data?.data;
        dispatch(GET_PTW_PROJECTGROUP({ dataAll, reset }));
      } catch (error) {}
    },

  getPtwProjectMilestone:
    (reset = true, custId = "", projectTypeId = "", uid = "", args = "") =>
    async (dispatch, _) => {
      try {
        const res = await Api.get({
          url: `${Urls.PtwMilestone}${custId != "" ? "/" + custId : ""}${
            projectTypeId != "" ? "/" + projectTypeId : ""
          }${args != "" ? "?" + args : ""}`,
        });
        if (res?.status !== 200) return;
        let dataAll = res?.data?.data;
        dispatch(GET_PTW_MILESTONE({ dataAll, reset }));
      } catch (error) {}
    },

  // Get L1 Approver Data for table display
  getL1ApproverData:
    (reset = true, args = "") =>
    async (dispatch, _) => {
      try {
        const res = await Api.get({
          url: `${Urls.l1ApproverSubmit}${args != "" ? "?" + args : ""}`,
        });
        if (res?.status !== 200) return;
        let dataAll = res?.data?.data;
        dispatch(GET_PTW_APPROVER_DATA({ dataAll, reset }));
      } catch (error) {
        console.error("Error fetching L1 Approver data:", error);
      }
    },

  // Submit L1 Approver Form
  submitL1ApproverForm:
    (formData, callback = null) =>
    async (dispatch, _) => {
      try {
        const res = await Api.post({
          url: Urls.l1ApproverSubmit,
          data: formData,
        });
        console.log(res,'resresresresresres')
        if (res?.status == 200 || res?.status == 201) {
          let msgdata = {
            show: true,
            icon: "success",
            buttons: [],
            type: 1,
            text: "L1 Approver form submitted successfully!",
          };
          dispatch(ALERTS(msgdata));

          if (callback) callback();
          
          return res?.data;
        } else {
          let msgdata = {
            show: true,
            icon: "error",
            buttons: [],
            type: 1,
            text: res?.data?.msg || "Failed to submit form",
          };
          dispatch(ALERTS(msgdata));
        }
      } catch (error) {
        console.error("Error submitting L1 Approver form:", error);
        let msgdata = {
          show: true,
          icon: "error",
          buttons: [],
          type: 1,
          text: "Error submitting form. Please try again.",
        };
        dispatch(ALERTS(msgdata));
      }
    },

  // Update L1 Approver Form
  updateL1ApproverForm:
    (formData, uniqueId, callback = null) =>
    async (dispatch, _) => {
      try {
        const res = await Api.post({
          url: `${Urls.l1ApproverSubmit}/${uniqueId}`,
          data: formData,
        });

        if (res?.status === 200) {
          // Update the data in the store
          dispatch(UPDATE_PTW_APPROVER_DATA({ uniqueId, data: res?.data?.data }));
          
          // Show success message
          let msgdata = {
            show: true,
            icon: "success",
            buttons: [],
            type: 1,
            text: "L1 Approver form updated successfully!",
          };
          dispatch(ALERTS(msgdata));

          // Call callback if provided
          if (callback) callback();
          
          return res?.data;
        } else {
          // Show error message
          let msgdata = {
            show: true,
            icon: "error",
            buttons: [],
            type: 1,
            text: res?.data?.msg || "Failed to update form",
          };
          dispatch(ALERTS(msgdata));
        }
      } catch (error) {
        console.error("Error updating L1 Approver form:", error);
        let msgdata = {
          show: true,
          icon: "error",
          buttons: [],
          type: 1,
          text: "Error updating form. Please try again.",
        };
        dispatch(ALERTS(msgdata));
      }
    },

  // Delete L1 Approver Data
  deleteL1ApproverData:
    (uniqueId, callback = null) =>
    async (dispatch, _) => {
      try {
        const res = await Api.delete({
          url: `${Urls.l1ApproverSubmit}/${uniqueId}`,
        });

        if (res?.status === 200) {
         
          // dispatch(DELETE_PTW_APPROVER_DATA(uniqueId));
          
          // Show success message
          let msgdata = {
            show: true,
            icon: "success",
            buttons: [],
            type: 1,
            text: "L1 Approver data deleted successfully!",
          };
          dispatch(ALERTS(msgdata));

          // Call callback if provided
          if (callback) callback();
          
          return res?.data;
        } else {
          // Show error message
          let msgdata = {
            show: true,
            icon: "error",
            buttons: [],
            type: 1,
            text: res?.data?.msg || "Failed to delete data",
          };
          dispatch(ALERTS(msgdata));
        }
      } catch (error) {
        console.error("Error deleting L1 Approver data:", error);
        let msgdata = {
          show: true,
          icon: "error",
          buttons: [],
          type: 1,
          text: "Error deleting data. Please try again.",
        };
        dispatch(ALERTS(msgdata));
      }
    },
};

export default PTWActions;