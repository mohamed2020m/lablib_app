import React from 'react';


const Contatct = () => {
    return(
        <>
            <main>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb">
                        <li class="breadcrumb-item"><i class="icon-home mr-2"></i><a href="index.html">Accueil</a></li>
                        <li class="breadcrumb-item">Contact</li>
                    </ol>
                </nav>
                <div class="container mt-3">
                    <div class="row align-items-stretch no-gutters contact-wrap">
                        <div class="col-md-8">
                            <div class="form h-100">
                                <h3>Envoyer-nous un email</h3>
                                <form class="mb-5" method="post" id="contactForm" name="contactForm">
                                    <div class="row">
                                        <div class="col-md-6 form-group mb-5">
                                            <label for="name" class="col-contact-from-label col-form-label">Nom *</label>
                                            <input type="text" class="col-contact-from-control form-control" name="name" id="name" placeholder="Votre Nom" />
                                        </div>
                                        <div class="col-md-6 form-group mb-5">
                                            <label for="email" class="col-contact-from-label col-form-label">E-mail *</label>
                                            <input type="text" class="col-contact-from-control form-control" name="email" id="email"  placeholder="Votre E-mail" />
                                        </div>
                                    </div>
                
                                    <div class="row">
                                        <div class="col-md-12 form-group mb-5">
                                            <label for="sujet" class="col-contact-from-label col-form-label">Sujet</label>
                                            <input type="text" class="col-contact-from-control form-control" name="sujet" id="sujet"  placeholder="Sujet" />
                                        </div>
                                    </div>
                
                                    <div class="row">
                                        <div class="col-md-12 form-group mb-5">
                                        <label for="message" class="col-contact-from-label col-form-label">Message *</label>
                                        <textarea class="form-control col-contact-from-control " name="message" id="message" cols="30" rows="4"  placeholder="Ecrire Votre message..."></textarea>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-12 form-group d-flex justify-content-center">
                                            <input type="submit" value="Envoyer le Message" class="btn contact-btn contact-btn-primary text-white rounded-0 py-2 px-4" />
                                            <span class="submitting"></span>
                                        </div>
                                    </div>
                                </form>
            
                                <div id="form-message-warning mt-4"></div> 
                                <div id="form-message-success">
                                    Votre message a été reçu, Merci!
                                </div>

                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="contact-info h-100">
                                <h3>Plus de Détails</h3>
                                <p class="mb-5 text-light">Envoyez-nous un e-mail, nous sommes heureux de vous aider!</p>
                                <ul class="list-unstyled">
                                    <li class="d-flex">
                                        <span class="wrap-icon icon-room mr-3"></span>
                                        <span class="text text-light">Morocco</span>
                                    </li>
                                    <li class="d-flex">
                                        <span class="wrap-icon icon-phone mr-3"></span>
                                        <span class="text text-light">(+212) 06 59 39 39 21</span>
                                    </li>
                                    <li class="d-flex">
                                        <span class="wrap-icon icon-envelope mr-3"></span>
                                        <span class="text text-light">info@lablib.com</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Contatct;
