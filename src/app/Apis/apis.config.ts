import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})



export class ApisConfig{


  API_LOCAL_URL:string="http://localhost:3400/"
  API_SERVER_URL:string=""

  // Method POST
  ADMIN_LOGIN: string = "admin/login";
  CLIENT_LOGIN: string = "client/login";
  
  CREATE_GYM: string = "admin/insertgym";
  UPDATE_GYM: string = "admin/updategym";
  CREATE_USER: string = "admin/insertuser";
  UPDATE_USER: string = "admin/updateuser";



  // Method GET

  GET_GYM_LIST:string="admin/get-gymlist"
  GET_USER_LIST:string="admin/get-userlist"

  GET_INDIAN_CITIES_LIST:string="common/india-cities"
  GET_INDIAN_STATES_DIST_LIST:string="common/states-districts"

  GET_REFRESH_TOKENS:string="client/refresh-token"







 

}