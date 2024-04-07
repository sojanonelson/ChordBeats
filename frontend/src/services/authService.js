import axios from 'axios'
import { ApiConstants } from '../constants'

const login= async(userData)=>{
      console.log("Login in progress")
    try{

        const response = await axios.post(ApiConstants.LOGIN, userData)
        console.log("Login response:", response.data)

    }catch(err){
        console.log(err)
        console.log("Login failed:", err)
    }

}

const register = async (userData)=>{
    try{
        const response = await axios.post(ApiConstants.BACKEND_API.REGISTER, userData)
        console.log("Register response:", response.data)
    }catch(err){
        console.log(err)
        console.log("Register failed:", err)
        
    }
}


export  {login,register}