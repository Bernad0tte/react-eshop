// user context
import React from "react";

const UserContext = React.createContext();

function getUserFromLocalStrorage(){
    return localStorage.getItem('user');
}

function UserProvider({children}){

    const [user,setUser]=React.useState({username:null,token:null});

    const userLogin = user=>{
        setUser(user);
        localStorage.setItem("user",JSON.stringify(user));  
    }

    const userLogout = ()=>{
        setUser({username:null,token:null});
        localStorage.removeItem("user");
    } 

    const [alert,setAlert]=React.useState({show:false,msg:'',type:"success"});

    const showAlert = ({ msg, type = "success" }) => {
        setAlert({ show: true, msg, type });
      };

    const hideAlert = ()=>{
        setAlert({...alert,show:false});
    }

    return (
        <UserContext.Provider value={{user,userLogin,userLogout, alert, showAlert, hideAlert}}>
            {children}
        </UserContext.Provider>)
}

export {UserContext,UserProvider};