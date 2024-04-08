import axios from 'axios'
import { ApiConstants } from '../constants'


console.log("Login in progress")
console.log("URL:", process.env.REACT_APP_BACKEND_URL)

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
});

const login= async(userData)=>{
   
    
    try{

        const response =  await  axiosInstance.post('/user/login', userData);
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
        const response = await axiosInstance.post('/user/register', userData)
        console.log("Register response:", response.data)
        return response.data
    }catch(err){
        console.log(err)
        console.log("Register failed:", err)
        
    }
}


export   {login,signup}