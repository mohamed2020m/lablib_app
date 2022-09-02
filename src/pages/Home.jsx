import React, {useEffect, useState} from 'react';
import {GetPopularCourses} from '../service/LatestService';
import {RemoveWhiteSpace, DateToString} from '../helpers/helper';
import '../css/Home.css';
import Phone from '../data/home-screen-samsung.png'
import mobileApp from '../data/en_badge_web_generic.png'

const url = "https://lablib-api.herokuapp.com/api/v1/image"

const Home = () => {

    const [popularCourses, setPopularCourses] = useState([]);
    const [isLoadingPopularCourses, setLoadingPopularCourses] = useState(true);
    const [isError, setError] = useState(false);

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
                console.warn(err);
                setError(true);
            };
        }
        fetchPopularCourse();

    }, [isLoadingPopularCourses, isError])

    return(
        <main>
            <div className='d-flex justify-content-center align-items-center' style={{backgroundColor: 'rgb(24, 10, 105)', borderRadius:'0 0px 25px 25px', height:'80vh'}}>
                <div className=''>
                    <div className="text-white mb_wrap">
                        <div className='mb-3 mb_wrap_desp'>
                            <h3 className='text-warning'>Étudiez et apprenez facilement avec Labs.</h3>
                            <h4>Chez lablib, nous nous efforçons de faire de l'apprentissage un voyage agréable. alors </h4>
                        </div>
                        <div>
                            <a href="/login" className='bg-white text-dark px-3 py-2 join_lablib mt-3'>Rejoignez-nous!</a>
                        </div>
                    </div>
                    <div>
                        {/* <img src={Phone} alt="lablib app"  width='100' height="200"/> */}
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <h2 className="text-center" style={{color:'#0323d6'}}>Cours Populaires</h2>
                {isError ?
                    < div className='d-flex justify-content-center align-items-center'>
                        <div>Oops, Désolé quelque chose de mauvais arrive.</div>
                    </div>
                    :
                    <>
                        {
                            isLoadingPopularCourses ? 
                            <div className='d-flex justify-content-center align-items-center'>
                                <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                            :
                            <div className="owl-carousel owl-theme mt-5">
                                {
                                    popularCourses.length ?
                                    popularCourses.map(item => {
                                        return(
                                            <div className="owl-item" key={item.id}>
                                                <div className="card">
                                                    <div className="card_header">
                                                        <span>Cours Populaire</span>
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
                    </>
                }
            </div>
            
            <div className='row align-items-center' style={{backgroundColor:'#ececec',  marginTop: '20px', padding: '80px 0'}}>
                <div className="col-6 d-flex flex-column align-items-center">   
                    <h4 className='text-center down_desc_mob'>Téléchargez notre application Lablib, elle est disponible pour les appareils Android</h4>
                    <div>
                        <a href="#">
                            <img  src={mobileApp} alt="mobile app" style={{width:'200px', heigth:'100px'}}/>
                        </a>
                    </div>
                </div>
                <div className='col-6 d-flex justify-content-center'>
                    <img className="phone_screenshot" src={Phone} alt="lablib app" width='180' height="350"/>
                </div>
            </div>
        </main>
    )
}

export default Home;