import React,{useEffect} from 'react';
import { useSelector,useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import classes from './Inbox.module.css';
import { InboxActions } from "../ReduxStore/InboxReducer";
import SideBar from './SideBar';


const Inbox=()=>{
    const dispatch=useDispatch();
    const inboxData=useSelector((state)=>state.inboxReducer.inboxData);

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
        } 
        catch (error) {
         console.log(error);
        }
    };
    useEffect(() => {
        getData();
    }, []);


    return(
    <div className={classes.parent}>
        <div className={classes.sidebar}><SideBar/></div>
        <div className={classes.table}>
            <table className="table">
               <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">From </th>
                    <th scope="col">Subject </th>
                    <th scope="col">Message </th>
                    <th scope="col">Delete </th>
                  </tr>
                </thead>
                <tbody>
                    {inboxData.map((item,index)=>{
                        return(
                        <tr key={item.id}>
                            <td scope="row">{index+1} 1</td>
                            <td>{!item.read && <div style={{width:'10px', height:'10px', borderRadius:'100%',backgroundColor:'blue'}}></div>}{item.from} madhu</td>
                            <td>{item.subject} hiii</td>
                            <td><Link to= {`/Inbox/${item.id}`}>Open message</Link></td>
                            <tb><Button>Delete</Button></tb>
                        </tr>

                        )
                    })}
                </tbody>
            </table>
        </div>
    </div>
    )

};

export default Inbox;