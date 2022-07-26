import React from 'react'

const Chapitres = () => {
    return(
        <main>
        <nav aria-label="breadcrumb my-0 border-primary">
            <ol className="breadcrumb">
                <li className="breadcrumb-item"><i className="icon-home mr-2"></i><a href="./../../index.html">Accueil</a></li>
                <li className="breadcrumb-item">
                    <img width="19" src="./../../assets/images/new/course-18.png" className="mr-2" />
                    <a href="./../../cours.html">Cours</a>
                </li>
                <li className="breadcrumb-item"><a href="./../Développement Mobile.html">Développement Mobile</a></li>
                <li className="breadcrumb-item active" aria-current="page">Kotlin</li>
            </ol>
        </nav>
        <div className="ch_header">
            <div className="p-3 text-light">
                <h2>Cours: Kotlin</h2>
                <p>Apprenez les bases de la programmation et créez votre première application Android.</p>
            </div>
            <div>
                <img src="./../../assets/images/new/badge.svg" width="150" alt="logo" />
            </div>
        </div>
        <div className="ch_container">
            <div className="ch_card-content" style={{display: "none"}}>
                <div className="ch_card">
                    <div className="ch_card-image"><img src="./../../assets/images/new/badge.svg" width="150" alt="" /></div>
                    <div className="progress_wrapper mx-2 my-3">
                        <div className="progress">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="percentage">50%</div>
                    </div>
                    <div className="ch_card-info">
                        <div className="ch_card_title my-3">
                            <h3><a href="kotlin/Introduction à Kotlin.html">Introduction à Kotlin</a></h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="ch_card_body">
                        <a href="kotlin/Introduction à Kotlin.html" className="btn border-dark ch_btn">Commencer</a>
                    </div>
                    
                    <div className="ch_card-footer">
                        <cite>06 Jun 2022, par Mohamed</cite>
                    </div>
                </div>
                <div className="ch_card">
                    <div className="ch_card-image"><img src="./../../assets/images/new/badge_1.svg" width="150" alt="" /></div>
                    <div className="progress_wrapper mx-2 my-3">
                        <div className="progress">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="percentage">50%</div>
                    </div>
                    <div className="ch_card-info">
                        <div className="ch_card_title my-3">
                            <h3><a href="#">Configurer Android Studio</a></h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="ch_card_body">
                        <a href="#" className="btn border-dark ch_btn">Commencer</a>
                    </div>
                    <div className="ch_card-footer">
                        <cite>06 Jun 2022, par Karim</cite>
                    </div>
                </div>
                <div className="ch_card">
                    <div className="ch_card-image"><img src="./../../assets/images/new/badge_2.svg" width="150" alt="" /></div>
                    <div className="progress_wrapper mx-2 my-3">
                        <div className="progress">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="percentage">50%</div>
                    </div>
                    <div className="ch_card-info">
                        <div className="ch_card_title my-3">
                            <h3><a href="#">Construire une layout de base</a></h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="ch_card_body">
                        <a href="#" className="btn border-dark ch_btn">Commencer</a>
                    </div>
                    <div className="ch_card-footer">
                        <cite>06 Jun 2022, par Ali</cite>
                    </div>
                </div>
                <div className="ch_card">
                    <div className="ch_card-image"><img src="./../../assets/images/new/badge.svg" width="150" alt="" /></div>
                    <div className="progress_wrapper mx-2 my-3">
                        <div className="progress">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="percentage">50%</div>
                    </div>
                    <div className="ch_card-info">
                        <div className="ch_card_title my-3">
                            <h3><a href="#">Introduction à Kotlin</a></h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="ch_card_body">
                        <a href="#" className="btn border-dark ch_btn">Commencer</a>
                    </div>
                    <div className="ch_card-footer">
                        <cite>06 Jun 2022, par Mohamed</cite>
                    </div>
                </div>
                <div className="ch_card">
                    <div className="ch_card-image"><img src="./../../assets/images/new/badge_1.svg" width="150" alt="" /></div>
                    <div className="progress_wrapper mx-2 my-3">
                        <div className="progress">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="percentage">50%</div>
                    </div>
                    <div className="ch_card-info">
                        <div className="ch_card_title my-3">
                            <h3><a href="#">Configurer Android Studio</a></h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="ch_card_body">
                        <a href="#" className="btn border-dark ch_btn">Commencer</a>
                    </div>
                    <div className="ch_card-footer">
                        <cite>06 Jun 2022, par Karim</cite>
                    </div>
                </div>
                <div className="ch_card">
                    <div className="ch_card-image"><img src="./../../assets/images/new/badge_2.svg" width="150" alt="" /></div>
                    <div className="progress_wrapper mx-2 my-3">
                        <div className="progress">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="percentage">50%</div>
                    </div>
                    <div className="ch_card-info">
                        <div className="ch_card_title my-3">
                            <h3><a href="#">Construire une mise en page de base</a></h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="ch_card_body">
                        <a href="#" className="btn border-dark ch_btn">Commencer</a>
                    </div>
                    <div className="ch_card-footer">
                        <cite>06 Jun 2022, par Ali</cite>
                    </div>
                </div>
                <div className="ch_card">
                    <div className="ch_card-image"><img src="./../../assets/images/new/badge_1.svg" width="150" alt="" /></div>
                    <div className="progress_wrapper mx-2 my-3">
                        <div className="progress">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="percentage">50%</div>
                    </div>
                    <div className="ch_card-info">
                        <div className="ch_card_title my-3">
                            <h3><a href="#">Configurer Android Studio</a></h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="ch_card_body">
                        <a href="#" className="btn border-dark ch_btn">Commencer</a>
                    </div>
                    <div className="ch_card-footer">
                        <cite>06 Jun 2022, par Karim</cite>
                    </div>
                </div>
                <div className="ch_card">
                    <div className="ch_card-image"><img src="./../../assets/images/new/badge.svg" width="150" alt="" /></div>
                    <div className="progress_wrapper mx-2 my-3">
                        <div className="progress">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="percentage">50%</div>
                    </div>
                    <div className="ch_card-info">
                        <div className="ch_card_title my-3">
                            <h3><a href="#">Introduction à Kotlin</a></h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="ch_card_body">
                        <a href="#" className="btn border-dark ch_btn">Commencer</a>
                    </div>
                    <div className="ch_card-footer">
                        <cite>06 Jun 2022, par Mohamed</cite>
                    </div>
                </div>
                <div className="ch_card">
                    <div className="ch_card-image"><img src="./../../assets/images/new/badge_2.svg" width="150" alt="" /></div>
                    <div className="progress_wrapper mx-2 my-3">
                        <div className="progress">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="percentage">50%</div>
                    </div>
                    <div className="ch_card-info">
                        <div className="ch_card_title my-3">
                            <h3><a href="#">Construire une mise en page de base</a></h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="ch_card_body">
                        <a href="#" className="btn border-dark ch_btn">Commencer</a>
                    </div>
                    <div className="ch_card-footer">
                        <cite>06 Jun 2022, par Ali</cite>
                    </div>
                </div>
                <div className="ch_card">
                    <div className="ch_card-image"><img src="./../../assets/images/new/badge_1.svg" width="150" alt="" /></div>
                    <div className="progress_wrapper mx-2 my-3">
                        <div className="progress">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="percentage">50%</div>
                    </div>
                    <div className="ch_card-info">
                        <div className="ch_card_title my-3">
                            <h3><a href="#">Configurer Android Studio</a></h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="ch_card_body">
                        <a href="#" className="btn border-dark ch_btn">Commencer</a>
                    </div>
                    <div className="ch_card-footer">
                        <cite>06 Jun 2022, par Karim</cite>
                    </div>
                </div>
                <div className="ch_card">
                    <div className="ch_card-image"><img src="./../../assets/images/new/badge.svg" width="150" alt="" /></div>
                    <div className="progress_wrapper mx-2 my-3">
                        <div className="progress">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="percentage">50%</div>
                    </div>
                    <div className="ch_card-info">
                        <div className="ch_card_title my-3">
                            <h3><a href="#">Introduction à Kotlin</a></h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="ch_card_body">
                        <a href="#" className="btn border-dark ch_btn">Commencer</a>
                    </div>
                    <div className="ch_card-footer">
                        <cite>06 Jun 2022, par Mohamed</cite>
                    </div>
                </div>
                <div className="ch_card">
                    <div className="ch_card-image"><img src="./../../assets/images/new/badge_2.svg" width="150" alt="" /></div>
                    <div className="progress_wrapper mx-2 my-3">
                        <div className="progress">
                            <div className="progress-bar bg-info" role="progressbar" style={{width: "50%"}} aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div className="percentage">50%</div>
                    </div>
                    <div className="ch_card-info">
                        <div className="ch_card_title my-3">
                            <h3><a href="#">Construire une mise en page de baselayout</a></h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                    <div className="ch_card_body">
                        <a href="#" className="btn border-dark ch_btn">Commencer</a>
                    </div>
                    <div className="ch_card-footer">
                        <cite>06 Jun 2022, par Ali</cite>
                    </div>
                </div>
    
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
            </div>
        </div>
        </main>
    )
}

export default Chapitres;