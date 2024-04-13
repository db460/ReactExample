import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MyNavbar } from './MyNavbar';
import { useEffect, useState, useRef, useMemo } from 'react';
import './homestyle.css';

import { ShowRow } from './ShowRow';
import { ShowModal } from './ShowModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faGem, faFire } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react';
import { AppDataContext, SelectedNetworksContext, UpdateSelectedNetworksContext } from './ContextStuff';
import { SEO } from "./SEO";



export const Home = (props) => {
    const [mapString, setMapString] = useState('main');

    const screenWidth = window.innerWidth;
    const isMobile = screenWidth < 768;
    const mobileShowLimit = 15;
    const mobileGenreLimit = 15;

    const showlimit = 40;

    
    const availableMaps = ['main','gem','pop'];
    const mapsToIcon = {'main': faHome, 'gem': faGem, 'pop': faFire};

    const appData = useContext(AppDataContext);

    const selectedNetworks = useContext(SelectedNetworksContext);
    const updateSelectedNetworks = useContext(UpdateSelectedNetworksContext);


    const availablePlatforms = ['netflix', 'funimation', 'hulu', 'crunchroll'];    

    const networkMap = {'netflix': '/netflixIcon.png', 'funimation': '/funimationIcon.png', 'hulu': '/huluIcon.jpg', 'crunchroll': '/crunchyrollIcon.png'};

    
    
    const getSelectedMap = () => {
        // console.log('get main home');
        let tempMain = {}
        if(appData){
            tempMain = {...shuffleShows(appData['genres']['home'], appData)}
        }
        return tempMain;
    }
    // console.log('home render');

    // const mainMap = tempMain;
    // const gemMap = {...shuffleShows(appData['genres']['gems'], appData)};
    // const popMap = {...shuffleShows(appData['genres']['popular'], appData)};
    const selectedMap = useMemo(getSelectedMap, [appData]);
    // console.log('userData: ', userData);
    // todo: fix this here...
    
    

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    
    
    function shuffleShows(genreData, data){
        let genres = [];
        for(var element in genreData){
            genres.push(element);
        }
        genres = shuffleArray(genres);
        let outData = {};
        for(let indx = 0; indx < genres.length; indx ++){
            let genre = genres[indx];
            let shows = genreData[genre];
            let outShows = [];
            let tempShows = [];

            if (shows.length > 15) {
                outShows = shows.slice(0, 15);
                outShows = shuffleArray(outShows);
                outShows.push.apply(outShows, shows.slice(15, shows.length));
            } else {
                outShows = shuffleArray(shows);
            }

            
            for (let indx = 0; indx < outShows.length; indx++) {
                let contains = false;
                for (let platIndx = 0; platIndx < availablePlatforms.length; platIndx++) {
                    if(outShows[indx] == 'newShows'){
                        contains = true;
                        break;
                    }
                    if (data[outShows[indx]]['platforms'].includes(availablePlatforms[platIndx])) { 
                    contains = true;
                    break;
                    }
                }
                if (contains) {
                    tempShows.push(outShows[indx]);
                }
            }
            outData[genre] = tempShows;
        }
        return(outData);
    }

    
    const platformSelected = (platform) => {
        let temp = structuredClone(selectedNetworks);
        if(temp.includes(platform)){
            let indx = temp.indexOf(platform);
            temp.splice(indx, 1);
        }else{
            temp.push(platform);
        }

        if(temp.length === 0){
            temp = availablePlatforms;
        }
        
        updateSelectedNetworks(temp);
    }

    // const genreSelected = (genre) => {
    //     if(mapString == genre){
    //         return;
    //     }

    //     if(genre == 'main'){
    //         setMapString('main');
    //         setSelectedMap(mainMap);
    //     }else if(genre == 'pop'){
    //         setMapString('pop');
    //         setSelectedMap(popMap);
    //     }else if(genre == 'gem'){
    //         setMapString('gem');
    //         setSelectedMap(gemMap);
    //     }
    // }

    const seo = (<SEO
        title='AnimeWay'
        description='AnimeWay is your guide to watching anime. Find what anime is available to you on Hulu, Netflix, Crunchyroll, and Funimation.'
        name='AnimeWay'
        type='website'
     />);

    if(!appData){
        return(<div>{seo}Loading...</div>);
    }
    return (
        <Container className='mw-100' style={{flex: 1}}>
            {seo}
            <MyNavbar/>
            <Row style={{minHeight: 100}}>
                <Col lg={1} className='d-none d-lg-block'></Col>
                <Col lg={10}> 
                    <Row>
                        <div>
                            {availablePlatforms.map((platform, i) => {
                                return(
                                    <img onClick={()=>{platformSelected(platform)}} key={i} 
                                        className={`show-icon ${selectedNetworks.includes(platform) ? '' : 'not-selected'}`} 
                                        src={networkMap[platform]} alt={`${platform} network`} />
                                )
                            })}
                        </div>
                    </Row>
                    {appData.newShows && appData.newShows.length > 0 && 
                    <ShowRow key={'New Episodes'} genre={'New Episodes'} shows={appData.newShows}/>}
                    {selectedMap && Object.keys(selectedMap).map((genre, i) => {
                        if(isMobile && i > mobileGenreLimit){
                            return(<></>);
                        }
                        let filteredShows = [];
                        for(let indx = 0; indx < selectedMap[genre].length; indx ++){
                            for(let platIndx = 0; platIndx < selectedNetworks.length; platIndx ++){
                                
                                if(appData && appData[selectedMap[genre][indx]]['platforms'].includes(selectedNetworks[platIndx])){
                                    filteredShows.push(selectedMap[genre][indx]);
                                    break;
                                }
                            }
                            if((isMobile && filteredShows.length > mobileShowLimit) || filteredShows.length > showlimit){
                                break;
                            }
                        }
                        if(filteredShows.length !== 0){
                            return(<ShowRow key={genre} genre={genre} shows={filteredShows}/>);
                        }
                    })}
                </Col>
                <Col lg={1} className='d-none d-lg-block'></Col>
            </Row>
        </Container>
    );
}

