import { EditorState } from "draft-js";
import React,{useState} from 'react';
import { Button } from "react-bootstrap";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import classes from './ComposeMail.module.css';
import SideBar from "./SideBar";


const ComposeMail=()=>{
    const [editorState, setEditorState] = useState(()=> EditorState.createEmpty());
    const [receiver,setReceiver]=useState('');
    const [subject,setSubject]=useState('');

    let url='https://mailboxclient-2de1d-default-rtdb.firebaseio.com/';
    const sender=localStorage.getItem('email').replace(/['@','.']/g,'')
    const sender1=localStorage.getItem('email')
  
    const dataToSentBox=async()=>{
        try {
            const response=await fetch(`${url}/SentBox/${sender}.json`, {
                method:'POST',
                body:JSON.stringify({
                    to:receiver,
                    subject:subject,
                    message:editorState.getCurrentContent().getPlainText()
                }),
                headers:{
                    'Content-Type':'application/json'
                }
                
            })
            const data=await response.json();
            console.log(data);
        } catch (error) {
            alert(error)
        }
      }
      const dataToInbox=async()=>{
        const receiver1=receiver.replace(/['@','.']/g,'')
        try {
            const response=await fetch(`${url}/Inbox/${receiver1}.json`,{
                method:'POST',
                body:JSON.stringify({
                    from:sender1,
                    subject:subject,
                    message:editorState.getCurrentContent().getPlainText(),
                    read:false
                }),
                headers:{
                    'Content-Type':'application/json'
                }
            })
            const data= await response.json();
            console.log(data);
        } catch (error) {
            alert(error)
        }
      }
      
    
    const subjectHandler=(e)=>{
        setSubject(e.target.value);
    }

    const receiverHandler=(e)=>{
        setReceiver(e.target.value);
    }

    const EditorStateChangeHandler=(e)=>{
        setEditorState(e)
    }

    const submitHandler=(e)=>{
        e.preventDefault();
        dataToSentBox();
        dataToInbox();
        setEditorState('');
        setReceiver('');
        setSubject('');
    }
    return(
    <div className={classes.container}>
        <div className={classes.sidebar}>
            <SideBar/>
        </div>
        <div className={classes.parent}>
            <div className={classes.child1}>
              <div>To: </div>
              <input type="email" placeholder="email" value={receiver} onChange={receiverHandler}></input>
            </div>
            <div className={classes.child2}>
              <div>Subject: </div>
              <input type="text" value={subject} onChange={subjectHandler}></input>
            </div>
            <div className={classes.child3}>
              <Editor
                editorState={editorState}
                onEditorStateChange={EditorStateChangeHandler}
              />
            </div>
            <Button type="button" variant="primary" onClick={submitHandler}>Send</Button>
        </div>
    </div>
  
    )
};

export default ComposeMail;