import axios from "axios";
import { API_REQ_TYPE } from "../Utils/Constants";
// import { isObject, logout } from '../utils/utils';
// import { useNavigate } from 'react-router-dom';

// const basePath = ENV_VAR.API_ENDPOINT;
const basePath = "https://localhost:7197/api";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, HEAD, DELETE",
  },
};

const handleErrorResponse = async (err) => {
  // const navigate = useNavigate();
  //   const { UNAUTHORISED, FORBIDDEN } = API_RESPONSE_CODES;
  //   if ([UNAUTHORISED, FORBIDDEN].includes(err?.response?.status)) {
  //     const { status, errors, data } = err.response;
  //     // if (status === UNAUTHORISED || status === FORBIDDEN) {
  //     //   logout(navigate);
  //     // }
  //     return { errors, errorCode: status, isSuccessful: false, data: data?.data };
  //   }
  if (err) {
    // const errRes = err.toJSON();
    // if (errRes.message === ERRORS.NETWORK_ERROR) {
    //   authService.logout();
    // }
    // return { error: errRes, errorCode: INTERNAL_SERVER_ERROR, isSuccessful: false, data: null };
    return { error: err.response, isSuccess: false };
  }
  return err;
};

const handleSuccessResponse = (res) => {
  //   const { SUCCESS, SUCCESS_CREATE, SUCCESS_NO_CONTENT } = API_RESPONSE_CODES;
  let response = {
    data: res.data,
    isSuccess: res.status === 200 ? true : false,
  };
  if (res.status === 200) {
    return response;
  }
  //   else if ([SUCCESS_CREATE, SUCCESS_NO_CONTENT].includes(res.status)) {
  //     return { data: res.data };
  //   }
  return res;
};

export const getData = (url) => {
  //   const { userData } = sessionStorage;
  //   const userDetails = JSON.parse(userData);
  //   if (isObject(userDetails)) {
  //     config.headers.Authorization = `bearer ${userDetails.jwtToken}`;
  //     config.headers.userId = userDetails.userId;
  return axios
    .get(`${basePath}${url}`, config)
    .then((res) => handleSuccessResponse(res))
    .catch((err) => handleErrorResponse(err, { type: API_REQ_TYPE.GET, url }));
  //   }
  //   return '';
};

export const postData = (url, body) => {
  //   if (!isLogin) {
  //     const { userData } = sessionStorage;
  //     const userDetails = JSON.parse(userData);
  //     if (isObject(userDetails)) {
  //       config.headers.Authorization = `bearer ${userDetails.jwtToken}`;
  //       config.headers.userId = userDetails.userId;
  //       return axios
  //         .post(`${basePath}${url}`, body, config)
  //         .then((res) => handleSuccessResponse(res))
  //         .catch((err) => handleErrorResponse(err, { type: API_REQ_TYPE.POST, url, body }));
  //     }
  //   } else {
  return axios
    .post(`${basePath}${url}`, body, config)
    .then((res) => handleSuccessResponse(res))
    .catch((err) =>
      handleErrorResponse(err, { type: API_REQ_TYPE.POST, url, body })
    );
  //   }
  //   return '';
};

export const patchData = (url, body) => {
  //   const { userData } = sessionStorage;
  //   const userDetails = JSON.parse(userData);
  //   if (isObject(userDetails)) {
  //     config.headers.Authorization = `bearer ${userDetails.jwtToken}`;
  //     config.headers.userId = userDetails.userId;
  return axios
    .patch(`${basePath}${url}`, body, config)
    .then((res) => handleSuccessResponse(res))
    .catch((err) =>
      handleErrorResponse(err, { type: API_REQ_TYPE.PATCH, url, body })
    );
  //   }
  //   return '';
};

export const putData = (url, body) => {
  //   if (isLoggedin) {
  //     const { userData } = sessionStorage;
  //     const userDetails = JSON.parse(userData);
  //     if (isObject(userDetails)) {
  //       config.headers.Authorization = `bearer ${userDetails.jwtToken}`;
  //       config.headers.userId = userDetails.userId;
  //       return axios
  //         .put(`${basePath}${url}`, body, config)
  //         .then((res) => handleSuccessResponse(res))
  //         .catch((err) => handleErrorResponse(err, { type: API_REQ_TYPE.PUT, url, body }));
  //     }
  //     return '';
  //   } else {
  return axios
    .put(`${basePath}${url}`, body, config)
    .then((res) => handleSuccessResponse(res))
    .catch((err) =>
      handleErrorResponse(err, { type: API_REQ_TYPE.PUT, url, body })
    );
  //   }
};

export const deleteData = (url) => {
  //   const { userData } = sessionStorage;
  //   const userDetails = JSON.parse(userData);
  //   if (isObject(userDetails)) {
  //     config.headers.Authorization = `bearer ${userDetails.jwtToken}`;
  //     config.headers.userId = userDetails.userId;
  return axios
    .delete(`${basePath}${url}`, config)
    .then((res) => handleSuccessResponse(res))
    .catch((err) =>
      handleErrorResponse(err, { type: API_REQ_TYPE.DELETE, url })
    );
  //   }
  //   return '';
};
