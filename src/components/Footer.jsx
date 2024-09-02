import React from "react";

import githubIcon from "../assets/logo-github.svg";
import linkedinIcon from "../assets/logo-linkedin.svg";

const Footer = () => {
  return (
    <footer className="border-t-2 border-[#1E1E1E] py-4 flex mt-auto flex-col gap-2">
      <div>
        <p className="text-[#353535]">
          <span className="font-bold">Taskify</span> es un proyecto de practica
          donde podes crear tus tareas (Editarlas, eliminarlas y completarlas),
          crear proyectos para tener tus notas sobre un proyecto en especifico
          en un solo lugar y ver los progresos del mismo.
        </p>
      </div>
      <div className="flex gap-2">
        <a
          href="https://github.com/agustin-gauna"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src={githubIcon} alt="Github logo" />
        </a>
        <a
          href="https://www.linkedin.com/in/gauna-agustin/"
          target="_blank"
          rel="noreferrer noopener"
        >
          <img src={linkedinIcon} alt="Linkedin logo" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
