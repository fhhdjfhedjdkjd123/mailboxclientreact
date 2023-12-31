import React, {useState} from 'react';
import classes from './Authentication.module.css';
import { useDispatch } from 'react-redux';
import { AuthActions } from '../ReduxStore/AuthReducer';
import { Button } from 'react-bootstrap';




const Authentication=()=>{
    const dispatch=useDispatch();

    const [email,setEmail]= useState();
    const [password,setPassword]= useState();
    const [confirmPassword,setConfirmPass]= useState();
    const [login,setLogin]=useState(true);

    const emailHandler=(e)=>{
        setEmail(e.target.value);
    }
    const passwordHandler=(e)=>{
        setPassword(e.target.value);
    }
    const confirmPasswordHandler=(e)=>{
        setConfirmPass(e.target.value);
    }
    const switchHandler=(e)=>{
        setLogin(!login);
    }

    let url;
    const auth=async()=>{
        if(login){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyApRv7NyYpPTQo8HUNBZ8uM6MkMkMlq_Y4';
        }else{
            url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyApRv7NyYpPTQo8HUNBZ8uM6MkMkMlq_Y4';
        }
        try{
            const response = await fetch(url,{
                method:'POST',
                body:JSON.stringify({
                    email:email,
                    password:password,
                    returnSecureToken:true,
                }),
                headers:{
                    'Content-Type':'application/json',
                },
            })
            const data=await response.json();
            console.log(data);
            console.log(response);
            if(!response.ok){
                return alert(data.error.message);
            }
            alert("User has successfully Signed Up");
            dispatch(AuthActions.login());
            localStorage.setItem('email',email);
        }
        catch(error){
            console.log(error);
        }

    }
    const submitHandler=(e)=>{
        e.preventDefault();
        console.log(email,password);
        if(!login){
            if(password !== confirmPassword){
                return alert("Password doesn't match");
            }
        }

        auth(); 
    }
    return(
        <div className={classes.parent}>

        <div className={classes.container}>
            <form onSubmit={submitHandler} className={classes.child1}>
                <h1>{login ?'Login':'SignUp'}</h1>
                <div className={classes.input}>
                    <input type="email" placeholder='Email' value={email} onChange={emailHandler} required/>
                    <input type="password" placeholder='Password' value={password} onChange={passwordHandler} required/>
                    {!login && <input type="password"placeholder='Confirm Password' value={confirmPassword} onChange={confirmPasswordHandler} required/>}
                </div>
                <Button type="submit" variant="primary" style={{marginLeft:"35%",marginTop:"10px"}}>
                   {login ? 'Login' : 'SignUp'}
                </Button>
            </form>
        </div>
        <div className={classes.child2}>
            <Button type="button" variant="secondary" style={{marginTop:"15px"}} onClick={switchHandler}>
                {login ? 'create account' : 'Have an Account?Login'}
            </Button>   
        </div>
        </div>
        )
};

export default Authentication;