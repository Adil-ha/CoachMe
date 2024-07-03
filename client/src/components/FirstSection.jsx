import React from 'react'
import style from './FirstSection.module.css'

const FirstSection = () => {
  return (
    <div className={style.firstSection}>
      <h1 className={style.headline}>Transformez chaque défi en victoire : Découvrez votre potentiel avec CoachMe !</h1>
      <p className={style.subtitle}>100% personnalisé     à domicile, en plein air, en visio...</p>
    </div>
  )
}

export default FirstSection