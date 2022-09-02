import React,{useState} from 'react';
import Helmet from "react-helmet"
import { Formik} from 'formik';
import * as Yup from 'yup';
import imgError from '../data/error.png'

import logo from '../data/logo.png'
import { ForgetPasswordUser } from '../service/UserService';

const ForgetPassword = () => {
    const [error, setError] = useState("");

    return(
        <>
            <Helmet>
                <script>
                    document.title = "Mot de pass Oublié"
                </script>
            </Helmet>
            <main className="container-fluid">
                <div className="container">
                    <div className="signup-form">
                    <Formik
                        initialValues={{email: ""}}
                        validationSchema={Yup.object({
                                email: Yup.string().required('E-mail requis'),
                            })
                        }
                        onSubmit={async (values, { setSubmitting, resetForm }) => {
                            let data = new FormData();
                            for (let value in values) {
                                data.append(value, values[value]);
                            }
                            setSubmitting(true);

                            var requestOptions = {
                                method: 'POST',
                                body: data,
                                redirect: 'follow'
                            };
                            
                            try{
                                let res = await ForgetPasswordUser(requestOptions);
                                if (res.ok){
                                    let d = await res.json();
                                    resetForm();
                                    console.log("sent")
                                }
                                else{
                                    let r = await res.json()
                                    throw r[0].message;
                                }
                            }
                            catch (err){
                                console.warn("err: ", err);
                                setError(err)
                            } 
                            setSubmitting(false);
                        }}
                    >
                        {(formik) => (
                            <form className="w-full" onSubmit={formik.handleSubmit} encType="multipart/form-data">
                                <div className="social-btn text-center mb-3">
                                    <img src={logo} width="80" height="80" alt="logo" />
                                </div>
                                {error &&
                                <div className='text-center text-danger mb-3 pb-3 border-bottom border-danger rounded'>
                                    <img src={imgError} alt="Error" width="30px" height="30px"/>{error}
                                </div>
                                }
                                <h2 className="text-center">Mot de passe oublié</h2>
                                <p className="text-center">Avez-vous oublié votre mot de passe ? pas de soucis 
                                    tapez simplement votre e-mail et vous recevrez un e-mail de notre part pour 
                                    renouveler votre mot de passecial
                                </p>
                                <div className="form-group">
                                    <input 
                                        id="email" 
                                        type="email" 
                                        className="form-control" 
                                        placeholder="Adresse e-mail" 
                                        {...formik.getFieldProps('email')}
                                    />
                                    {formik.touched.email && formik.errors.email ? (
                                        <div className="text-danger">{formik.errors.email}</div>
                                    ) : null}
                                </div>

                                <div className="form-group d-flex justify-content-center">
                                    {
                                    formik.values.email ?
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-lg"
                                        data-toggle="modal" data-target="#exampleModalCenter"
                                    >
                                        {formik.isSubmitting ? "Rréinitialiser le mot de passe..." : "Réinitialiser le mot de passe"}
                                    </button>
                                    :
                                    <button 
                                        type="submit"
                                        className="btn btn-primary btn-lg"
                                        disabled 
                                    >
                                        Réinitialiser le mot de passe
                                    </button>
                                    }
                                </div>
                                <div className="hint-text"><a className="text-primary ml-2" href="/login">Log in</a></div>
                                <div className="hint-text">Créer un compte<a className="text-primary ml-2" href="/register">Sign Up</a></div>
                            </form>
                        )}
                        </Formik>
                    </div>
                </div>
            </main>
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Mot de passe oublié</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="d-flex justify-content-center">
                                <h4 className='text-success'>vérifiez votre messagerie.</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword;
