import React from 'react'
import Helmet from "react-helmet"
import nocontent from "../data/notFound.png"

export default function NoPage(){
    return(
        <div>
            <Helmet>
                <script>
                    document.title = "Not Found!"
                </script>
            </Helmet>
            <div className='d-flex justify-content-center align-content-center p-3 m-3'>
                <img src={nocontent} alt="page dones't exist" width="350" height="230"/>
            </div>
        </div>
    )
}