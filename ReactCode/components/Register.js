import { auth , googleProvider} from "./Firebase";
import { signOut, createUserWithEmailAndPassword, sendEmailVerification} from "firebase/auth";
import { useState, useEffect, useContext } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import { MyNavbar } from "./MyNavbar";
import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc';
import { VerifyEmail } from "./VerifyEmail";
import { UserDataContext, UserContext, AppDataContext } from './ContextStuff';
import { SEO } from "./SEO";

export const Register = (props) => {
  const navigate = useNavigate();

  const currentUser = useContext(UserContext);
  

  const [validated, setValidated] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const seo = (<SEO
    title='Register'
    description='Create an account with AnimeWay to track your anime watching progress'
    name='AnimeWay'
    type='website'
 />)

  const createAccount = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/verifyemail");
    } catch (err){
        if(err.code === 'auth/email-already-in-use'){
            setErrorMessage('That account already exists, forgot password?');
        }
        if(err.code === 'auth/weak-password'){
          setErrorMessage('Password is too weak')
        }
        console.log(err);
    }
  };

  

  const handleSubmit = (event) => {
    // event.stopPropagation();
    event.preventDefault();
    setValidated(true);

    

    let form = event.currentTarget;
    // console.log(form);
    if (form.checkValidity() === true) {
        createAccount(event.target[0].value, event.target[1].value); 
    }else{
      setErrorMessage(null);
    }
  }

  if(currentUser !== null){
    if(currentUser.emailVerified){
      return(
        <Container className='mw-100 container-fluid d-flex flex-column' style={{height: "100vh"}}>
          {seo}
          <MyNavbar/>
          <div style={{flex: 1, justifyContent: "center", alignItems: "center"}} className="d-flex row">
            <div className="col-lg-6 mx-auto px-sm-5">
              <span></span>
              <p><b>email:</b> {currentUser.email}</p>
              <p>You are already logged in... why are you navigating here?</p>
            </div>
          </div>
        </Container>
      );
    }else{
      return(
        <VerifyEmail />
      );
    }
  }else{
    return (
      <Container className='mw-100 container-fluid d-flex flex-column' style={{height: "100vh"}}>
        {seo}
        <MyNavbar/>
        <div style={{flex: 1, justifyContent: "center", alignItems: "center"}} className="d-flex row">
          <div className="col-lg-6 mx-auto px-sm-5" style={{maxWidth: "600px"}}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {errorMessage && (<div className="alert alert-danger mt-3">
                {errorMessage}
              </div>)}
              <Form.Group className="mb-1" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required/>
                <Form.Control.Feedback type="invalid">
                  Invalid email
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-2" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required/>
                <Form.Control.Feedback type="invalid">
                  Invalid Password
                </Form.Control.Feedback>
              </Form.Group>
              <Button variant="primary" type="submit">
                Register
              </Button>
              <Link className="px-3" to="/login">Sign-In</Link>
              <Link to="/forgotpassword">Forgot Password?</Link>
            </Form>
          </div>
        </div>
      </Container>
    );
  }
};
