import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import ModalClose from '@mui/joy/ModalClose';
import { useNavigate } from 'react-router-dom'
import { auth } from "./Firebase";
import './homestyle.css';
import './modalStyle.css';


// import Button from '@mui/material/Button';
import Button from 'react-bootstrap/Button';
import Typography from '@mui/material/Typography';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faSubtract } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import { UserDataContext, UserContext, AppDataContext, UpdateUserDataContext } from './ContextStuff';
import { useContext } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: "#3d4450",
//   border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export function ShowModal(props) {

  const { show, url} = props;
  const navigate = useNavigate();  

  const appData = useContext(AppDataContext);
  const userData = useContext(UserDataContext);
  const updateUserData = useContext(UpdateUserDataContext);

  const [isModal, setIsModal] = useState(false);
  const handleClose = () => {setIsModal(false)}

  const networkImageMap = {netflix:'/netflixIcon.png',funimation:'/funimationIcon.png',hulu:'/huluIcon.jpg',crunchroll:'/crunchyrollIcon.png'}
  const networkNameMap = {netflix:'Netflix',funimation:'Funimation',hulu:'Hulu',crunchroll:'Crunchyroll'}
  
  let themesString = null;
  if(appData && appData[show] && 'themes' in appData[show]){
    themesString = appData[show]['themes'].join(', ');
  }
  let genresString = null;
  if(appData && appData[show] && "genres" in appData[show]){
    genresString = appData[show]['genres'].join(', ');
  }

  let hasData = false;
  let tempWatched = false;
  let tempWatchList = false;

  let tempWatchButtonClass = 'btn-success';
  let tempWatchedButtonClass = 'btn-success';


  if(userData){
    hasData = true;
    if(userData['watchList'].includes(`${show}`)){
      tempWatchList = true;
      tempWatchButtonClass = 'btn-warning';
    }else if(userData['watchedList'].includes(`${show}`)){
      tempWatched = true;
      tempWatchedButtonClass = 'btn-warning';
    }
  }

  const watched = tempWatched;
  const watchList = tempWatchList;
  const watchButtonClass = tempWatchButtonClass;
  const watchedButtonClass = tempWatchedButtonClass;

  const watchClick = () => {
    if(auth.currentUser === null || auth.currentUser === undefined){
        navigate("/login");
        return;
    }
    

    let temp = {...userData};
    let showString = `${show}`
    if(watched){
      let showIndx = temp['watchedList'].indexOf(showString);
      temp['watchedList'].splice(showIndx, 1);
      temp['watchList'].push(showString);
      // setIsWatchList(true);
      // setWatchButtonClass('btn-warning');
      // setIsWatched(false);
      // setWatchedButtonClass('btn-success');
    }else if(watchList){
      // setIsWatchList(false);
      // setWatchButtonClass('btn-success');
      let showIndx = temp['watchList'].indexOf(showString);
      temp['watchList'].splice(showIndx, 1);
    }else{
      // setIsWatchList(true);
      // setWatchButtonClass('btn-warning');
      temp['watchList'].push(showString);
    }
    updateUserData({...temp});
  }

  const watchedClick = () => {
    let temp = {...userData};
    let showString = `${show}`
    if(watchList){
      // setIsWatchList(false);
      // setWatchButtonClass('btn-success');
      // setIsWatched(true);
      // setWatchedButtonClass('btn-warning');
      let showIndx = temp['watchList'].indexOf(showString);
      temp['watchList'].splice(showIndx, 1);
      temp['watchedList'].push(showString);
    }else if(watched){
      // setIsWatched(false);
      // setWatchedButtonClass('btn-success');
      let showIndx = temp['watchedList'].indexOf(showString);
      temp['watchedList'].splice(showIndx, 1);
    }else{
      // setIsWatched(true);
      // setWatchedButtonClass('btn-warning');
      temp['watchedList'].push(showString);
    }
    updateUserData({...temp});
  }

  // if(isModal){
  //   console.log('show modal render');
  //   console.log(watchButtonClass);
  //   console.log('userData modal: ', userData);
  // }
  

  if(appData === undefined){
    return(<></>)
  }
  
  const listEpisodeInfo = (info)=>{
    if('episodeInfo' in info){
      // console.log(info['episodeInfo'])
      return(
        <div>
          {Object.keys(info['episodeInfo']).map(function(plat){
            return(
              <div key={plat}>
                <img src={networkImageMap[plat]} className='network-icon' alt={`${plat} icon`}/> {networkNameMap[plat]}
                <div style={{marginLeft: '30px'}}>
                  {Object.keys(info['episodeInfo'][plat]).map(function(infoKey){
                    return(
                      <div key={infoKey}>
                        {infoKey} - {info['episodeInfo'][plat][infoKey]}
                      </div>);
                  })
                  }
                </div>
              </div>
            );
          })}
        </div>
        );
    }
  }

  if(appData[show] === undefined){
    return (<></>);
  }

  return (
    <div className='d-inline-block'>
        <div className='d-inline-block' onClick={()=>{setIsModal(true);}}>
            {props.children}
        </div>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={isModal}
            onClose={handleClose}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
            backdrop: {
                timeout: 500,
            },
            }}
        >
            <Fade in={isModal}>
            <Box sx={style} className='col-lg-6 col-12 modal-box'>
                <ModalClose onClick={handleClose}/>
                {url && <div className='d-flex justify-content-center'><img src={url} className='show-detial-image' alt={appData[show]['capital']}/></div>}
                <h3>{appData && appData[show]['capital']}</h3>
                <div>
                  {appData && appData[show]['score'] && appData[show]['score'] > 0 &&
                    <div className='d-inline-block'>
                      <img src='/malIcon.png' className='rating-icon' alt='mal icon'/>
                      <span className='rating-number'>{appData[show]['score']}</span>
                      <span className='rating-number'>({appData[show]['numReviews']})</span>
                    </div>
                  }
                  {appData && appData[show]['crRating'] &&
                    <span>
                      <img src='/crunchyrollIcon.png' className='rating-icon' alt='crunchyroll icon'/>
                      <span className='rating-number'>{2 * appData[show]['crRating']}</span>
                      <span className='rating-number'>({appData[show]['crRatingCount']})</span>
                    </span>
                  }
                </div>
                <div className='show-desc'> Wiki Description: {appData[show]['desc']} </div>
                {appData[show]['platforms'] && 
                  <div> Available on: {appData[show]['platforms'].map((net, indx)=>{
                    return(
                      <img key={indx} src={networkImageMap[net]} className='network-icon' alt={`${net} icon`}/>
                    )
                  })}</div>
                }
                <div> {appData[show]['episodes']} </div>
                <div> {appData[show]['premiered']} </div>
                {listEpisodeInfo(appData[show])}
                <div className='d-flex justify-content-center my-3'>
                  <button className={`btn ${watchButtonClass} mx-4`} onClick={watchClick}>
                    {watchList ? <FontAwesomeIcon icon={faSubtract}/>:<FontAwesomeIcon icon={faAdd}/>}
                    <span style={{marginLeft: '10px'}}>Watch</span>
                  </button>
                  <button className={`btn ${watchedButtonClass} mx-4`} onClick={watchedClick}>
                    {watched ? <FontAwesomeIcon icon={faSubtract}/>:<FontAwesomeIcon icon={faAdd}/>}
                    <span style={{marginLeft: '10px'}}>Watched</span>
                  </button>
                </div>
                {themesString && <div>Themes: {themesString}</div>}
                {genresString && <div>Genres: {genresString}</div>}
                <div> {appData[show]['matureRating']} </div>
                <div>
                </div>
            </Box>
            </Fade>
        </Modal>
    </div>
  );
}