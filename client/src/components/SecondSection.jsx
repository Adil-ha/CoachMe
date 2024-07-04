import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPerformances } from '../features/PerformanceSlice';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import style from './SecondSection.module.css';

const SecondSection = () => {
    const dispatch = useDispatch();
    const performances = useSelector((state) => state.performances.performances);
    const loading = useSelector((state) => state.performances.loading);
    const error = useSelector((state) => state.performances.error);

    useEffect(() => {
        dispatch(fetchAllPerformances());
    }, [dispatch]);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
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
                    {performances.map((performance) => (
                        <div key={performance.id} className={style.serviceCard}>
                            <h3>{performance.type}</h3>
                            <img src={performance.image} alt={performance.type} />
                            <p>{performance.description}</p>
                        </div>
                    ))}
                </Slider>
            )}
        </div>
    );
};

export default SecondSection;