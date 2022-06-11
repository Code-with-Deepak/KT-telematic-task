import React from 'react';
import {CardHeader, TextField } from '@mui/material';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert'
import CardContent from '@mui/material/CardContent';
import './mlogin.css';
import axios from 'axios';
import Cookies from 'universal-cookie';
import { Button } from '@mui/material';
const cookies = new Cookies();

const handleFormSubmit = async(username,password) =>{
  const data = {
    username:username,
    password:password
  };
  console.log(data);
  var response = await axios.post("http://localhost:3001/login",data);
  let date = new Date();
  console.log(response);
  date.setTime(date.getTime()+(1000*60*60));
      if(response.data)
      {
        console.log(response);
        if(response.data.token){
        sessionStorage.setItem("token",response.data.token);
        cookies.set("token",response.data.token,{path:'/',expires:date});
        cookies.set("userName",response.data.userName,{path:'/',expires:date});
        window.location.replace("/employee/dashboard");
      }
      else if(response.data.error)
      {
        window.location.replace("/employee?error=inc");
      }

      }
      else
      this.setState({error:"Error in fetch"});
  }

class EmployeeLogin extends React.Component{
  constructor(props){
    super(props)
    this.state={
      error:"",
      username:"",
      password:"",
      isLoggedIn:false,
    }
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  async handleSubmit(e){
    console.log("submitted");
    handleFormSubmit(this.state.username,this.state.password);
    e.preventDefault();
  }
  render(){
    const tokenFound = cookies.get("token");
    const queryParams = new URLSearchParams(window.location.search)
    const error = queryParams.get("error")
    const register = queryParams.get("Register");
    if(tokenFound != null)
    window.location.replace("/merchant/dashboard");
  return(
      <div class="loginForm">
        <center>
          {this.state.error}
        <Card raised={true} sx={{ maxWidth: 500 }}>
          <CardHeader title="Employee Login"/>
          {(error==='login')? <Alert variant="filled" severity="error">
  Session Expired Please Login Again to Continue
</Alert> : <div></div>}
{(error==='inc')? <Alert variant="filled" severity="error">
  Incorrect Username or Password
</Alert> : <div></div>}
{(register==='success')? <Alert variant="filled" severity="success">
  Registeration Success ! Plz Login to Access the Dashboard
</Alert> : <div></div>}
            <CardContent>
              <form onSubmit={this.handleSubmit}>
              <TextField id="outlined-basic" value={this.state.username} onChange={this.onChangeUsername} name="username" label="Username" variant="outlined" /><br></br><br></br>
              <TextField id="outlined-basic" value={this.state.password} onChange={this.onChangePassword} name="password" type="password" label="Password" variant="outlined" /><br></br><br></br>
              <Button onClick={this.handleSubmit} variant='contained' color='success' style={{width:"70%",padding:15}}>Login</Button>
              </form>
            </CardContent>
        </Card>
        </center>
      </div>
    );
  }
}

export default EmployeeLogin;


