import React from 'react';
import Facebook from '../data/facebook.png'
import LinkedIn from '../data/linkedin.png'
import Twitter from '../data/twitter.png'
import Instagram from '../data/instagram.png'
import logo from '../data/logo.png'
import mobileApp from '../data/en_badge_web_generic.png'

const Footer = () => (
    <footer className="p-3 shadow-sm border-top mt-3">
        <div className="container">
            <div className="row px-3">
                <div className="col-sm-4">
                    <h5 className="p-2 font-weight-bold">About</h5>
                    <hr />
                    <ul>
                        <li className="p-2"><a href="/about">L'équipe</a></li>
                        <li className="p-2"><a href="/contact">Contact</a></li>
                    </ul>
                </div>
                <div className="col-sm-4">
                    <h5 className="p-2 font-weight-bold">LabLib</h5>
                    <hr />
                    <ul>
                        <li className="p-2"><a href="#">Politique de confidentialité</a></li>
                        <li className="p-2"><a href="#">Faq</a></li>
                    </ul>
                </div>
                <div className="col-sm-4">
                    <h5 className="p-2 font-weight-bold">Réseaux sociaux</h5>
                    <hr />
                    <div className='d-flex user_social_media'>
                        <div className="p-2">
                            <a href="#"><img src={Facebook} alt="Facebook" /></a>
                        </div>
                        <div className="p-2">
                            <a href="#"><img src={LinkedIn} alt="LinkedIn" /></a>
                        </div>
                        <div className="p-2">
                            <a href="#"><img src={Twitter} alt="Twitter" /></a>
                        </div>
                        <div className="p-2">
                            <a href="#"><img src={Instagram} alt="Instagram" /></a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column align-items-center">
                {/* <div>
                    <img src={logo} width="80" height="80" alt="logo"/>
                </div> */}
                <div>
                    <h6 className="">Copyright © 2022 - <a href="https://lablib.herokuapp.com/" className="text-info">LabLib</a> - Tous droits réservés</h6>
                </div>
                <div>
                    <a href="#">
                        <img src={mobileApp} alt="mobile app" style={{width:'150px', heigth:'80px'}}/>
                    </a>
                </div>
            </div>
        </div>
    </footer>
);

export default Footer;