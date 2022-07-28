import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Skeleton , {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

import {GetChapiter,GetChapiters, GetChapiterItem} from '../service/ChapiterService';
import {findIdChapiter, formatDate, RemoveWhiteSpace, msToTime} from '../helpers/helper';

import courseIcon from '../data/course-18.png'
const Empty = "This is an empty description as there is no decription in the db, this will be replaced if the decription for this item is available in db."

const LabsBoxes = ({labs , ChapiterName}) => {
    return(
    <div className="ch_card-content">
        <div className="ch_card_lab getstarted">
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
        </div>
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
    const [isLoading, setIsLoading] = useState(true)
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        async function fetchChapiter(){
            try{
                let res = await GetChapiter(findIdChapiter(ChapiterName, chapiters));
                if(res.ok){
                    let data = await res.json();
                    setChapiter(data);
                }
                else{
                    let err = await res.json();
                    throw err[0].message;
                }
            }
            catch (err){
                console.log(err);
                // toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 6000 });
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
                let res = await GetChapiterItem(findIdChapiter(ChapiterName, chapiters));
                if(res.ok){
                    let data = await res.json();
                    setLabs(data);
                    setIsLoading(false);
                }
                else{
                    let err = await res.json();
                    throw err[0].message
                }
            }
            catch (err){
                console.log(err);
                // toast.current.show({ severity: 'error', summary: 'Failed', detail: err, life: 6000 });
            };
        }
        !chapiters.length && fetchChapiters();
        chapiters.length && fetchData(ChapiterName);
        chapiters.length && fetchChapiter(ChapiterName)


    }, [isLoading, loaded]) 

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
            <div className="col-md-4 d-flex justify-content-center">
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
                [1,2,3,4,5,6].map((item) => {
                    return(
                        <div className="ch_card-content" key={item+1}>
                            <SkeletonTheme baseColor="#202020" highlightColor="#444" >
                            <div className="ch_card">
                                <div className="ch_card-info">
                                    <div className="ch_card_title my-3">
                                        <Skeleton/>
                                    </div>
                                    <Skeleton count={3} height={25}/>
                                </div>
                                <div className="ch_card_body">
                                    <Skeleton/>
                                </div>
                                <div className="ch_card-footer">
                                    <span className="mx-2"><Skeleton/></span>
                                </div>
                            </div>
                            </SkeletonTheme>
                        </div>
                    )
                })
            }
        </div>
        </main>
    )
}

export default Labs;
