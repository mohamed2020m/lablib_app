import React from 'react'
import Helmet from "react-helmet"
import notExist from "../data/404.png"

export default function NoPage(){
    return(
        <div>
            <Helmet>
                <script>
                    document.title = "Pas trouvé!"
                </script>
            </Helmet>
            <div className='d-flex justify-content-center align-content-center mb-3 '>
                <img src={notExist} alt="page dones't exist" className="page_404"/>
            </div>
            <div className='d-flex justify-content-center m-3'>
                <a className="bg-primary text-white p-3 rounded mr-4 mb-4" href="https://lablib.herokuapp.com/home">
                    <i className='fa fa-arrow-left mx-2'></i>
                    Retournez à la page d'accueil
                </a>
            </div>
        </div>
    )
}