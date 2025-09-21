import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})



export class ApisConfig{


  API_LOCAL_URL:string="http://localhost:3400/"
  API_SERVER_URL:string=""

  // Method POST
  ADMIN_LOGIN: string = "api/super-admin/login";
  CLIENT_LOGIN: string = "client/login";
  
  CREATE_GYM: string = "api/super-admin/insertgym";
  UPDATE_GYM: string = "api/super-admin/updategym";
  CREATE_USER: string = "api/super-admin/insertuser";
  UPDATE_USER: string = "api/super-admin/updateuser";



  // Method GET

  GET_GYM_LIST:string="api/super-admin/get-gymlist"
  GET_USER_LIST:string="api/super-admin/get-userlist"

  GET_INDIAN_CITIES_LIST:string="api/admincommon/india-cities"
  GET_INDIAN_STATES_DIST_LIST:string="api/admincommon/states-districts"

  GET_REFRESH_TOKENS:string="client/refresh-token"







 

}