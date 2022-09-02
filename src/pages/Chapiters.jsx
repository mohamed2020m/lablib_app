import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import Skeleton , {SkeletonTheme} from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
import { useAuthContext } from '../hooks/useAuthContext'
import {GetCourse, GetCourses, GetCourseItem, JoinCourse} from '../service/CourseService';
import {findIdCourse, RemoveWhiteSpace, formatDate, fun} from '../helpers/helper';

import courseIcon from '../data/course-18.png'
import NoPage from "./nopage";

const url = 'https://lablib-api.herokuapp.com/api/v1/image';
const Empty = "This is an empty description as there is no decription in the db, this will be replaced if the decription for this item is available in db."

const ChapitersBoxes = ({chapiters, CourseName}) => {
    return(
    <div className="ch_card-content" style={{display: "none"}}>
    {chapiters.length ?
    chapiters.map((item) => (
        <div className="ch_card" key={item.id}>
            <div className="ch_card-image">
                { item.image ?
                    <img src={`${url}/${item.image}`} width="100" alt={item.name} />
                :
                    <div className="spinner-border text-light" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>    
                }
            </div>
            {/* <div className="progress_wrapper mx-2 my-3">
                <div className="progress">
                    <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <div className="percentage">50%</div>
            </div> */}
            <div className="ch_card-info">
                <div className="ch_card_title my-3">
                    <h3><a href={`${CourseName}/chapiter/${RemoveWhiteSpace(item.name)}`}>{item.name}</a></h3>
                </div>
                <div className="ch_card_description my-3">
                    <p>{item.description || Empty}</p>
                </div>
            </div>
            <div className="ch_card_body">
                <a href={`${CourseName}/chapiter/${RemoveWhiteSpace(item.name)}`} className="btn border-dark ch_btn">Commencer</a>
            </div>
            
            <div className="ch_card-footer">
                <cite>{formatDate(new Date(item.createdAt))}</cite>
            </div>
        </div>
    ))
    :
    <div className="flex justify-content-center align-content-center">
        No Chapiters exist!
    </div>
    }
    </div>
)}


const Chapitres = () => {
    const {CategoryName, CourseName} = useParams();
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState([]);
    const [chapiters, setChapiters] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [loaded, setLoaded] = useState(false);
    const [IsValidURL, setIsValidURL] = useState(true);
    // const [isJoined, setIsJoine] = useState(false);
    const { user} = useAuthContext();

    useEffect(() => {
        // async function fetchJoinCourse(){
        //     try{
        //         let Course_id = findIdCourse(CourseName, courses);
        //         if(Course_id){
        //             let res = await JoinCourse(Course_id, user.token);
        //             if(res.ok){
        //                 let data = await res.json();
        //                 setIsJoine(true);
        //             }
        //             else{
        //                 let err = await res.json();
        //                 throw err[0].message;
        //             }
        //         }
        //     }
        //     catch (err){
        //         console.log(err);
        //     };
        // }
        
        async function fetchCourse(){
            try{
                let Course_id = findIdCourse(CourseName, courses);
                if(Course_id){
                    let res = await GetCourse(Course_id);
                    if(res.ok){
                        let data = await res.json();
                        setCourse(data);
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

        async function fetchCourses(){
            try{
                let res = await GetCourses();
                if(res.ok){
                    let data = await res.json();
                    setCourses(data);
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
            };
        }

        async function fetchData(CourseName){
            try{
                let Course_id = findIdCourse(CourseName, courses);
                if(Course_id){
                    let res = await GetCourseItem(findIdCourse(CourseName, courses));
                    if(res.ok){
                        let data = await res.json();
                        setChapiters(data);
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

        !courses.length && fetchCourses();
        

        courses.length && fetchData(CourseName);
        fetchCourse(CourseName);

        fun();

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
                <li className="breadcrumb-item active" aria-current="page">{course.name}</li>
            </ol>
        </nav>
        <div className='ch_header row align-items-center'>
            <div className="col-8 py-3 px-4 text-light">
                <h2>Cours: <span className="text-warning">{course.name}</span></h2>
                <p>{course.description || Empty}</p>
            </div>
            <div className="col-4">
                <div className='d-flex justify-content-center'>
                    { course.image ?
                        <img src={`${url}/${course.image}`} width="100" alt="logo" />
                    :
                        <div className="spinner-border text-light" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>    
                    }
                </div>
            </div>
        </div>
        <div className="ch_container">
                {
                    !isLoading ?  
                        <ChapitersBoxes chapiters={chapiters} CourseName={CourseName}/>
                    :
                    <div className='d-flex justify-content-center align-items-center' style={{height: "20rem"}}>
                        <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                }

                {!isLoading && chapiters && chapiters.length > 0 ?
                    <div className="ch_pagination">
                        <li className="ch_page-item ch_previous-page ch_disable"><a className="ch_page-link" href="#">Prev</a></li>
                        <li className="ch_page-item ch_current-page ch_active"><a className="ch_page-link" href="#">1</a></li>
                        <li className="ch_page-item ch_dots"><a className="ch_page-link" href="#">...</a></li>
                        <li className="ch_page-item ch_current-page"><a className="ch_page-link" href="#">5</a></li>
                        <li className="ch_page-item ch_current-page"><a className="ch_page-link" href="#">6</a></li>
                        <li className="ch_page-item ch_dots"><a className="ch_page-link" href="#">...</a></li>
                        <li className="ch_page-item ch_current-page"><a className="ch_page-link" href="#">10</a></li>
                        <li className="ch_page-item ch_next-page"><a className="ch_page-link" href="#">Next</a></li>
                    </div>
                : null}
            </div>
        </main>
    )
}

export default Chapitres;