import { deleteData, getData, postData, putData } from "./rest-services";
import { APIS } from "../Utils/apiList";

export const addMenu = (data) => postData(`${APIS.ADD_MENU}`, data);

export const getMenuById = (menuItemId) =>
  getData(`${APIS.GET_MENUBYID}${menuItemId}`);

export const getMenuList = () => getData(`${APIS.GET_MENULIST}`);

export const updateMenu = (data) => putData(`${APIS.UPDATE_MENU}`, data);

export const deleteMenu = (menuItemId) => deleteData(`${APIS.DELETE_MENU}${menuItemId}`);