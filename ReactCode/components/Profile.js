import Container from 'react-bootstrap/Container';
import { MyNavbar } from "./MyNavbar";
import Button from 'react-bootstrap/Button';
import { auth } from "./Firebase";
import { signOut, sendEmailVerification } from "firebase/auth";
import { useNavigate, redirect } from 'react-router-dom'
import { Login } from "./Login";
import { VerifyEmail } from './VerifyEmail';
import { ImageTile } from './ImageTile';

import { useState, useEffect } from 'react';

import './homestyle.css';
import './profilestyle.css';
import { useContext } from 'react';
import { UserDataContext, UserContext, AppDataContext } from './ContextStuff';
import { SEO } from './SEO';

export const Profile = (props) => {
    const currentUser = useContext(UserContext);
    const userData = useContext(UserDataContext);
    const appData = useContext(AppDataContext);

    const navigate = useNavigate();  

    const logOut = async () => {
        try {
            await signOut(auth);
            navigate("/");
        } catch (err){
        }
    };

    const seo = (<SEO
        title='Profile'
        description='Your profile for AnimeWay where you can track your anime watching progress.'
        name='AnimeWay'
        type='website'
     />)


    if(!currentUser){
        return(
            <Container className='mw-100 container-fluid d-flex flex-column' style={{height: "100vh"}}>
                {seo}
                <MyNavbar/>
                <div style={{flex: 1, justifyContent: "center", alignItems: 'center'}} className="d-flex row">
                    <div className="col-lg-6 mx-auto px-sm-5">
                        <div>
                            You are not currently logged in...
                        </div>
                        <div>
                            <button className='btn btn-info' onClick={()=>{
                                navigate("/login");
                            }}>Login Here</button>
                        </div>
                    </div>
                </div>
            </Container>
        )
    }

    var newShows = [];
    if('newShows' in appData && 'watchedList' in userData){
        for(var indx = 0; indx < userData.watchedList.len; indx ++){
            var show = userData.watchedList[indx];
            if(appData.newShows.includes(show)){
                newShows.push(show);
            }
        }
    }
    

    return (
        <Container className='mw-100 container-fluid d-flex flex-column' style={{height: "100vh"}}>
            {seo}
            <MyNavbar/>
            <div style={{flex: 1, justifyContent: "center"}} className="d-flex row">
                <div className="col-lg-10 mx-auto px-sm-5">
                    <div >
                        <div className='text-start'>
                            <h2>Watch List</h2>
                        </div>
                        <div className='text-center'>
                            {userData?.watchList?.map((show, indx)=>{
                                return(
                                    <ImageTile key={show} show={show} imageHeight={120}/>
                                )
                            })}
                        </div>
                    </div>
                    <div >
                        {newShows && newShows.length > 0 &&
                            <div className='text-start'>
                                <h2>Watched but has new episodes</h2>
                            </div>
                        }
                        <div className='text-center'>
                            {newShows.map((show, indx)=>{
                                return(
                                    <ImageTile key={show} show={show} imageHeight={120}/>
                                )
                            })}
                        </div>
                    </div>
                    <div className='text-start my-4'>
                        <div className='text-start'>
                            <h2>Watched List</h2>
                        </div>
                        <div className='text-center'>
                            {userData?.watchedList?.map((show, indx)=>{
                                return(
                                    <ImageTile key={show} show={show} imageHeight={120}/>
                                )
                            })}
                        </div>
                    </div>
                    <div className='my-3 '>
                        <span>
                            {currentUser?.email}
                            <Button className='mx-3' variant="danger" type="button" onClick={logOut}>
                                Logout
                            </Button>
                        </span>
                    </div>
                    <div className='my-3 '>
                        <Button className='btn btn-info' type='button' onClick={()=>{navigate("/changepassword");}}>Change Password</Button>
                    </div>
                    
                </div>
            </div>
        </Container>
    )
}