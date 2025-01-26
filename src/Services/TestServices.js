import { getData } from "./rest-services";

export const testApi = () => getData("/Employees/GetAllEmployees");
