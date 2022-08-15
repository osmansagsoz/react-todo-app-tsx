import css from "./footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faGithub, faCodepen } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
    return (
        <footer>
        <h3>&copy; Osman Sağsöz 2022</h3>
        <ul className={css.foot}>
          <li>
            <a
              href="https://www.linkedin.com/in/osman-sagsoz-053621225/"
              target="_blank"
              rel="noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedinIn} />
            </a>
          </li>
          <li>
            <a href="https://github.com/osmansagsoz" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faGithub} />
            </a>
          </li>
          <li>
            <a href="https://codepen.io/osmansagsoz" target="_blank" rel="noreferrer">
            <FontAwesomeIcon icon={faCodepen} />
            </a>
          </li>
        </ul>
      </footer>
    )
}

export default Footer