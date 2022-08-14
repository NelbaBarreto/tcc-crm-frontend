import React, {useState} from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro'

const Navbar = () => {
  const [activo, setActivo] = useState(false);

  const changeEstado = () => {
    setActivo(current => !current);
  };

  return (
    <><nav class="nav shadow-gray-800">
      <div class="container">
        <label for="menu-toggle" class="nav-toggle">
          <span></span>
          <span></span>
          <span></span>
        </label>
        <input type="checkbox" id="menu-toggle" class="is-hidden" />
        <div class="nav-right nav-menu">
          <a class="nav-item is-tab is-hidden-tablet">
            <span class="icon"><i class="fa fa-home"></i></span> Home
          </a>
          <a class="nav-item is-tab is-hidden-tablet">
            <span class="icon"><i class="fa fa-table"></i></span> Links
          </a>
          <a class="nav-item is-tab is-hidden-tablet">
            <span class="icon"><i class="fa fa-info"></i></span> About
          </a>

          <a class="nav-item is-tab is-active">
            <span class="icon"><i class="fa fa-user"></i></span>
          </a>
          <a class="nav-item is-tab">
            <span class="icon"><i class="fa fa-sign-out"></i></span>
          </a>
        </div>
      </div>
    </nav><section class="main-content columns is-fullheight">

        <aside class="column is-2 is-narrow-mobile is-fullheight section is-hidden-mobile">
          <p class="menu-label is-hidden-touch">Navigation</p>
          <ul class="menu-list">
            <li>
              <a href="#" class="">
                <span class="icon"><i class="fa fa-home"></i></span> Home
              </a>
            </li>
            <li>
              <a href="#" class="is-active">
                <span class="icon"><i class="fa fa-table"></i></span> Links
              </a>

              <ul>
                <li>
                  <a href="#">
                    <span class="icon is-small"><i class="fa fa-link"></i></span> Link1
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span class="icon is-small"><i class="fa fa-link"></i></span> Link2
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#" class="">
                <span class="icon"><i class="fa fa-info"></i></span> About
              </a>
            </li>
          </ul>
        </aside>
      </section></>
  );
}

export default Navbar;