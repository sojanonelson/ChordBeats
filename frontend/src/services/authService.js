import axios from 'axios'
import { ApiConstants } from '../constants'

const login= async(userData)=>{
      console.log("Login in progress")
    try{

        const response = await axios.post(ApiConstants.LOGIN, userData)
        console.log("Login response:", response.data)
        return response.data

    }catch(err){
        console.log(err)
        console.log("Login failed:", err)
    }

}

const signup = async (userData)=>{
    try{
        console.log("UserData from service:", userData)
        const response = await axios.post(ApiConstants.REGISTER, userData)
        console.log("Register response:", response.data)
        return response.data
    }catch(err){
        console.log(err)
        console.log("Register failed:", err)
        
    }
}


export   {login,signup}