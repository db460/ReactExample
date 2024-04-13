import ScrollContainer from 'react-indiana-drag-scroll'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleRight, faAngleLeft } from '@fortawesome/free-solid-svg-icons'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ImageTile } from "./ImageTile";

import { useRef, Fragment } from 'react';
import './homestyle.css';


export const ShowRow = (props) => {
    const { genre, shows } = props;
    const scrollRef = useRef(null);

    const handleScrollRecursion = (speedArray) => {
        if(speedArray.length > 0){
            let value = speedArray[0];
            speedArray.splice(0,1);
            setTimeout(function() {   
                scrollRef.current.container.current.scrollLeft += value;
                handleScrollRecursion(speedArray);
            }, 1);

        }
    }

    const handleScroll = (dir) => {
        // console.log(scrollRef.current);
        // scrollRef.current.container.current.scrollTo({
        //     left: 600,
        // });
        let speedArray = [];
        let middle = 15;
        for(let speed = 0; speed < middle * 2; speed ++){
            for(let times = 0; times < 3; times ++){
                speedArray.push(dir * (middle - Math.abs(middle - speed)));
            }
        }
        handleScrollRecursion(speedArray);
    }

    let imageHeight = 150;
    return(
        <Fragment>
            <Row className='genre-row'>
                <Col lg={1} className='d-none d-lg-flex'/>
                <Col lg={10} md={12}>
                    <span className='genre-name'>{genre}</span>
                </Col>
                <Col lg={1} className='d-none d-lg-flex'/>
                
            </Row>
            <Row className='show-row'>
                <Col lg={1} className='d-none d-lg-flex align-items-center justify-content-center angle-button'
                    onClick={()=>{handleScroll(-1)}}>
                    <FontAwesomeIcon className='' icon={faAngleLeft} size='2x'/>
                </Col>
                <Col lg={10} md={12}>
                    <ScrollContainer vertical={false} ref={scrollRef} className="scrolling-wrapper" style={{minHeight: imageHeight + 'px'}}>
                        {shows.map((show, indx) => {
                            // if(indx > 0){
                            //     return(<></>);
                            // }
                            return (
                                <ImageTile key={show} show={show} imageHeight={imageHeight}/>
                            )
                        })}
                    </ScrollContainer>
                </Col>
                <Col lg={1} className='d-none d-lg-flex align-items-center justify-content-center angle-button'
                    onClick={()=>{handleScroll(1)}}>
                    <FontAwesomeIcon className='' icon={faAngleRight} size='2x'/>
                </Col>
            </Row>
        </Fragment>
        
    );
}

