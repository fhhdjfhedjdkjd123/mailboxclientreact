import React, {useState} from 'react';
import classes from './Authentication.module.css';
import { useDispatch } from 'react-redux';
import { AuthAction } from '../ReduxStore/AuthReducer';




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
        if(password !== confirmPassword){
            return alert("Password doesn't match");
        }
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
            alert("User has successfully signedup");
           dispatch(AuthAction.login());
            localStorage.setItem('email',email);
        }
        catch(error){
            console.log(error);
        }

    }


    const submitHandler=(e)=>{
        e.preventDefault();
        console.log(email,password,confirmPassword);
        auth();
        
    }
    return(
        <div className={classes.parent}>

        <div className={classes.container}>
            <form onSubmit={submitHandler} className={classes.child1}>
                <h1>{login ?'login':'SignUp'}</h1>
                <div className={classes.input}>
                    <input type="email" placeholder='Email' value={email} onChange={emailHandler} required/>
                    <input type="password" placeholder='Password' value={password} onChange={passwordHandler} required/>
                    <input type="password"placeholder='Confirm Password' value={confirmPassword} onChange={confirmPasswordHandler} required/>
                </div>
                <button type="submit" class="btn btn-secondary" >
                   {login ? 'login' : 'signUp'}
                </button>
            </form>
        </div>
        <div className={classes.child2}>
            <button type="button" class="btn btn-secondary" onClick={switchHandler}>
                {login ? 'create account' : 'Have an Account?Login'}
            </button>
            
        </div>
        </div>
        )
};

export default Authentication;