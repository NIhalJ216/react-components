import { getData, postData } from "./rest-services";
import { APIS } from "../Utils/apiList";

export const addMenu = (data) => postData(`${APIS.ADD_MENU}`, data);

export const getMenuById = (menuItemId) =>
  getData(`${APIS.GET_MENUBYID}${menuItemId}`);

export const getMenuList = () => getData(`${APIS.GET_MENULIST}`);
