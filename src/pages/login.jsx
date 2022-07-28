import React from 'react';


const Login = () => {
    return(
        <>
            <main className="container-fluid">
                <div className="container">
                    <div className="signup-form">
                        <form action="/examples/actions/confirmation.php" method="post">
                            <h2 className="text-center">Log in</h2>
                            <p className="text-center">Connectez-vous avec votre compte de réseau social</p>
                            <div className="social-btn text-center">
                                <a href="#" className="btn btn-primary btn-lg"><i className="icon-facebook"></i> Facebook</a>
                                <a href="#" className="btn btn-info btn-lg"><i className="icon-twitter"></i> Twitter</a>
                                <a href="#" className="btn btn-danger btn-lg"><i className="icon-google"></i> Google</a>
                            </div>
                            <div className="or-seperator"><b>Ou</b></div>  
                            <div className="container">
                                <div className="form-group">
                                    <input type="email" className="form-control" name="email" placeholder="Nom d'utilisateur ou Adresse e-mail" required="required"/>
                                </div>
                                <div className="form-group">
                                    <input type="password" className="form-control" name="password" placeholder="Mot de passe" required="required"/>
                                </div>
                                <div className="form-group d-flex justify-content-center">
                                    <button type="submit" className="btn btn-primary btn-lg">Log In</button>
                                </div>
                            </div>              
                        </form>
                        <div className="hint-text"><a className="text-primary" href="forgetpassword.html">Mot de passe oublié?</a></div>
                        <div className="hint-text">Créer un compte<a className="text-primary ml-2" href="signup.html">Sign Up</a></div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login;