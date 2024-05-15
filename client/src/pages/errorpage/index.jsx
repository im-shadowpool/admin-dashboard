/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import "./index.css";

const ErrorPage = () => {
  const eyeRef = useRef(null);
  const eyeballRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      const eye = eyeRef.current;
      // const eyeball = eyeballRef.current;

      const x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
      const y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);

      const radian = Math.atan2(event.pageX - x, event.pageY - y);
      const rot = (radian * (180 / Math.PI) * -1) + 270;
      eye.style.transform = "rotate(" + rot + "deg)";
    };

    const handleMouseOver = () => {
      eyeballRef.current.style.left = "50%";
    };

    const handleMouseOut = () => {
      eyeballRef.current.style.left = "36%";
    };

    document.querySelector('body').addEventListener('mousemove', handleMouseMove);
    eyeballRef.current.addEventListener("mouseover", handleMouseOver);
    eyeballRef.current.addEventListener("mouseout", handleMouseOut);

    // Clean up the event listeners when the component unmounts
    return () => {
      document.querySelector('body').removeEventListener('mousemove', handleMouseMove);
      eyeballRef.current?.removeEventListener("mouseout", handleMouseOut);
      eyeballRef.current?.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div className="bg-error">
      <div className="text_404">
        <h1>4</h1>
        <div className="eye" ref={eyeRef}>
          <div className="eyeball" ref={eyeballRef}></div>
        </div>
        <h1>4</h1>
      </div>
      <p className="description">Oops! page not found</p>
    </div>
  );
};

export default ErrorPage;