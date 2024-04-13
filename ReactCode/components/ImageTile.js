import { getStorage, ref, getDownloadURL  } from "firebase/storage";
import { ShowModal } from "./ShowModal";
import { useRef, useEffect, useState, useMemo, Fragment } from 'react';
import { UserDataContext, UserContext, AppDataContext } from './ContextStuff';
import { useContext } from "react";

export function ImageTile(props) {
    const { show, imageHeight } = props;  

    const appData = useContext(AppDataContext);

    const reference = useRef(null);

    const [loading, setLoading] = useState(true);

    const [url, setUrl] = useState(null);
    const [gUrl, setGUrl] = useState(null);

    const isVisible = useOnScreen(reference, show);

    const screenWidth = window.innerWidth;
    const isMobile = screenWidth < 768;

    const  getUrl = () => {
        // console.log('getting url');
        setLoading(false);
        if(appData[show]){
            const imageName = appData[show]['img'];
            let size = '_med';
            if(isMobile){
                size = '_small'
            }
            const imgGsUrl = `gs://anime-way-yeye/images/${imageName}${size}.jpg`;

            if(imgGsUrl == gUrl){
                return;
            }
            const storage = getStorage();
            getDownloadURL(ref(storage, imgGsUrl))
            .then((url) => {
                setUrl(url);
                // console.log('show: ', show, ' url: ', url);
                setGUrl(imgGsUrl);
            })
            .catch((error)=>{
                // console.log('error');
            });
        }
    }

    if(isVisible && loading){
        getUrl();
    }

    let ratioString = 'medRatio';
    if(isMobile){
        ratioString = 'smallRatio'
    }

    let imgRatio = 2;
    if(appData && appData[show] && appData[show]['smallRatio']){
        imgRatio = appData[show]['smallRatio'];
    }

    useEffect(()=>{
        if(isVisible){
            getUrl();
        }
    }, [show]);


    return(
        <ShowModal show={show} url={url}>
            <div 
                ref={reference} 
                className={`${!isVisible || loading ? 'image-card-placeholder d-inline-block': 'd-inline-block' }`}
                style={{minHeight: imageHeight + 'px',
                    minWidth: `${!isVisible || loading ? imageHeight * (imgRatio) + 'px' : ''}`,
                    }}>
                <div>
                    {(!isVisible || loading) ? appData && appData[show] && appData[show]['capital'] :
                        <div style={{position: 'relative'}}>
                            <img className='image-card' src={url} style={{height: `${imageHeight}px`,
                            minWidth: `${imageHeight * (imgRatio) + 'px'}`}}
                            alt={appData[show]['capital']} />
                            <div className="image-card-title" style={{position: 'absolute', bottom: '10px', left: '16px', overflow: 'hidden', width: 'calc(100% - 40px)'}}>
                                {appData[show]['capital']}
                            </div>
                        </div> }
                </div>
                <div className="text-start">
                    {appData && appData[show] && appData[show]['score'] > 0 ?
                        <span>
                        <img className='mal-icon mx-2' src={'/malIcon.png'} alt="mal icon" />
                        {appData[show]['score']}
                        </span>:
                        <img className='mal-icon mx-2' src={'/malIcon.png'} alt="mal icon" style={{opacity: '0'}}/>
                        }
                </div>

            </div>
            
        </ShowModal>
    );
}


export function useOnScreen(ref) {

    const [isIntersecting, setIntersecting] = useState(false)

    const callBack = (entries) => {
        const [entry] = entries;
        setIntersecting(entry.isIntersecting);
        if(entry.isIntersecting){
            observer.disconnect();
        }
    }
  
    const observer = useMemo(() => new IntersectionObserver(callBack), [ref])
  
  
    useEffect(() => {
        if(ref.current){
            observer.observe(ref.current)
        }
    }, [])
  
    return isIntersecting
  }