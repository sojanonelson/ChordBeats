const StorageService ={
    saveToken: (token)=>{
        localStorage.setItem('token',token)
        

    },
    saveUserID: (userid)=>{
        localStorage.setItem('userid',userid)
        

    },

    gettoken:()=>{
        return localStorage.getItem('token')
    },
    getUserID:()=>{
        return localStorage.getItem('userid')
    },
    removeToken:()=>{
         localStorage.removeItem('token')
    },
    removeUserID:()=>{
        localStorage.removeItem('userid')
   }
}

export default StorageService;