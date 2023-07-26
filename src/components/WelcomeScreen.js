import classes from './WelcomeScreen.module.css';
import ComposeMail from './ComposeMail';

const WelcomeScreen=()=>{
    return(
        <div>
            <div className={classes.welcomemsg}>Welcome to your Mail Box </div>
            <div className={classes.line}></div>
            <ComposeMail/>
        </div>
    )
};
export default WelcomeScreen;