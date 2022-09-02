import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext'
import {GetDetailsMe} from '../service/UserService';
import {ExistCourse, RemoveFromFavorite} from '../service/CourseService';
import Helmet from "react-helmet"
import { useNavigate } from "react-router-dom";
const url = "https://lablib-api.herokuapp.com/api/v1/image";
import '../css/profile.css'

const Profile = () => {
    const { user } = useAuthContext();
    const [userDetails, setUseDetails] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

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
                    navigate('/login')
                }
            }
        }
        fetchAvatar();
    }, [isLoading])

    const handleExistCourse = async (e) => {
        let id = e.target.parentNode.firstChild.value;
        try{
            if(user){
                let res = await ExistCourse(id, user?.token)
                if (res.ok){
                    let d = await res.json();
                    location.reload();
                }
                else{
                    let r = await res.json()
                    throw r[0].message;
                }
            }
            else{
                throw 'Not Logged In'
            }
        }
        catch (err){
            console.log("err: ", err);
            if(err == 'Not Logged In'){
                navigate('/login')
            }
        } 
    }

    const handleRemoveFavorite = async(e) => {
        let id = e.target.parentNode.firstChild.value;
        try{
            if(user){
                let res = await RemoveFromFavorite(id, user?.token)
                if (res.ok){
                    let d = await res.json();
                    location.reload();
                }
                else{
                    let r = await res.json()
                    throw r[0].message;
                }
            }
            else{
                throw 'Not Logged In'
            }
        }
        catch (err){
            console.log("err: ", err);
            if(err == 'Not Logged In'){
                navigate('/login')
            }
        } 
    }
    return(
        <>
            <Helmet>
                <script>
                    document.title = "Mon Profile"
                </script>
            </Helmet>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><i className="icon-home mr-2"></i><a href="/home">Accueil</a></li>
                    <li className="breadcrumb-item active" aria-current="page">Mon Profile</li>
                </ol>
            </nav>
            {
            !isLoading ?
            <div className="container my-3">
                <div className="main-body">
                    <div className="row gutters-sm">
                        <div className="col-md-4 mb-3">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-column align-items-center text-center">
                                        <img src={`${url}/${userDetails.image}`} alt="avatar" className="rounded-circle border" width="100" />
                                        <div className="mt-3">
                                            <h4>{`${userDetails.firstname} ${userDetails.lastname}`}</h4>
                                            <p className="text-secondary mb-1">{userDetails.description}</p>
                                            <p className="text-muted font-size-sm">{userDetails.country}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8">
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">Le Nom Complète</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {`${userDetails.firstname} ${userDetails.lastname}`}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <h6 className="mb-0">E-mail</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {`${userDetails.email}`}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                        <h6 className="mb-0">Pays</h6>
                                        </div>
                                        <div className="col-sm-9 text-secondary">
                                            {userDetails.country}
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-12">
                                            <a className="btn btn-info" href="/settings">Modifier</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row gutters-sm">
                        <div className={userDetails.length  && userDetails.courses.length ? 'col-sm-6 mb-3 courses_jed' : 'col-sm-6 mb-3'}>
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Cours</i>rejoints</h6>
                                    {
                                        userDetails.courses.length ?
                                        <div className='joined_courses'>
                                            {userDetails.courses.map(item => {
                                                return(
                                                    <div className="d-flex justify-content-between align-items-center" key={item.id}>
                                                        <div className="d-flex align-items-center">
                                                                <div>
                                                                    <img src={`${url}/${item.image}`} alt="course_img" className="rounded-circle border" width="50" height="50"/>
                                                                </div>
                                                                <div className="">
                                                                    <a href={`/categories/${item.category}/cours/${item.name}`}>
                                                                        <div className='mx-2'>
                                                                            {item.name}  
                                                                        </div>
                                                                    </a>
                                                                    <div className='mx-2'>
                                                                        <p style={{fontSize: '12px'}}>{item.description}</p>  
                                                                    </div>
                                                                </div>
                                                            <hr/>
                                                        </div>
                                                        <div className="p-0 m-0">
                                                            <button onClick={handleExistCourse} className="border-0 bg-white">
                                                                <input type="text" value={item.id} hidden readOnly />
                                                                <i className="fa fa-trash text-danger bg-white"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            }
                                        </div>
                                        :
                                        <div>
                                            Vous n'avez encore rejoint aucun cours!
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={userDetails.length && userDetails.favorites.length ? 'col-sm-6 mb-3 courses_jed' : 'col-sm-6 mb-3'}>
                            <div className="card">
                                <div className="card-body">
                                    <h6 className="d-flex align-items-center mb-3"><i className="material-icons text-info mr-2">Cours</i>favoris</h6>
                                    {
                                    userDetails.favorites.length ?
                                        <div className='joined_courses'>
                                            {userDetails.favorites.map(item => {
                                                return(
                                                    <div className="d-flex justify-content-between align-items-center" key={item.id}>
                                                        <div className="d-flex align-items-center">
                                                                <div>
                                                                    <img src={`${url}/${item.image}`} alt="course_img" className="rounded-circle border" width="50" height="50"/>
                                                                </div>
                                                                <div className="">
                                                                    <a href={`/categories/${item.category}/cours/${item.name}`}>
                                                                        <div className='mx-2'>
                                                                            {item.name}  
                                                                        </div>
                                                                    </a>
                                                                    <div className='mx-2'>
                                                                        <p style={{fontSize: '12px'}}>{item.description}</p>  
                                                                    </div>
                                                                </div>
                                                            <hr/>
                                                        </div>
                                                        <div className="p-0 m-0">
                                                            <button onClick={handleRemoveFavorite} className="border-0 bg-white">
                                                                <input type="text" value={item.id} hidden readOnly />
                                                                <i className="fa fa-trash text-danger bg-white"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                            }
                                        </div>
                                        :
                                        <div>
                                            Vous n'avez pas encore ajouté de cours à votre liste de favoris
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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

export default Profile
