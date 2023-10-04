// Importation des styles CSS, des bibliothèques React et des dépendances nécessaires.

import './accomodation.scss';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import datas from '../../data/data';
import Header from '../../components/header/Header';
import Slider from '../../components/carousel/Carousel';
import Footer from '../../components/footer/Footer';
import Collapse from '../../components/collapse/Collapse';
import greyStar from '../../assets/grey_star.png';
import redStar from '../../assets/red_star.png';

export default function Accomodation() {

// stocker les images de l'hébergement.
  const [imageSlider, setImageSlider] = useState([]);

  // Utilisation du hook useParams pour extraire l'ID de l'URL.
  const { id } = useParams();

// Recherche des détails de l'hébergement correspondant à l'ID.
  const dataCurrentAccomodation = datas.find(data => data.id === id);

  // Utilisation de useEffect pour gérer le comportement lorsque l'ID change
  useEffect(() => {
    if (!dataCurrentAccomodation) {
      // L'ID de l'hébergement n'existe pas dans les données, rediriger vers NotFound
      window.location.href = '/notfound';
    } else {
      // Si l'ID est valide, mettre à jour l'état avec les images de l'hébergement
      setImageSlider(dataCurrentAccomodation.pictures);
    }
  }, [id, dataCurrentAccomodation]);

  if (!dataCurrentAccomodation) {
    // Ne rien afficher si l'ID n'est pas valide (l'utilisateur sera redirigé)
    return null;
  }
 
  // Extraction des détails de l'hébergement à partir de dataCurrentAccomodation
  const { title, location, tags, host, rating, description, equipments } = dataCurrentAccomodation;
  const name = host.name.split(' '); // Séparation du nom de l'hôte en prénom et nom


  // Rendu de la page
  return (
	<>
	  <Header /> {/* Composant d'en-tête de la page */}
	  <Slider imageSlider={imageSlider} /> {/* Carrousel d'images de l'hébergement */}
	  <main className="accomodation">
		{/* Contenu principal de la page */}
		<div className="accomodation_content">
		  {/* Section contenant les informations sur l'hébergement */}
		  <div className="accomodation_content_infos">
			{/* Titre de l'hébergement */}
			<h1>{title}</h1>
			{/* Emplacement de l'hébergement */}
			<p>{location}</p>
			{/* Tags associés à l'hébergement (boutons) */}
			<div>
			  {tags.map((tag, index) => (
				<button key={index}>{tag}</button>
			  ))}
			</div>
		  </div>
  
		  {/* Section contenant les informations sur l'hôte */}
		  <div className="accomodation_content_host">
			<div>
			  <div className="accomodation_content_host_name">
				{/* Prénom de l'hôte */}
				<span>{name[0]}</span>
				{/* Nom de l'hôte */}
				<span>{name[1]}</span>
			  </div>
			  {/* Image de l'hôte */}
			  <img src={host.picture} alt="host of this accomodation" />
			</div>
  
			{/* Section contenant l'évaluation de l'hébergement (étoiles) */}
			<div className="accomodation_content_host_stars">
			  {/* afficher les étoiles en fonction de la note */}
			  {[...Array(5)].map((_, index) => {
				const ratingValue = index + 1;
  
				return (
				  <img
					key={index}
					/*Si ratingValue est inférieur ou égal à rating, l'étoile est rouge, sinon, elle est grise.*/
					src={ratingValue <= rating ? redStar : greyStar}
					alt="star"
				  />
				);
			  })}
			</div>
		  </div>
		</div>
  
		{/* Section contenant les éléments pliables (Description et Équipements) */}
		<div className="accomodation_collapse">
		  <div className="accomodation_collapse_item">
			{/* Composant Collapse pour afficher la description */}
			<Collapse title={'Description'} content={description} />
		  </div>
		  <div className="accomodation_collapse_item">
			{/* Composant Collapse pour afficher les équipements */}
			<Collapse title={'Équipements'} content={equipments} />
		  </div>
		</div>
	  </main>
  
	  <Footer /> {/* Composant de pied de page */}
	</>
  );  
}
