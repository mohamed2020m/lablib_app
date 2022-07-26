import React from 'react'
import "../css/WhyToSub.css"


const Sub = () => {
    return (
        <section className="whyToSub">
            <div className="container whyToSubDiv">
                <h3 className="text-center text-primary">POURQUOI S'INSCRIRE?</h3>
                <div className="row justify-content-center">
                    <div className="reasons bg-secondary ">
                        <h4><i className="icon-new_releases"></i> Nouveaux Exercices</h4>
                        <p>Plus de 1000 exercices corrigés et 100 nouveautés en moyenne sont ajoutés par mois.</p>
                    </div>
                    <div className="reasons bg-secondary">
                        <h4><i className="icon-favorite"></i> Mes Exercices Favoris</h4>
                        <p>Explorez l'ensemble des ressources et créez des dossiers favoris pour classNameer les contenus qui vous intéressent.</p>
                    </div>
                    <div className="reasons bg-secondary">
                        <h4><i className="icon-question_answer"></i> Mes Questions</h4>
                        <p>Vous avez des questions? notre équipe de professionnels est en ligne pour vous aider dans vos exercices.</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Sub;