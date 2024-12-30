import React, { useState, useEffect, useRef } from "react";
import "./card.css";

const Card = ({ image, fetchType, id }) => {
  const [isActive, setIsActive] = useState(false);
  const cardRef = useRef(null);

  // handle click outside the card to take off the active className from the card
  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setIsActive(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleCardClick = () => {
    setIsActive(!isActive);
  };

  return (
    <figure
      className={`card ${fetchType} ${isActive ? "active" : ""}`}
      ref={cardRef}
      onClick={handleCardClick}
      style={{ "--i": id }}
    >
      <img src={image.image} alt={`${fetchType} fake image nr: ${id}`} />

      <figcaption className="caption">
        <div>Name: {image.name}</div>
        <div>
          Origin: {fetchType === "birds" ? image.place_of_found : image.origin}
        </div>
      </figcaption>

      <article className="card-content">
        {fetchType === "dogs" && (
          <ul>
            <li>Name: &nbsp;{image.name}</li>
            <li>Breed_group: &nbsp;{image.breed_group}</li>
            <li>Size: &nbsp;{image.size}</li>
            <li>Lifespan: &nbsp;{image.lifespan}</li>
            <li>Temperament: &nbsp;{image.temperament}</li>
            <li>Description: &nbsp;{image.description}</li>
          </ul>
        )}

        {fetchType === "cats" && (
          <ul>
            <li>Name: &nbsp;{image.name}</li>
            <li>Origin: &nbsp;{image.origin}</li>
            <li>Temperament: &nbsp;{image.temperament}</li>
            <li>Color: &nbsp;{[image.colors]}</li>
            <li>Description: &nbsp;{image.description}</li>
          </ul>
        )}

        {fetchType === "birds" && (
          <ul>
            <li>Name: &nbsp;{image.name}</li>
            <li>Species: &nbsp;{image.species}</li>
            <li>Family: &nbsp;{image.family}</li>
            <li>Habitat: &nbsp;{image.habitat}</li>
            <li>Diet: &nbsp;{image.diet}</li>
            <li>Weight_kg : &nbsp;{image.weight_kg}</li>
            <li>Wingspan_cm :&nbsp;{image.wingspan_cm}</li>
            <li>Place_of_found: {image.place_of_found}</li>
            <li>Description: &nbsp;{image.description}</li>
          </ul>
        )}
      </article>
    </figure>
  );
};

export default Card;
