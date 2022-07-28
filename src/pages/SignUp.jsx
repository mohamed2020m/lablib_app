import React from 'react';


const SignUp = () => {
    return(
        <>
            <main className="container-fluid">
                <div className="container">
                    <div className="signup-form">
                        <form action="/examples/actions/confirmation.php" method="post">
                            <h2 className="text-center">Sign Up</h2>
                            <p className="text-center">Merci de remplir ce formulaire pour créer un compte !</p>
                            <div className="social-btn text-center">
                                <a href="#" className="btn btn-primary btn-lg"><i className="icon-facebook"></i> Facebook</a>
                                <a href="#" className="btn btn-info btn-lg"><i className="icon-twitter"></i> Twitter</a>
                                <a href="#" className="btn btn-danger btn-lg"><i className="icon-google"></i> Google</a>
                            </div>
                            <div className="or-seperator"><b>ou</b></div>
                            <div className="form-group">
                                <div className="row">
                                    <div className="col"><input type="text" className="form-control" name="name" placeholder="Nom" required="required"/></div>
                                    <div className="col"><input type="text" className="form-control" name="username" placeholder="Identifiant" required="required"/></div>
                                </div>        	
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" name="email" placeholder="Adresse e-mail" required="required" />
                            </div>
                            <div className="form-group">
                                <input type="email" className="form-control" name="email" placeholder="Confirmer l'adresse e-mail" required="required"/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="password" placeholder="Mot de passe" required="required" />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="confirm_password" placeholder="Confirmation" required="required"/>
                            </div>        
                            <div className="form-group">
                                <label className="form-check-label ml-3">
                                    <input type="checkbox" required="required"/> 
                                    J'accepte le 
                                    <a href="#"> Conditions d'utilisation </a>
                                    &amp; 
                                    <a href="#"> Politique de confidentialité</a>
                                </label>
                            </div>
                            <div className="form-group d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
                            </div>
                        </form>
                        <div className="hint-text">Vous avez déjà un compte? <a className="text-primary" href="login.html">Login ici</a></div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SignUp;