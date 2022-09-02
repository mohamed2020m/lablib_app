import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Skeleton , {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

import {GetChapiter,GetChapiters, GetChapiterItem} from '../service/ChapiterService';
import {findIdChapiter, formatDate, RemoveWhiteSpace, msToTime} from '../helpers/helper';
import NoPage from "./nopage";

import img404 from '../data/Img404.png'
import courseIcon from '../data/course-18.png'

const Empty = "This is an empty description as there is no decription in the db, this will be replaced if the decription for this item is available in db."
const url = 'https://lablib-api.herokuapp.com/api/v1/image';

const LabsBoxes = ({labs , ChapiterName}) => {
    console.log("ChapiterName: ", ChapiterName);
    return(
    <div className="ch_card-content">
        {/* <div className="ch_card_lab getstarted">
            <div className="ch_card-info">
                <div className="ch_card_title my-3">
                    <h3><a href="#">Objectifs de Ce Cours</a></h3>
                </div>
                <div className="lab_duration my-2">
                    <span><i className="icon-clock-o mr-1"></i> 1 minutes</span>
                </div>
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            </div>
            <div className="modal fade" id="exampleModalLong" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Objectifs de Ce Cours</h5>
                        <button type="button" className="close ch_btn" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <ol className="px-3">
                            <li>Create and use variables in Kotlin</li>
                            <li>Créer et utiliser des variables dans Kotlin</li>
                            <li>Create and use functions in Kotlin</li>
                        </ol>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn border-dark ch_btn" data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="ch_card_body">
                <a href="kotlin/Introduction à Kotlin.html" className="btn border-dark ch_btn" data-toggle="modal" data-target="#exampleModalLong">voir</a>
            </div>
            
            <div className="ch_card-footer">
                <cite>mardi 19 juillet 2022</cite>
            </div>
        </div> */}
        {labs.length ?
            labs.map((item) => (
                <div className="ch_card_lab" key={item.id}>
                    <div className="ch_card-info">
                        <div className="ch_card_title my-3">
                            <h3><a href={`${ChapiterName}/Lab/${RemoveWhiteSpace(item.name)}`}>{item.name}</a></h3>
                        </div>
                        <div className="lab_duration my-2">
                            <span><i className="icon-clock-o mr-1"></i> {msToTime(item.duration)}</span>
                        </div>
                        <div className="ch_card_description my-3">
                            <p>{item.description || Empty}</p>
                        </div>
                    </div>
                    <div className="ch_card_body">
                        <a href={`${ChapiterName}/Lab/${RemoveWhiteSpace(item.name)}`} className="btn border-dark ch_btn">Commencer le Lab</a>
                    </div>
                    
                    <div className="ch_card-footer">
                        <cite>{formatDate(new Date(item.createdAt))}</cite>
                    </div>
                </div>
            ))
        :
        <div className="flex justify-content-center align-content-center">
            No Labs exist!
        </div>
    }
    </div>
)}


const Labs = () => {
    const {CategoryName, CourseName, ChapiterName} = useParams();
    const [labs, setLabs] = useState([]);
    const [chapiter, setChapiter] = useState([]);
    const [chapiters, setChapiters] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingChapters, setIsLoadingChapters] = useState(true);
    const [loaded, setLoaded] = useState(false);
    const [IsValidURL, setIsValidURL] = useState(true);

    useEffect(() => {
        async function fetchChapiter(){
            try{
                let Chapiter_id = findIdChapiter(ChapiterName, chapiters);
                if(Chapiter_id){
                    let res = await GetChapiter(Chapiter_id);
                    if(res.ok){
                        let data = await res.json();
                        setChapiter(data);
                        setIsLoadingChapters(false);
                    }
                    else{
                        let err = await res.json();
                        throw err[0].message;
                    }
                }
            }
            catch (err){
                console.log(err);
            };
        }

        async function fetchChapiters(){
            try{
                let res = await GetChapiters();
                if(res.ok){
                    let data = await res.json();
                    setChapiters(data);
                    setLoaded(true);
                }
                else{
                    let err = await res.json();
                    setLoaded(false);
                    throw err[0].message;
                }
            }
            catch (err){
                console.log(err);
                // toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 6000 });
            };
        }

        async function fetchData(ChapiterName){
            try{
                let Chapiter_id = findIdChapiter(ChapiterName, chapiters);
                if(Chapiter_id){
                    let res = await GetChapiterItem(Chapiter_id);
                    if(res.ok){
                        let data = await res.json();
                        setLabs(data);
                        setIsLoading(false);
                    }
                    else{
                        let err = await res.json();
                        throw err[0].message
                    }
                    setIsValidURL(true);
                }
                else{
                    setIsValidURL(false);
                }
            }
            catch (err){
                console.log(err);
            };
        }
        !chapiters.length && fetchChapiters();
        chapiters.length && fetchData(ChapiterName);
        chapiters.length && fetchChapiter(ChapiterName)


    }, [isLoading, loaded, IsValidURL]) 


    if(!IsValidURL){
        return <NoPage/>
    }

    return(
        <main>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><i className="icon-home mr-2"></i><a href="/">Accueil</a></li>
                <li className="breadcrumb-item">
                    <img width="19" src={courseIcon} className="mr-2" />
                    <a href="/categories">Cours</a>
                </li>
                <li className="breadcrumb-item"><a href={`/categories/${CategoryName}`}>{CategoryName.toUpperCase()}</a></li>
                <li className="breadcrumb-item" aria-current="page"><a href={`/categories/${CategoryName}/cours/${CourseName}`}>{CourseName.toUpperCase()}</a></li>
                <li className="breadcrumb-item active" aria-current="page">{chapiter.name}</li>
            </ol>
        </nav>
        <div className='ch_header row align-items-center'>
            <div className="col-8 py-3 px-4 text-light">
                <h2>Chapiter: <span className="text-warning">{chapiter.name}</span></h2>
                <p>{chapiter.description || Empty}</p>
            </div>
            <div className="col-4">
                <div className='d-flex justify-content-center'>
                    { chapiter.image ?
                        <img src={`${url}/${chapiter.image}`} width="100" alt="logo" />
                    :
                        <div className="spinner-border text-light" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>    
                    }
                </div>
            </div>
        </div>
        <div className="row border">
            <div className="col-md-12 d-flex justify-content-center border">
                <div className="bg-light d-flex align-items-center justify-content-center" style={{borderRadius:"20%", width:"150px" ,height:"150px"}}>
                    <div className="row ch_progress_bar">
                        <h5>50% complété</h5>
                        <div className="progress">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="ch_container">
            {
                !isLoading ?  
                    <LabsBoxes labs={labs} ChapiterName={ChapiterName}/>
                :
                <div className='d-flex justify-content-center align-items-center' style={{height: "20rem"}}>
                    <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
        </div>
        </main>
    )
}

export default Labs;
