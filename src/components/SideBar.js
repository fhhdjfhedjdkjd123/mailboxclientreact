import React,{useEffect} from 'react';
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import { InboxActions } from "../ReduxStore/InboxReducer";
import classes from './SideBar.module.css';
const SideBar=()=>{
    const dispatch=useDispatch();
    const unread=useSelector(state=>state.inboxReducer.unread);
    const getRequest=useSelector(state=>state.inboxReducer.getReq);
    //const [render, setRender]=useState(true);

    let url='https://mailboxclient-2de1d-default-rtdb.firebaseio.com/';
    const email = localStorage.getItem("email").replace(/['@','.']/g, "");

    const getData = async () => {
        try {
        const response = await fetch(`${url}/Inbox/${email}.json`);
        const data = await response.json();
        let arrayOfData = [];
        for (let key in data) {
            arrayOfData.unshift({ id: key, ...data[key] });
        }
        dispatch(InboxActions.changeInbox(arrayOfData));
        let count=0;
        arrayOfData.forEach((msg)=>{
            if(msg.read===false){
            count++;
            }
        })
        dispatch(InboxActions.updateUnread(count))
        } catch (error) {
        console.log(error);
        }
        };
    useEffect(() => {
        getData();
    }, [getRequest]);



    return(
        <div className={classes.container}>
            <h1>All Mails</h1>
            <div className={classes.button}>
                <Link to='/'><Button variant="success" style={{marginTop:'20px', width:'130px'}}>Compose Mail</Button></Link>
                <Link to='/Inbox'><Button variant="success" style={{marginTop:'20px', width:'130px'}}>Inbox Mail</Button><span>{unread}</span></Link>
            </div>
        </div>
    )
};

export default SideBar;