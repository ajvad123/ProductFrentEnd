import axios from "axios";

export const commonApi=async(httpReqMethod,url,reqBody,reqheader)=>{

        const reqConfig={
            method:httpReqMethod,
            url,
            data:reqBody,
            headers:reqheader?reqheader:{"Content-Type":"application/json"}

        }

     return    await axios(reqConfig).then((res)=>{return res}).catch((err)=>{return err})
}