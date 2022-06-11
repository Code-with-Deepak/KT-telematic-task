import React from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
class Logout extends React.Component{
    render(){
    cookies.remove('token');
    cookies.remove('userName');
    window.location.replace('employee/login');
    return(
        <div></div>
    )
    }
}

export default Logout;