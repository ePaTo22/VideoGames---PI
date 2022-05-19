import React from "react";
import { NavLink } from "react-router-dom";
import s from "../components/styles/land.module.css";

//<LandingFrame />

export default function LandingPage() {
  return (
    <React.Fragment>
      <div className={s.container}>
        <div>
          <div>
            <h3 className={s.text}>
              This video game site was created by Patricio Turpin. <br /> Click
              the button below to go to the site, enjoy!!
            </h3>
          </div>
          <NavLink to={"/home"}>
            <button className={s.button} src="/home">
              LETS GO!
            </button>
          </NavLink>
        </div>
      </div>
    </React.Fragment>
  );
}
// style={{ backgoundColor: "aqua" }}
// <img class={s.image} src={landIMG} alt="landingImg" />
