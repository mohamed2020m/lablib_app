import React,{useState, useMemo } from 'react';
import Helmet from "react-helmet"
import { Formik, Field} from 'formik';
import * as Yup from 'yup';
import imgError from '../data/error.png'
import imgSuccess from '../data/ok.png'
import { PostUser } from '../service/UserService';
import logo from '../data/logo.png'
import countryList from 'react-select-country-list'

// console.log(countryList().native().getLabel('FR'))
const SignUp = () => {
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const countries = useMemo(() => countryList().native().getData('FR'), [])
    // console.log('countries: ', countries);

    return(
        <>
            <Helmet>
                <script>
                    document.title = "Register"
                </script>
            </Helmet>
            <main className="container-fluid">
                <div className="container">
                    <div className="signup-form">
                        <Formik
                        initialValues={{ firstname: '', lastname: '', email: "", password:"", confirm_password:"", country: '', check:false}}
                        validationSchema={Yup.object({
                            firstname: Yup.string().required('Prénom requis'),
                            lastname: Yup.string().required('Nom requis'),
                            email: Yup.string().required('E-mail requis'),
                            country: Yup.string().required('pays requis'),
                            password: Yup.string().required('Mot de pass requis'),
                            confirm_password: Yup.string().when("password", {
                                is: val => (val && val.length > 0 ? true : false),
                                then: Yup.string().oneOf(
                                    [Yup.ref("password")],
                                    "Les deux mots de passe doivent être identiques"
                                )
                            }),
                            check: Yup.string()
                            .required("tu n'as pas accepté le Conditions d'utilisation et Politique de confidentialité"),
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
                                body:data,
                                redirect: 'follow'
                            };
                            
                            try{
                                let res = await PostUser(requestOptions)
                                if (res.ok){
                                    let d = await res.json();
                                    // save the user to local storage
                                    setSuccess(true);
                                    resetForm();
                                }
                                else{
                                    if(Array.isArray(res) && res.length === 0) return "error";
                                    let r = await res.json()
                                    throw r[0].message;
                                }
                            }
                            catch (err){
                                console.log("err: ", err);
                                setSuccess(false);
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
                                {success &&
                                <div className='text-center text-success mb-3 pb-3 border-bottom border-success rounded'>
                                    <img src={imgSuccess} alt="Error" width="30px" heigth="30px"/> 
                                    Votre compte a été créé avec succès, vérifiez l'e-mail que nous vous avons envoyé à des fins de vérification.
                                </div>
                                }
                                <h2 className="text-center">Sign Up</h2>
                                <p className="text-center">Merci de remplir ce formulaire pour créer un compte !</p>
                                {/* <div className="social-btn text-center">
                                    <a href="#" className="btn btn-primary btn-lg"><i className="icon-facebook"></i> Facebook</a>
                                    <a href="#" className="btn btn-black btn-lg "><i className="icon-github"></i> Github</a>
                                    <a href="#" className="btn btn-danger btn-lg"><i className="icon-google"></i> Google</a>
                                </div>
                                <div className="or-seperator"><b>ou</b></div> */}
                                <div className="form-group">
                                    <div className="row">
                                        <div className="col">
                                            <input 
                                                id="firstname"
                                                className="form-control" 
                                                type="text" 
                                                placeholder="Prénom" 
                                                {...formik.getFieldProps('firstname')}
                                            />
                                            {formik.touched.firstname && formik.errors.firstname ? (
                                                <div className="text-danger">{formik.errors.firstname}</div>
                                            ) : null}
                                        </div>
                                        <div className="col">
                                            <input 
                                                id="lastname"
                                                type="text" 
                                                className="form-control" 
                                                placeholder="Nom" 
                                                {...formik.getFieldProps('lastname')}
                                            />
                                            {formik.touched.lastname && formik.errors.lastname ? (
                                                <div className="text-danger">{formik.errors.lastname}</div>
                                            ) : null}
                                        </div>
                                    </div>        	
                                </div>
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
                                <div className="form-group">
                                    <input 
                                        id="confirm_password" 
                                        type="password" 
                                        className="form-control" 
                                        placeholder="Confirmation" 
                                        {...formik.getFieldProps('confirm_password')}
                                    />
                                    {formik.touched.confirm_password && formik.errors.confirm_password ? (
                                        <div className="text-danger">{formik.errors.confirm_password}</div>
                                    ) : null}
                                </div>        
                                {/* <div className="form-group">
                                    <label className="form-check-label ml-3">
                                        <input 
                                            type="checkbox" 
                                            {...formik.getFieldProps('check')}
                                        /> 
                                        J'accepte le 
                                        <a href="#"> Conditions d'utilisation </a>
                                        &amp; 
                                        <a href="#"> Politique de confidentialité</a>
                                    </label>
                                    {formik.touched.check && formik.errors.check ? (
                                        <div className="text-danger">{formik.errors.check}</div>
                                    ) : null}
                                </div> */}
                                <div className="form-group">
                                    <Field 
                                        id="cacountrytegory" name="country" as="select" 
                                        value={formik.values.country ? formik.values.country : "Sélectionnez votre pays"} onChange={(e) => {formik.setFieldValue("country", e.target.value)}}
                                        className="form-control" 
                                    >
                                        <option disabled>Sélectionnez votre pays</option>
                                        {countries.map((item) => (
                                            <option key={item.value} value={item.label}>{item.label}</option>
                                        ))}
                                    </Field>
                                    {formik.touched.country && formik.errors.country ? (
                                        <div className="text-danger">{formik.errors.country}</div>
                                    ) : null}
                                </div>
                                <div className="form-group d-flex justify-content-center">
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary btn-lg"
                                    >
                                        {formik.isSubmitting ? "Signing Up..." : "Sign Up"}
                                    </button>
                                </div>
                                <div className="hint-text">Vous avez déjà un compte? <a className="text-primary" href="/login">Login ici</a></div>
                            </form>
                        )}
                        </Formik>
                    </div>
                </div>
            </main>
        </>
    )
}

export default SignUp;