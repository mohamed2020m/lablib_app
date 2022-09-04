import leeuw from '../data/leeuw_img.jpg'
import hamza from '../data/hamza.jpeg'
import yazid from '../data/yazid.jpg'
import Github from '../data/github.png'
import Linkedin from '../data/linkedin.png'

const About  = () => {
    return(
        <main className="mb-3">
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
                            <img className="card-img-top rounded-circle mt-3" src={hamza} alt="hamza" style={{width:'180px', height:"180px"}}/>
                        </div>
                        <div className="card-body">
                            <div className='d-flex justify-content-center'>
                                <h5 className="card-title">Hamza Ezzahi</h5>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <p className="card-text">
                                    Mobile Developer
                                </p>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center user_social_media">    
                                <a href="https://github.com/HmzEzh"><img src={Github}/></a>
                                <a href="https://www.linkedin.com/in/hamza-ezzahi-b59519217"><img src={Linkedin}/></a>
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
                                    FrontEnd Web Developer
                                </p>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center user_social_media">    
                                <a href="https://github.com/mohamed2020m"><img src={Github}/></a>
                                <a href="https://www.linkedin.com/in/mohamed-essabir-a23633196/"><img src={Linkedin}/></a>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className="d-flex justify-content-center">
                            <img className="card-img-top rounded-circle mt-3" src={yazid} alt="Yazid" style={{width:'180px', height:"180px"}}/>
                        </div>
                        <div className="card-body">
                            <div className='d-flex justify-content-center'>
                                <h5 className="card-title">Yazid Slila</h5>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <p className="card-text">
                                    BackEnd Web Developer
                                </p>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center user_social_media">    
                                <a href="https://github.com/yokgs"><img src={Github}/></a>
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