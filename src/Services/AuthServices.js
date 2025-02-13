import { postData } from "./rest-services";
import { APIS } from "../Utils/apiList";

export const registerUser = (data) => postData(`${APIS.REGITER_USER}`, data);
export const loginUser = (data) => postData(`${APIS.LOGIN_USER}`, data);
