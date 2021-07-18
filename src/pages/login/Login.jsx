import "./login.css";
import React,{useState} from 'react';
import UserAPI from '../../API/UserAPI';
import { useRecoilState, useRecoilValue } from 'recoil';
import UserData from '../../configData/UserData';
import { Redirect } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { CircularProgress } from "@material-ui/core";
import ErrorLogin from "../../configData/ErrorLogin";

export default function Login() {
  const user=useRecoilValue(UserData)
  const [errorLogin,setErrorLogin]=useRecoilState(ErrorLogin)
  const [state, setstate] = useState({
      email:'',
      password:''
  });
  const[eror,setEror]=useState(false)
  const [isFetching,setIsFetching]=useState(false)


    const {login}=UserAPI()
  
    const onChangeInput=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setstate({...state,[name]:value})
        setErrorLogin('')
    }
    const onSubmitHandle=(e)=>{
        e.preventDefault();
        setIsFetching(true)
        login(state)
        setIsFetching(false)
    }
    if(user.user) return <Redirect to='/'/>
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">GocHocTap</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on GocHocTap.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={onSubmitHandle}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              onChange={onChangeInput}
              value={state.email}
              name='email'
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              onChange={onChangeInput}
              value={state.password}
              name='password'
            />
            {errorLogin?<span>{errorLogin}</span>:null}
            <button className="loginButton" type="submit" disabled={isFetching}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}
            </button>
            <Link to='/forgot'><span className="loginForgot">Forgot Password?</span></Link>
            <Link to='/register'>
            <button className="loginRegisterButton">
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button></Link>
          </form>
        </div>
      </div>
    </div>
  );
}
