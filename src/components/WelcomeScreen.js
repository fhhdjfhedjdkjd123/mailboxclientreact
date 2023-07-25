import classes from './WelcomeScreen.module.css';

const WelcomeScreen=()=>{
    return(
        <div>
            <div className={classes.welcomemsg}>Welcome to your Mail Box </div>
            <div className={classes.line}></div>
        </div>
    )
};
export default WelcomeScreen;