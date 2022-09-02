import React, { useEffect, useState, useRef, useMemo} from 'react';
import { useAuthContext } from '../hooks/useAuthContext'
import {GetDetailsMe, EditUser, DelUser} from '../service/UserService';
import Helmet from "react-helmet"
import { Formik, Form, Field} from 'formik';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";
import countryList from 'react-select-country-list'

const url = "https://lablib-api.herokuapp.com/api/v1/image";
const imageMimeType = /image\/(png|jpg|jpeg)/i;

const Settings = () => {
    const { user } = useAuthContext();
    const [userDetails, setUseDetails] = useState({});
    const inputRef = useRef(null);
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();
    const [isEdited, setIsEdited] = useState(false);
    const resetFileInput = () => {
        inputRef.current.value = null;
    };
    const countries = useMemo(() => countryList().native().getData('FR'), [])

    useEffect(() => {
        async function fetchAvatar(){
            try{
                if(user?.token){
                    let res = await GetDetailsMe(user.token);
                    if(res.ok){
                        let d = await res.json();
                        setUseDetails(d);
                        setIsLoading(false);
                    }
                    else{
                        let err = await res.json();
                        throw err[0].message
                    }
                }
            }
            catch(err){
                console.warn("err: ", err);
                if(err == 'Not Logged In'){
                    navigate("/login")
                }
            }
        }
        fetchAvatar();

        let fileReader, isCancel = false;
        if (file) {
            fileReader = new FileReader();
            fileReader.onload = (e) => {
                const { result } = e.target;
                if (result && !isCancel) {
                setFileDataURL(result)
                }
            }
            fileReader.readAsDataURL(file);
        }
        return () => {
            isCancel = true;
            if (fileReader && fileReader.readyState === 1) {
                fileReader.abort();
            }
        }
    }, [isLoading, file, isEdited])

    console.log("userDetails: ", userDetails);
    return(
        <>
            <Helmet>
                <script>
                    document.title = "Settings"
                </script>
            </Helmet>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><i className="icon-home mr-2"></i><a href="/home">Accueil</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Settings</li>
                </ol>
            </nav>
            {
                !isLoading ?
                <div className="container my-3">
                    <div className="card mb-4">
                        <h5 className="card-header">Modifier vos informations</h5>
                        <Formik
                            initialValues={{ firstname: userDetails.firstname, lastname: userDetails.lastname, password: "", currentPassword:"", email:userDetails.email, country: userDetails.country, image: `${url}/${userDetails.image}`, description: userDetails.description}}
                            validationSchema={Yup.object({
                                description: Yup.string()
                                .max(250, 'Doit contenir 15 caractères ou moins'),
                                currentPassword: Yup.string()
                                .required('Mot de pass requis')
                                })
                            }
                            onSubmit={async (values, { setSubmitting, resetForm }) => {
                                let data = new FormData();
                                for (let value in values) {
                                    data.append(value, values[value]);
                                }
                                setSubmitting(true);

                                var requestOptions = {
                                    method: 'PUT',
                                    headers: {
                                        'Authorization': `Bearer ${user?.token}` 
                                    },
                                    body:data,
                                    redirect: 'follow'
                                };
                                
                                try{
                                    let res = await EditUser(requestOptions)
                                    if (res.ok){
                                        let d = await res.json();
                                        setIsEdited(true);
                                        resetFileInput();
                                        resetForm();
                                        //relaod window
                                        location.reload();
                                    }
                                    else{
                                        let r = await res.json()
                                        throw r[0].message;
                                    }
                                }
                                catch (err){
                                    console.log("err: ", err);
                                    if(err == 'Not Logged In'){
                                        navigate('/login')
                                    }
                                } 
                                setSubmitting(false);
                            }}
                        >
                            {(formik) => (
                                <Form  onSubmit={formik.handleSubmit} encType="multipart/form-data">
                                    <div className="card-body">
                                        <div className="d-flex flex-column justify-content-center align-items-center gap-4">
                                            <div>
                                                <img
                                                    src={fileDataURL ? fileDataURL : formik.values.image} 
                                                    alt="avatar" 
                                                    className="rounded-circle border" 
                                                    width="80"
                                                    height="80"
                                                    id="uploadedAvatar"
                                                />
                                            </div>
                                            <div className="button-wrapper mt-2">
                                                <label htmlFor="upload" className="btn btn-info mx-2 mb-4" tabIndex="0">
                                                <span className="d-none d-sm-block">Upload une nouvelle photo</span>
                                                <i className="bx bx-upload d-block d-sm-none"></i>
                                                <input
                                                    ref={inputRef}
                                                    type="file"
                                                    id="upload"
                                                    className="account-file-input"
                                                    hidden
                                                    name="image"
                                                    accept='image/*'
                                                    onChange={(event) => {
                                                        const file = event.currentTarget.files[0];
                                                        if (!file.type.match(imageMimeType)) {
                                                            console.err("Image mime type is not valid")
                                                            return;
                                                        }
                                                        setFile(file);
                                                        formik.setFieldValue("image", event.currentTarget.files[0])
                                                    }}
                                                />
                                                </label>
                                                {
                                                    fileDataURL && !isEdited &&
                                                    <button 
                                                        type="button" 
                                                        className="btn btn-outline-secondary account-image-reset mb-4"
                                                        onClick={() => {setFileDataURL(null); formik.setFieldValue("image", `${url}/${userDetails.image}`)}}
                                                    >
                                                        <i className="bx bx-reset d-block d-sm-none"></i>
                                                        <span className="d-none d-sm-block">Reset</span>
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <hr className="my-0" />
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="firstName" className="form-label">Prénom</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="firstName"
                                                    {...formik.getFieldProps('firstname')} 
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="lastName" className="form-label">Nom</label>
                                                <input 
                                                    className="form-control" 
                                                    type="text" 
                                                    id="lastName" 
                                                    {...formik.getFieldProps('lastname')} 
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="email" className="form-label">E-mail</label>
                                                <input 
                                                    className="form-control" 
                                                    type="text" 
                                                    id="email" 
                                                    {...formik.getFieldProps('email')} 
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="password" className="form-label">Nouveau Mot de pass</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="password"
                                                    {...formik.getFieldProps('password')}
                                                />
                                            </div>
                                            <div className="mb-3 col-md-6">
                                                <label className="form-label" htmlFor="country">Pays</label>
                                                <Field 
                                                    id="cacountrytegory" name="country" as="select" 
                                                    value={formik.values.country ? formik.values.country : "Sélectionnez votre pays"} onChange={(e) => {formik.setFieldValue("country", e.target.value)}}
                                                    className="form-control select2" 
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
                                            <div className="mb-3 col-md-6">
                                                <label htmlFor="description" className="form-label">Brief Description</label>
                                                <input
                                                    className="form-control"
                                                    type="text"
                                                    id="description"
                                                    {...formik.getFieldProps('description')}
                                                />
                                                {formik.touched.description && formik.errors.description ? (
                                                    <div className="text-danger">{formik.errors.description}</div>
                                                ) : null}
                                            </div>
                                        </div>

                                        <button type="button" className="text-end btn btn-info" data-toggle="modal" data-target=".bd-example-modal">save</button>

                                        <div className="modal fade bd-example-modal" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                            <div className="modal-dialog modal-lg modal-dialog-centered">
                                                <div className="modal-content">
                                                    <div className="modal-header">
                                                        <h5 className="modal-title" id="exampleModalCenterTitle">Enter your current passwod</h5>
                                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                        </button>
                                                    </div>
                                                    <div className="modal-body">
                                                        <label htmlFor="currentPassword" className="form-label">Current Password</label>
                                                        <input
                                                            className="form-control"
                                                            type="password"
                                                            id="currentPassword"
                                                            {...formik.getFieldProps('currentPassword')}
                                                        />
                                                        {formik.touched.currentPassword && formik.errors.currentPassword ? (
                                                            <div className="text-danger">{formik.errors.currentPassword}</div>
                                                        ) : null}
                                                    </div>
                                                    <div className="modal-footer">
                                                        <div className="mt-2 d-flex justify-content-end">
                                                            {formik.values.currentPassword ?
                                                            <button 
                                                                type="submit" 
                                                                className="btn btn-info mx-2"
                                                            >
                                                                {formik.isSubmitting ? "Sauvegarder..." : "Sauvegarder"}
                                                            </button>:
                                                            <button 
                                                                className="btn btn-info mx-2"
                                                                disabled
                                                            >
                                                                Sauvegarder
                                                            </button>
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                    
                    <Formik
                            initialValues={{currentPassword: ""}}
                            validationSchema={Yup.object({
                                currentPassword: Yup.string()
                                .required('Mot de pass requis')
                                })
                            }
                            onSubmit={async (values, { setSubmitting}) => {
                                setSubmitting(true);
                                try{
                                    let res = await DelUser(user.id)
                                    if (res.ok){
                                        let d = await res.json();
                                        localStorage.removeItem('user');
                                        navigate("/", { replace: true });
                                        //relaod window
                                        location.reload();
                                    }
                                    else{
                                        let r = await res.json()
                                        throw r[0].message;
                                    }
                                }
                                catch (err){
                                    console.log("err: ", err);
                                } 
                                setSubmitting(false);
                            }}
                        >
                            {(formik) => (
                                <form onSubmit={formik.handleSubmit}>
                                    <div className="card border border-danger">
                                        <h5 className="card-header bg-danger text-white">Zone dangereuse</h5>
                                        <div className="card-body">
                                            <div className="mb-3 col-12 mb-0">
                                                <div className="alert alert-warning">
                                                    <h6 className="alert-heading fw-bold mb-1">Êtes-vous sûr de vouloir supprimer votre compte ?</h6>
                                                    <p className="mb-0">Une fois que vous avez supprimé votre compte, il n'y a plus de retour en arrière. Soyez certain.</p>
                                                </div>
                                            </div>
                                            <button type="button" className="btn btn-danger" data-toggle="modal" data-target=".deleteAccount">Supprimer le compte</button>
                                        </div>
                                    </div>
                                    <div className="modal fade deleteAccount" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-lg modal-dialog-centered">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <h5 className="modal-title" id="exampleModalCenterTitle">Suppression de votre compte</h5>
                                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                    <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div className="modal-body">
                                                    <label htmlFor="current_password" className="form-label">Mot de passe actuel</label>
                                                    <input
                                                        className="form-control"
                                                        type="password"
                                                        id="current_password"
                                                        {...formik.getFieldProps('currentPassword')}
                                                    />
                                                    {formik.touched.currentPassword && formik.errors.currentPassword ? (
                                                        <div className="text-danger">{formik.errors.currentPassword}</div>
                                                    ) : null}
                                                </div>
                                                <div className="modal-footer">
                                                    <div className="mt-2 d-flex justify-content-end">
                                                        <button 
                                                            type="submit" 
                                                            className="btn btn-danger mx-2"
                                                        >
                                                            {formik.isSubmitting ? "Supprimer le compte..." : "Supprimer le compte"}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            )}
                        </Formik>
                </div>
                :
                <div className='d-flex justify-content-center align-items-center' style={{height: "100vh"}}>
                    <div className="spinner-grow" style={{width: "3rem", height: "3rem"}} role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            }
        </>
    )
}

export default Settings