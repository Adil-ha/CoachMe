import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import style from './ThirdSection.module.css';

const ThirdSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000
  };

  return (
    <div className={style.thirdSection}>
    <h2>Comment ça marche ?</h2>
    <Slider {...settings}>
      <div className={style.slide}>
        <h3><span className={style.number}>1.</span> Créer un compte</h3>
        <p>Inscrivez-vous sur notre plateforme pour commencer.</p>
      </div>
      <div className={style.slide}>
        <h3><span className={style.number}>2.</span> Remplir le formulaire de coaching</h3>
        <p>Donnez-nous des informations sur vos objectifs et besoins.</p>
      </div>
      <div className={style.slide}>
        <h3><span className={style.number}>3.</span> Un conseiller vous rappelle</h3>
        <p>Nous vous contacterons pour définir vos besoins plus en détail.</p>
      </div>
      <div className={style.slide}>
        <h3><span className={style.number}>4.</span> Commencez votre séance avec votre coach</h3>
        <p>Démarrez vos séances de coaching et atteignez vos objectifs !</p>
      </div>
    </Slider>
  </div>
  );
};

export default ThirdSection;
