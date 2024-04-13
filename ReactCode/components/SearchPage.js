import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { MyNavbar } from './MyNavbar';
import './homestyle.css';
import { useParams, useSearchParams } from "react-router-dom";
import { ImageTile } from "./ImageTile";
import { useEffect, useMemo, useState } from 'react';
import stringSimilarity from 'string-similarity';
import { useContext } from 'react';
import { UserDataContext, UserContext, AppDataContext } from './ContextStuff';



import { SEO } from './SEO';

export const SearchPage = (props) => {
    const appData = useContext(AppDataContext);

    let [searchParams, setSearchParams] = useSearchParams();
    const searchShowId = searchParams.get('showId');
    const searchName = searchParams.get('searchName');

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }
    
    const seo = (<SEO
        title='Search AnimeWay'
        description='Search AnimeWay for anime listed on Hulu, Netflix, Crunchyroll, and Funimation.'
        name='AnimeWay'
        type='website'
     />)

    const getShowList = ()=>{
        let tempShows = [];
        let similarStrings = {};
        if(appData){
            let genres = appData['genres']['home'];
            for(let genre in genres){
                if(['Highest Reviewed', 'Popular', 'Best Overall'].includes(genre)){
                    continue;
                }
                if(genres[genre].includes(searchShowId)){
                    for(let showIndx = 0; showIndx < genres[genre].length; showIndx ++){
                        let show = genres[genre][showIndx];
                        if(!tempShows.includes(show) && show in appData && show != searchShowId){
                            tempShows.push(show);
                        }
                    }
                }
                for(let showIndx = 0; showIndx < genres[genre].length; showIndx ++){
                    let show = genres[genre][showIndx];
                    if(searchShowId){
                        if(appData[searchShowId]['capital'] && appData[show]['capital']){
                            similarStrings[show] = stringSimilarity.compareTwoStrings(appData[searchShowId]['capital'], appData[show]['capital']);
                        }
                    }else if(searchName && appData[show]['capital']){
                        similarStrings[show] = stringSimilarity.compareTwoStrings(searchName, appData[show]['capital']);
                    }
                }
            }
        }

        let items = Object.keys(similarStrings).map(function(key) {
            return [key, similarStrings[key]];
        });
        
        // Sort the array based on the second element
        items.sort(function(first, second) {
            return second[1] - first[1];
        });
        let similarIds = [];
        if(searchShowId){
            similarIds.push(searchShowId);
        }
        let similarLimit = Math.min(10, items.length);
        if(tempShows.length == 0){
            similarLimit = Math.min(50, items.length);
        }
        for(let itemIndx = 0; itemIndx < similarLimit; itemIndx ++){
            
            let similarId = items[itemIndx][0];
            if(!similarIds.includes(similarId)){
                similarIds.push(similarId);
                // similarIds = [similarId].concat(similarIds);
            }
        }
        tempShows = shuffleArray(tempShows);
        for(let indx = 0; indx < tempShows.length; indx ++){
            if(!similarIds.includes(tempShows[indx])){
                similarIds.push(tempShows[indx]);
            }
        }

        return similarIds;
    }
    

    const similarShows = useMemo(getShowList, [appData, searchShowId, searchName]);


    return(
        <Container className='mw-100' style={{flex: 1}}>
            {seo}
            <MyNavbar/>
            <Row style={{height: 100}}>
                <Col lg={1} className='d-none d-lg-block'></Col>
                <Col lg={10}> 
                    {appData && 
                    similarShows.map((show, indx) => {
                        return(
                            <span key={show} style={{height: '150px'}}>
                                <ImageTile  show={show} imageHeight={150}/>
                            </span>
                        );
                    })
                    }
                </Col>
                <Col lg={1} className='d-none d-lg-block'></Col>
            </Row>
        </Container>
    )
}