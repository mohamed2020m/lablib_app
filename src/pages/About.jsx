import leeuw from '../data/leeuw_img.jpg'
import Github from '../data/github.png'
import Linkedin from '../data/linkedin.png'

const About  = () => {
    return(
        <main>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <i className="icon-home mr-2"></i>
                        <a href="/">Accueil</a>
                    </li>
                    <li className="breadcrumb-item">About</li>
                </ol>
            </nav>
            <div className="d-flex py-3 my-3 justify-content-center">
                <h3>l'équipe du <span className='text-info'>Lablib</span></h3>
            </div>
            <div className="container my-4 about_cards">
                <div className="card-deck">
                    <div className="card">
                        <div className="d-flex justify-content-center">
                            <img className="card-img-top rounded-circle mt-3" src={leeuw} alt="leeuw" style={{width:'180px', height:"180px"}}/>
                        </div>
                        <div className="card-body">
                            <div className='d-flex justify-content-center'>
                                <h5 className="card-title">Mohamed Essabir</h5>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <p className="card-text">
                                    Front End web developer
                                </p>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center user_social_media">    
                                <a href="#"><img src={Github}/></a>
                                <a href="#"><img src={Linkedin}/></a>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="d-flex justify-content-center">
                            <img className="card-img-top rounded-circle mt-3" src={leeuw} alt="leeuw" style={{width:'180px', height:"180px"}}/>
                        </div>
                        <div className="card-body">
                            <div className='d-flex justify-content-center'>
                                <h5 className="card-title">Mohamed Essabir</h5>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <p className="card-text">
                                    Front End web developer
                                </p>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center user_social_media">    
                                <a href="#"><img src={Github}/></a>
                                <a href="#"><img src={Linkedin}/></a>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="d-flex justify-content-center">
                            <img className="card-img-top rounded-circle mt-3" src={leeuw} alt="leeuw" style={{width:'180px', height:"180px"}}/>
                        </div>
                        <div className="card-body">
                            <div className='d-flex justify-content-center'>
                                <h5 className="card-title">Mohamed Essabir</h5>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <p className="card-text">
                                    Front End web developer
                                </p>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center user_social_media">    
                                <a href="#"><img src={Github}/></a>
                                <a href="#"><img src={Linkedin}/></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}
export default About;