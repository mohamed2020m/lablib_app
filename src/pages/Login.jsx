import React,{useState} from 'react';
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from "react-router-dom";
import Helmet from "react-helmet"
import { Formik} from 'formik';
import * as Yup from 'yup';
import imgError from '../data/error.png'
import { LoginUser } from '../service/UserService';

const Login = () => {
    const [error, setError] = useState("");
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    return(
        <>
            <main className="container-fluid">
                <div className="container">
                    <div className="signup-form">
                    <Formik
                        initialValues={{email: "", password:""}}
                        validationSchema={Yup.object({
                                email: Yup.string().required('E-mail requis'),
                                password: Yup.string().required('Mot de pass requis'),
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
                                let res = await LoginUser(requestOptions);
                                console.log(res)
                                if (res.ok){
                                    let d = await res.json();
                                    // save the user to local storage
                                    localStorage.setItem('user', JSON.stringify(d));
                                    // update the auth context
                                    dispatch({type: 'LOGIN', payload: d});
                                    resetForm();
                                    navigate("/", { replace: true });
                                }
                                else{
                                    if(Array.isArray(res) && res.length === 0) return "error";
                                    let r = await res.json()
                                    throw r[0].message;
                                }
                            }
                            catch (err){
                                console.log("err: ", err);
                                setError(err)
                            } 
                            setSubmitting(false);
                        }}
                    >
                        {(formik) => (
                            <form className="w-full" onSubmit={formik.handleSubmit} encType="multipart/form-data">
                                {error &&
                                <div className='text-center text-danger mb-3 pb-3 border-bottom border-danger rounded'>
                                    <img src={imgError} alt="Error" width="30px" height="30px"/>{error}
                                </div>
                                }
                                <h2 className="text-center">Log in</h2>
                                <p className="text-center">Connectez-vous avec votre compte de réseau social</p>
                                <div className="social-btn text-center">
                                    <a href="#" className="btn btn-primary btn-lg"><i className="icon-facebook"></i> Facebook</a>
                                    <a href="#" className="btn btn-info btn-lg"><i className="icon-twitter"></i> Twitter</a>
                                    <a href="#" className="btn btn-danger btn-lg"><i className="icon-google"></i> Google</a>
                                </div>
                                <div className="or-seperator"><b>ou</b></div>
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
                                <div className="form-group">
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="password" 
                                        placeholder="Mot de passe" 
                                        {...formik.getFieldProps('password')} 
                                    />
                                    {formik.touched.password && formik.errors.password ? (
                                        <div className="text-danger">{formik.errors.password}</div>
                                    ) : null}
                                </div>
                                
                                <div className="form-group d-flex justify-content-center">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-lg"
                                    >
                                        {formik.isSubmitting ? "Loging In..." : "Log In"}
                                    </button>
                                </div>
                                <div className="hint-text">Créer un compte<a className="text-primary ml-2" href="/signup">Sign Up</a></div>
                            </form>
                        )}
                        </Formik>
                        <div className="hint-text"><a className="text-primary" href="forgetpassword.html">Mot de passe oublié?</a></div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default Login;
