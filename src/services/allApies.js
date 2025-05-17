import base_url from "./server_url";
import { commonApi } from "./commonApi";


export const userRegistration=async(data)=>{

    return await commonApi('post',`${base_url}/register`,data,"")
 }

 export const userLogin=async(data)=>{

    return await commonApi('post',`${base_url}/log`,data,"")
 }

 export const addProducts=async(data,header)=>{

    return await commonApi('post',`${base_url}/addproduct`,data,header)
 }

 export const categoryAdding=async(data,header)=>{

   return await commonApi('post',`${base_url}/addcategory`,data,header)
 }

 export const addSubCategoryAPI=async(data,header)=>{

   return await commonApi('post',`${base_url}/addsubcategory`,data,header)
 }

  export const getAlladdProducts=async(header)=>{

    return await commonApi('GET',`${base_url}/allproduct`,"",header)
 }
   export const getAllCategories=async(header)=>{

    return await commonApi('GET',`${base_url}/allcategory`,"",header)
 } 
  export const getAllSubCategories=async(header)=>{

    return await commonApi('GET',`${base_url}/allsubcategory`,"",header)
 }