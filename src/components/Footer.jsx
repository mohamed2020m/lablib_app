import React from 'react';

const Footer = () => (
    <footer className="p-3 shadow-sm">
        <div className="container">
            <div className="row p-3">
                <div className="col-sm-4">
                    <ul>
                        <li className="p-2 font-weight-bold">About</li>
                        <hr />
                        <li className="p-2"><a href="/about">L'équipe</a></li>
                        <li className="p-2"><a href="/contatct">Contact</a></li>
                    </ul>
                </div>
                <div className="col-sm-4">
                    <ul>
                        <li className="p-2 font-weight-bold">LabLib</li>
                        <hr />
                        <li className="p-2"><a href="#">Politique de confidentialité</a></li>
                        <li className="p-2"><a href="#">Faq</a></li>
                        <li className="p-2"><a href="#">Plan du site</a></li>
                    </ul>
                </div>
                <div className="col-sm-4">
                    <ul>
                        <li className="p-2 font-weight-bold">Réseaux sociaux</li>
                        <hr />
                        <li className="p-2"><i className="icon-facebook-square mr-2"></i><a href="#"> Facebook</a></li>
                        <li className="p-2"><i className="icon-linkedin-square mr-2"></i><a href="#"> LinkedIn</a></li>
                        <li className="p-2"><i className="icon-twitter-square mr-2"></i><a href="#"> Twitter</a></li>
                    </ul>
                </div>
            </div>
            <div className="mt-3">
                <h6 className="text-center">Copyright © 2022 - <a href="https://lablib.herokuapp.com/" className="text-warning">LabLib</a> - Tous droits réservés</h6>
                <p className="text-center">v.0.2, updated 08-18-22 by leeuw</p>
            </div>
        </div>
    </footer>
);

export default Footer;