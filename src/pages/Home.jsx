import React, {useEffect} from 'react';

import '../css/Home.css'
import badge from '../data/badge.svg'
import badge_1 from '../data/badge_1.svg'
import badge_2 from '../data/badge_2.svg'

const Home = () => {

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
    }, [])
    return(
        <main>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item" aria-current="page"><i className="icon-home mr-2"></i>Accueil</li>
                </ol>
            </nav>
            <div className="container mt-5">
                <h2 className="der_h2">Derniers <span className="derniers">Chapitres</span></h2>
                <hr />
                <div className="owl-carousel owl-theme mt-5">
                    <div className="owl-item">
                        <div className="card">
                            <div className="card_header">
                                <span>Chapiter</span>
                                <hr />
                            </div>
                            <div className="img-card">
                                <img src={badge} alt=""/>
                            </div>
                            <div className="home_card_title">
                                <h3><a href="kotlin/Introduction à Kotlin.html">Introduction à Kotlin</a></h3>
                            </div>
                            <div className="testimonial my-2">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita dicta doloremque.
                            </div>
                            <div className="home_card_body">
                                <span className="mr-1"><i className="icon-folder-open"></i>Kotlin</span>
                                <a href="cours/Développement%20Mobile/kotlin/Introduction%20à%20Kotlin.html" className="btn border-dark ch_btn">Commencer</a>
                            </div>
                            <div className="name">
                                <cite>par Mohamed</cite>
                            </div>
                        </div>
                    </div>
                    <div className="owl-item">
                        <div className="card">
                            <div className="card_header">
                                <span>Chapiter</span>
                                <hr/>
                            </div>
                            <div className="img-card">
                                <img src={badge_1} alt=""/>
                            </div>
                            <div className="home_card_title">
                                <h3><a href="kotlin/Introduction à Kotlin.html">Introduction à Kotlin</a></h3>
                            </div>
                            <div className="testimonial my-2">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita dicta doloremque.
                            </div>
                            <div className="home_card_body">
                                <span className="mr-1"><i className="icon-folder-open"></i>Kotlin</span>
                                <a href="cours/Développement%20Mobile/kotlin/Introduction%20à%20Kotlin.html" className="btn border-dark ch_btn">Commencer</a>
                            </div>
                            <div className="name">
                                <cite>par Mohamed</cite>
                            </div>
                        </div>
                    </div>
                    <div className="owl-item">
                        <div className="card">
                            <div className="card_header">
                                <span>Chapiter</span>
                                <hr />
                            </div>
                            <div className="img-card">
                                <img src={badge_2} alt="" />
                            </div>
                            <div className="home_card_title">
                                <h3><a href="kotlin/Introduction à Kotlin.html">Introduction à Kotlin</a></h3>
                            </div>
                            <div className="testimonial my-2">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita dicta doloremque.
                            </div>
                            <div className="home_card_body">
                                <span className="mr-1"><i className="icon-folder-open"></i>Kotlin</span>
                                <a href="cours/Développement%20Mobile/kotlin/Introduction%20à%20Kotlin.html" className="btn border-dark ch_btn">Commencer</a>
                            </div>
                            <div className="name">
                                <cite>par Mohamed</cite>
                            </div>
                        </div>
                    </div>
                    <div className="owl-item">
                        <div className="card">
                            <div className="card_header">
                                <span>Chapiter</span>
                                <hr/>
                            </div>
                            <div className="img-card">
                                <img src={badge} alt=""/>
                            </div>
                            <div className="home_card_title">
                                <h3><a href="kotlin/Introduction à Kotlin.html">Introduction à Kotlin</a></h3>
                            </div>
                            <div className="testimonial my-2">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita dicta doloremque.
                            </div>
                            <div className="home_card_body">
                                <span className="mr-1"><i className="icon-folder-open"></i>Kotlin</span>
                                <a href="cours/Développement%20Mobile/kotlin/Introduction%20à%20Kotlin.html" className="btn border-dark ch_btn">Commencer</a>
                            </div>
                            <div className="name">
                                <cite>par Mohamed</cite>
                            </div>
                        </div>
                    </div>
                    <div className="owl-item">
                        <div className="card">
                            <div className="card_header">
                                <span>Chapiter</span>
                                <hr />
                            </div>
                            <div className="img-card">
                                <img src={badge_1} alt="" />
                            </div>
                            <div className="home_card_title">
                                <h3><a href="kotlin/Introduction à Kotlin.html">Introduction à Kotlin</a></h3>
                            </div>
                            <div className="testimonial my-2">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita dicta doloremque.
                            </div>
                            <div className="home_card_body">
                                <span className="mr-1"><i className="icon-folder-open"></i>Kotlin</span>
                                <a href="cours/Développement%20Mobile/kotlin/Introduction%20à%20Kotlin.html" className="btn border-dark ch_btn">Commencer</a>
                            </div>
                            <div className="name">
                                <cite>par Mohamed</cite>
                            </div>
                        </div>
                    </div>
                    <div className="owl-item">
                        <div className="card">
                            <div className="card_header">
                                <span>Chapiter</span>
                                <hr/>
                            </div>
                            <div className="img-card">
                                <img src={badge_2} alt=""/>
                            </div>
                            <div className="home_card_title">
                                <h3><a href="kotlin/Introduction à Kotlin.html">Introduction à Kotlin</a></h3>
                            </div>
                            <div className="testimonial my-2">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita dicta doloremque.
                            </div>
                            <div className="home_card_body">
                                <span className="mr-1"><i className="icon-folder-open"></i>Kotlin</span>
                                <a href="cours/Développement%20Mobile/kotlin/Introduction%20à%20Kotlin.html" className="btn border-dark ch_btn">Commencer</a>
                            </div>
                            <div className="name">
                                <cite>par Mohamed</cite>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <h2 className="der_h2">Derniers<span className="derniers">Labs</span></h2>
                <hr/>
                <div className="owl-carousel owl-theme mt-5">
                    <div className="owl-item">
                        <div className="card">
                            <div className="card_header">
                                <span>Lab</span>
                                <hr/>
                            </div>
                            <div className="home_card_title">
                                <h3><a href="https://developer.android.com/codelabs/basic-android-kotlin-compose-first-program?continue=https%3A%2F%2Fdeveloper.android.com%2Fcourses%2Fpathways%2Fandroid-basics-compose-unit-1-pathway-1%23codelab-https%3A%2F%2Fdeveloper.android.com%2Fcodelabs%2Fbasic-android-kotlin-compose-first-program">Votre premier programme en Kotlin</a></h3>
                            </div>
                            <div className="lab_duration my-2">
                                <span><i className="icon-clock-o mr-1"></i> 2 hours 50 minutes</span>
                            </div>
                            <div className="testimonial my-2">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita dicta doloremque.
                            </div>
                            <div className="ch_card_body">
                                <a href="kotlin/Introduction à Kotlin.html" className="btn border-dark ch_btn">Commencer le Lab</a>
                            </div>
                            <div className="ch_card-footer">
                                <cite>06 Jun 2022, par Mohamed</cite>
                            </div>
                        </div>
                    </div>
                    <div className="owl-item">
                        <div className="card">
                            <div className="card_header">
                                <span>Lab</span>
                                <hr/>
                            </div>
                            <div className="home_card_title">
                                <h3><a href="https://developer.android.com/codelabs/basic-android-kotlin-compose-first-program?continue=https%3A%2F%2Fdeveloper.android.com%2Fcourses%2Fpathways%2Fandroid-basics-compose-unit-1-pathway-1%23codelab-https%3A%2F%2Fdeveloper.android.com%2Fcodelabs%2Fbasic-android-kotlin-compose-first-program">Votre premier programme en Kotlin</a></h3>
                            </div>
                            <div className="lab_duration my-2">
                                <span><i className="icon-clock-o mr-1"></i>50 minutes</span>
                            </div>
                            <div className="testimonial my-2">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita dicta doloremque.
                            </div>
                            <div className="ch_card_body">
                                <a href="kotlin/Introduction à Kotlin.html" className="btn border-dark ch_btn">Commencer le Lab</a>
                            </div>
                            <div className="ch_card-footer">
                                <cite>06 Jun 2022, par Ali</cite>
                            </div>
                        </div>
                    </div>
                    <div className="owl-item">
                        <div className="card">
                            <div className="card_header">
                                <span>Lab</span>
                                <hr/>
                            </div>
                            <div className="home_card_title">
                                <h3><a href="https://developer.android.com/codelabs/basic-android-kotlin-compose-first-program?continue=https%3A%2F%2Fdeveloper.android.com%2Fcourses%2Fpathways%2Fandroid-basics-compose-unit-1-pathway-1%23codelab-https%3A%2F%2Fdeveloper.android.com%2Fcodelabs%2Fbasic-android-kotlin-compose-first-program">Votre premier programme en Kotlin</a></h3>
                            </div>
                            <div className="lab_duration my-2">
                                <span><i className="icon-clock-o mr-1"></i> 1 hours 30 minutes</span>
                            </div>
                            <div className="testimonial my-2">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus expedita dicta doloremque.
                            </div>
                            <div className="ch_card_body">
                                <a href="kotlin/Introduction à Kotlin.html" className="btn border-dark ch_btn">Commencer le Lab</a>
                            </div>
                            <div className="ch_card-footer">
                                <cite>06 Jun 2022, par Karim</cite>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home;