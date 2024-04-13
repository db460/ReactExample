import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { MyNavbar } from "./MyNavbar";
import { auth , googleProvider} from "./Firebase";
import { signOut, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom'
import { SEO } from './SEO';

export const VerifyEmail = (props) => {
    const navigate = useNavigate();  

    const goLogin = () => {
        navigate("/login");
    }

    if(auth.currentUser !== null && auth.currentUser !== undefined){
        sendEmailVerification(auth.currentUser);
        signOut(auth);
    }
    
    const seo = (<SEO
        title='Verify Email'
        description='Verify you email to activate your AnimeWay Account.'
        name='AnimeWay'
        type='website'
     />)

    return(
        <Container className='mw-100 container-fluid d-flex flex-column' style={{height: "100vh"}}>
            {seo}
            <MyNavbar/>
            <div style={{flex: 1, justifyContent: "center", alignItems: "center"}} className="d-flex row">
                <div className="col-lg-6 mx-auto px-sm-5">
                    <span></span>
                    <h3>A verification email has been sent. Please check your email and verify your account.</h3>
                    <Button type="button" onClick={goLogin}>Re-Login</Button>
                </div>
            </div>
        </Container>
    );
}