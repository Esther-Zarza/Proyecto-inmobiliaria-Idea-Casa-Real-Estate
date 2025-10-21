import { useState, useMemo } from "react";
import { Carousel } from "react-bootstrap";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import "./imageCarousel.css";

export default function ImageCarousel({
  images = [],
  ribbonText,
  ribbonVariant = "blue", // 'blue' | 'red'
  price,
  onImageClick,
  alt = "foto de la propiedad",
  price_hidden
}) {
  const [index, setIndex] = useState(0);

  // Si no hay imágenes, usa un placeholder
  const imgs = useMemo(
    () => (images?.length ? images : ["/images/bg/bg-Home.jpg"]),
    [images]
  );

  return (
    <div className="ic-wrapper">
      <Carousel
        className="ic-carousel"
        activeIndex={index}
        onSelect={(i) => setIndex(i)}
        interval={null}
        pause={false}
        controls={true}
        indicators={false}
        touch
      >
        {imgs.map((src, i) => (
          <Carousel.Item key={i} onClick={onImageClick}>
            <img src={src} alt={alt} loading="lazy" />
          </Carousel.Item>
        ))}
      </Carousel>

      {imgs.length > 1 && (
        <>
          <button
            className="ic-nav ic-prev"
            aria-label="Anterior"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((p) => (p === 0 ? imgs.length - 1 : p - 1));
            }}
          >
            <BsChevronLeft />
          </button>
          <button
            className="ic-nav ic-next"
            aria-label="Siguiente"
            onClick={(e) => {
              e.stopPropagation();
              setIndex((p) => (p === imgs.length - 1 ? 0 : p + 1));
            }}
          >
            <BsChevronRight />
          </button>
        </>
      )}

      {ribbonText && (
  <div className={`ic-ribbon ${ribbonVariant === "red" ? "red" : "blue"}`}>
    <p>{ribbonText}</p>
    {price_hidden ?
      <p>
      {Number(price).toLocaleString('es-ES')} €
      </p>
      :
      ('')
    }
  </div>
)}

    </div>
  );
}
