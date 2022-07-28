const About  = () => {
    return(
        <main>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                        <i className="icon-home mr-2"></i>
                        <a href="/">Accueil</a>
                    </li>
                    <li className="breadcrumb-item">About</li>
                </ol>
            </nav>
            <div className="d-flex py-3 my-3 justify-content-center bg-info text-light">
                About us
            </div>
        </main>
    )
}
export default About;