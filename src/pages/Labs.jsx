import React from 'react';

const Labs = () => {
    return(
        <main>
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><i className="icon-home mr-2"></i><a href="./../../../index.html">Accueil</a></li>
                <li className="breadcrumb-item">
                    <img width="19" src="./../../../assets/images/new/course-18.png" className="mr-2" />
                    <a href="./../../../cours.html">Cours</a>
                </li>
                <li className="breadcrumb-item"><a href="./../../Développement Mobile.html">Développement Mobile</a></li>
                <li className="breadcrumb-item" aria-current="page"><a href="./../kotlin.html">Kotlin</a></li>
                <li className="breadcrumb-item active" aria-current="page">Introduction à Kotlin</li>
            </ol>
        </nav>

        <div className="row ch_header">
            <div className="col-md-8 d-flex justify-content-center p-3 text-light">
                <div className="pl-3">
                    <h2>Introduction à Kotlin</h2>
                    <p>Apprenez des concepts de programmation d'introduction dans Kotlin pour vous préparer à créer des applications Android dans Kotlin.</p>
                </div>
            </div>
            <div className="col-md-4  d-flex justify-content-center">
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
            <div className="ch_card-content" style={{display: "none"}}>
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
                    <div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
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
                        <cite>06 Jun 2022, par Mohamed</cite>
                    </div>
                </div>
                <div className="ch_card_lab">
                    <div className="ch_card-info">
                        <div className="ch_card_title my-3">
                            <h3><a href="https://developer.android.com/codelabs/basic-android-kotlin-compose-first-program?continue=https%3A%2F%2Fdeveloper.android.com%2Fcourses%2Fpathways%2Fandroid-basics-compose-unit-1-pathway-1%23codelab-https%3A%2F%2Fdeveloper.android.com%2Fcodelabs%2Fbasic-android-kotlin-compose-first-program">Votre premier programme en Kotlin</a></h3>
                        </div>
                        <div className="lab_duration my-2">
                            <span><i className="icon-clock-o mr-1"></i> 2 hours 50 minutes</span>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="ch_card_body">
                        <a href="codelabs\index.html" className="btn border-dark ch_btn">Commencer le Lab</a>
                    </div>
                    
                    <div className="ch_card-footer">
                        <cite>06 Jun 2022, par Mohamed</cite>
                    </div>
                </div>
                <div className="ch_card_lab">
                    <div className="ch_card-info">
                        <div className="ch_card_title my-3">
                            <h3><a href="https://developer.android.com/codelabs/basic-android-kotlin-compose-first-program?continue=https%3A%2F%2Fdeveloper.android.com%2Fcourses%2Fpathways%2Fandroid-basics-compose-unit-1-pathway-1%23codelab-https%3A%2F%2Fdeveloper.android.com%2Fcodelabs%2Fbasic-android-kotlin-compose-first-program">Créer et utiliser des variables dans Kotlin</a></h3>
                        </div>
                        <div className="lab_duration my-2">
                            <span><i className="icon-clock-o mr-1"></i> 1 hours 30 minutes</span>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="ch_card_body">
                        <a href="codelabs\index.html" className="btn border-dark ch_btn">Commencer le Lab</a>
                    </div>
                    
                    <div className="ch_card-footer">
                        <cite>06 Jun 2022, par Mohamed</cite>
                    </div>
                </div>
                <div className="ch_card_lab">
                    <div className="ch_card-info">
                        <div className="ch_card_title my-3">
                            <h3><a href="https://developer.android.com/codelabs/basic-android-kotlin-compose-first-program?continue=https%3A%2F%2Fdeveloper.android.com%2Fcourses%2Fpathways%2Fandroid-basics-compose-unit-1-pathway-1%23codelab-https%3A%2F%2Fdeveloper.android.com%2Fcodelabs%2Fbasic-android-kotlin-compose-first-program">Create and use functions in Kotlin</a></h3>
                        </div>
                        <div className="lab_duration my-2">
                            <span><i className="icon-clock-o mr-1"></i> 50 minutes</span>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="ch_card_body">
                        <a href="codelabs\index.html" className="btn border-dark ch_btn">Commencer le Lab</a>
                    </div>
                    
                    <div className="ch_card-footer">
                        <cite>06 Jun 2022, par Mohamed</cite>
                    </div>
                </div>
            </div>
        </div>
    </main>
    )
}

export default Labs;