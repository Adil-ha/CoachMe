import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllServices } from '../features/ServiceSlice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './SecondSection.module.css';

const SecondSection = () => {
    const dispatch = useDispatch();
    const services = useSelector((state) => state.services.services)
    const loading = useSelector((state) => state.services.loading);
    const error = useSelector((state) => state.services.error);

    useEffect(()=>{
        dispatch(fetchAllServices());
    }, [dispatch])

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 1000, // Vitesse de transition en millisecondes
        slidesToShow: 2, // Nombre de slides à montrer à la fois
        slidesToScroll: 1, // Nombre de slides à faire défiler à chaque fois
        autoplay: true, // Activer le défilement automatique
        autoplaySpeed: 5000, // Durée entre chaque défilement en millisecondes (5 secondes ici)
        pauseOnHover: true, // Mettre en pause le défilement automatique au survol
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    dots: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

  return (
    <div className={style.secondSection}>
    <h2>Nos prestations</h2>
    {loading ? (
        <p>Chargement...</p>
    ) : error ? (
        <p>Erreur: {error.message}</p>
    ) : (
        <Slider {...sliderSettings}>
        {services.map((service) => (
            <div key={service.id} className={style.serviceCard}>
                <h3>{service.type}</h3>
                <img src={service.image} alt={service.type} />
                <p>{service.description}</p>
                
            </div>
        ))}
    </Slider>
    )}
</div>
  )
}

export default SecondSection