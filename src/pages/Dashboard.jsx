import React, {useEffect, useState} from 'react';
import Search from '../components/Search';
import {GetLatestChapiters, GetLatestLabs, GetSuggestedCourses} from '../service/LatestService';
import {RemoveWhiteSpace, msToTime, DateToString} from '../helpers/helper';
import { useAuthContext } from '../hooks/useAuthContext'
import '../css/Home.css';
import {Navigate} from 'react-router-dom';


const url = "https://lablib-api.herokuapp.com/api/v1/image"
const Dashboard = () => {
    const [suggestedCourses, setSuggestedCourses] = useState([]);
    const [lastesChapiters, setLatestChapiters] = useState([]);
    const [lastesLabs, setLatestLabs] = useState([]);
    const [isLoadingChapters, setIsLoadingChapters] = useState(true);
    const [isLoadingLabs, setIsLoadingLabs] = useState(true);
    const [isLoadingSuggested, setIsLoadingSuggested] = useState(true);
    const { user } = useAuthContext();

    useEffect(() => {

        $(document).ready(function () {
            let silder = $(".owl-carousel");
            silder.owlCarousel({
                autoplay: true,
                autoplayTimeout: 6000,
                autoplayHoverPause: false,
                items: 1,
                stagePadding: 40,
                center: true,
                nav: false,
                margin: 50,
                dots: true,
                loop: true,
                responsive: {
                    0: { items: 1 },
                    480: { items: 1 },
                    575: { items: 1 },
                    768: { items: 2 },
                    991: { items: 3 },
                    1200: { items: 3 }
                }
            });
        });
        
        //getting the suggested courses
        async function fetchSuggestedCourses(){
            try{
                if(user){
                    let res = await GetSuggestedCourses(user.token);
                    if(res.ok){
                        let data = await res.json();
                        setSuggestedCourses(data);
                        setIsLoadingSuggested(false);
                    }
                    else{
                        let err = await res.json();
                        setIsLoadingSuggested(false);
                        throw err[0].message;
                    }
                }
                else{
                    throw 'Not Logged In'
                }
            }
            catch (err){
                console.warn(err);
                if(err == 'Not Logged In'){
                    return <Navigate to="/login" replace/>
                }
            };
        }

        fetchSuggestedCourses();

        // getting the latest chapiters
        async function fetchLatestChapters(){
            try{
                let res = await GetLatestChapiters();
                if(res.ok){
                    let data = await res.json();
                    setLatestChapiters(data);
                    setIsLoadingChapters(false);
                }
                else{
                    let err = await res.json();
                    setIsLoadingChapters(false);
                    throw err[0].message;
                }
            }
            catch (err){
                console.log(err);
            };
        }
        fetchLatestChapters();
        //getting the latest labs
        async function fetchLatestLabs(){
            try{
                let res = await GetLatestLabs();
                if(res.ok){
                    let data = await res.json();
                    setLatestLabs(data);
                    setIsLoadingLabs(false);
                }
                else{
                    let err = await res.json();
                    setIsLoadingLabs(false);
                    throw err[0].message;
                }
            }
            catch (err){
                console.log(err);
            };
        }

        fetchLatestLabs();

        
    }, [isLoadingLabs, isLoadingChapters])
    return(
        <main>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item" aria-current="page"><i className="icon-home mr-2"></i>Accueil</li>
                </ol>
            </nav>
            <div className="d-flex justify-content-center my-3 search_container">
                <Search />
            </div>
            
            <div className={suggestedCourses.length ? "container mt-5" : "container"}>
                { suggestedCourses.length ?
                    <>  
                        <h2 className="der_h2"><i className="fa fa-star text-info"></i> Recommandation</h2>
                        <hr />
                    </>
                    :
                    null
                }
                {
                    isLoadingSuggested ? 
                    <div className='d-flex justify-content-center align-items-center' style={{height: "100vh"}}>
                        <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                    :
                    <div className="owl-carousel owl-theme mt-5">
                        {
                            suggestedCourses.length ?
                            suggestedCourses.map(item => {
                                return(
                                    <div className="owl-item">
                                        <div className="card">
                                            <div className="card_header">
                                                <span>Découvrez de nouveaux cours</span>
                                                <hr />
                                            </div>
                                            <div className="d-flex justify-content-center img-card">
                                                <img src={`${url}/${item.image}`} alt="image-chapiter"/>
                                            </div>
                                            <div className="home_card_title">
                                                <h3><a href={`/categories/${RemoveWhiteSpace(item.category)}/cours/${RemoveWhiteSpace(item.$course)}/chapiter/${RemoveWhiteSpace(item.name)}`}>{item.name}</a></h3>
                                            </div>
                                            <div className="testimonial my-2">
                                                {item.description}
                                            </div>
                                            <div className="home_card_body">
                                                <span className="course_name mr-1"><i className="icon-folder-open"></i>{item.$course}</span>
                                                <a href={`/categories/${RemoveWhiteSpace(item.category)}/cours/${RemoveWhiteSpace(item.$course)}/chapiter/${RemoveWhiteSpace(item.name)}`} className="btn border-dark ch_btn">Commencer</a>
                                            </div>
                                            <div className="name">
                                                <cite>{DateToString(item.createdAt)}</cite>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) 
                            :
                            null
                        }
                    </div>
                }
            </div>

            <div className="container mt-5">
                <h2 className="der_h2">Derniers <span className="derniers">Chapitres</span></h2>
                <hr />

                {
                    isLoadingChapters ? 
                    <div className="d-flex justify-content-center">Loading Chapiters...</div>
                    :
                    <div className="owl-carousel owl-theme mt-5">
                        {
                            lastesChapiters.length ?
                            lastesChapiters.map(item => {
                                return(
                                    <div className="owl-item" key={item.id}>
                                        <div className="card">
                                            <div className="card_header">
                                                <span>Chapiter</span>
                                                <hr />
                                            </div>
                                            <div className="d-flex justify-content-center img-card">
                                                <img src={`${url}/${item.image}`} alt="image-chapiter"/>
                                            </div>
                                            <div className="home_card_title">
                                                <h3><a href={`/categories/${RemoveWhiteSpace(item.category)}/cours/${RemoveWhiteSpace(item.$course)}/chapiter/${RemoveWhiteSpace(item.name)}`}>{item.name}</a></h3>
                                            </div>
                                            <div className="testimonial my-2">
                                                {item.description}
                                            </div>
                                            <div className="home_card_body">
                                                <span className="course_name mr-1"><i className="icon-folder-open"></i>{item.$course}</span>
                                                <a href={`/categories/${RemoveWhiteSpace(item.category)}/cours/${RemoveWhiteSpace(item.$course)}/chapiter/${RemoveWhiteSpace(item.name)}`} className="btn border-dark ch_btn">Commencer</a>
                                            </div>
                                            <div className="name">
                                                <cite>{DateToString(item.createdAt)}</cite>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }) 
                            :
                            null
                        }
                    </div>
                }
            </div>

            <div className="container mt-5">
                <h2 className="der_h2">Derniers<span className="derniers">Labs</span></h2>
                <hr/>
                {
                    isLoadingLabs ?
                    <div className="d-flex justify-content-center">Loading Labs...</div>
                    :
                    <div className="owl-carousel owl-theme mt-5">
                        {
                            lastesLabs.length ?
                            lastesLabs.map(item => {
                                return(
                                    <div className="owl-item" key={item.id}>
                                        <div className="card">
                                            <div className="card_header">
                                                <span>Lab</span>
                                                <hr/>
                                            </div>
                                            <div className="home_card_title">
                                                <h3>
                                                    <a href={`/categories/${RemoveWhiteSpace(item.$category)}/cours/${RemoveWhiteSpace(item.$course)}/chapiter/${RemoveWhiteSpace(item.$chapter)}/Lab/${item.name}`}>
                                                        {item.name}
                                                    </a>
                                                </h3>
                                            </div>
                                            <div className="lab_duration my-2">
                                                <span><i className="icon-clock-o mr-1"></i> {msToTime(item.duration)}</span>
                                            </div>
                                            <div className="testimonial my-2">
                                                {item.description}
                                            </div>
                                            <div className="ch_card_body">
                                                <a href={`/categories/${RemoveWhiteSpace(item.$category)}/cours/${RemoveWhiteSpace(item.$course)}/chapiter/${RemoveWhiteSpace(item.$chapter)}/Lab/${item.name}`} className="btn border-dark ch_btn">Commencer le Lab</a>
                                            </div>
                                            <div className="name">
                                                <cite>{DateToString(item.createdAt)}</cite>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                            :
                            null
                        }
                    </div>
                }
            </div>
        </main>
    )
}

export default Dashboard;