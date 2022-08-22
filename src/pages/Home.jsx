import React, {useEffect, useState} from 'react';
import {GetPopularCourses} from '../service/LatestService';
import WhyToSub from "../components/WhyTosub";
import {RemoveWhiteSpace, msToTime, DateToString} from '../helpers/helper';
import '../css/Home.css';


const url = "https://lablib-api.herokuapp.com/api/v1/image"

const Home = () => {

    const [popularCourses, setPopularCourses] = useState([]);
    const [isLoadingPopularCourses, setLoadingPopularCourses] = useState(true);

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
                nav: true,
                margin: 50,
                dots: false,
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
        // async function fetchSuggestedCourses(){
        //     try{
        //         let res = await GetSuggestedCourses();
        //         if(res.ok){
        //             let data = await res.json();
        //             setSuggestedCourses(data);
        //             setIsLoadingSuggested(false);
        //         }
        //         else{
        //             let err = await res.json();
        //             setIsLoadingSuggested(false);
        //             throw err[0].message;
        //         }
        //     }
        //     catch (err){
        //         console.log(err);
        //     };
        // }

        // fetchSuggestedCourses();

        // getting the latest chapiters
        async function fetchPopularCourse(){
            try{
                let res = await GetPopularCourses();
                if(res.ok){
                    let data = await res.json();
                    setPopularCourses(data);
                    setLoadingPopularCourses(false);
                }
                else{
                    let err = await res.json();
                    setLoadingPopularCourses(false);
                    throw err[0].message;
                }
            }
            catch (err){
                console.log(err);
            };
        }
        fetchPopularCourse();

    }, [isLoadingPopularCourses])
    return(
        <main>
            <div className="container mt-5">
                <h2 className="der_h2">Cours<span className="derniers">Populaires</span></h2>
                <hr />

                {
                    isLoadingPopularCourses ? 
                    <div className="d-flex justify-content-center">Loading Popular Courses...</div>
                    :
                    <div className="owl-carousel owl-theme mt-5">
                        {
                            popularCourses.length ?
                            popularCourses.map(item => {
                                return(
                                    <div className="owl-item" key={item.id}>
                                        <div className="card">
                                            <div className="card_header">
                                                <span>Cours</span>
                                                <hr />
                                            </div>
                                            <div className="d-flex justify-content-center img-card">
                                                <img src={`${url}/${item.image}`} alt="image-chapiter"/>
                                            </div>
                                            <div className="home_card_title">
                                                <h3><a href={`/categories/${RemoveWhiteSpace(item.$category)}/cours/${RemoveWhiteSpace(item.name)}`}>{item.name}</a></h3>
                                            </div>
                                            <div className="testimonial my-2">
                                                {item.description}
                                            </div>
                                            <div className="home_card_body">
                                                <span className="course_name mr-1"><i className="icon-folder-open"></i>{item.$category}</span>
                                                <a href={`/categories/${RemoveWhiteSpace(item.$category)}/cours/${RemoveWhiteSpace(item.name)}`} className="btn border-dark ch_btn">Découvrir</a>
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

            {/* <div className="container mt-5">
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
                                    <div className="owl-item">
                                        <div className="card">
                                            <div className="card_header">
                                                <span>Lab</span>
                                                <hr/>
                                            </div>
                                            <div className="home_card_title">
                                                <h3>
                                                    <a href={`/categories/${RemoveWhiteSpace(item.$category)}/cours/${RemoveWhiteSpace(item.$course)}/chapiter/${RemoveWhiteSpace(item.$chapter)}/labs/${item.name}`}>
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
                                                <a href={`/categories/${RemoveWhiteSpace(item.$category)}/cours/${RemoveWhiteSpace(item.$course)}/chapiter/${RemoveWhiteSpace(item.$chapter)}/labs/${item.name}`} className="btn border-dark ch_btn">Commencer le Lab</a>
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
            </div> */}

            <WhyToSub />
        </main>
    )
}

export default Home;