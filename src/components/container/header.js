import { Loader } from "../loader/loader";
import css from "./container.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState, useRef } from "react";

export const Header = ({ appState }) => {
  const [visible, setVisible] = useState(true);
  const timeOutRef = useRef();

  useEffect(() => {
    if(appState === "Tags data loaded!") {
     timeOutRef.current = setTimeout(() => {
        setVisible(false)
      }, 3000)
    } else {
      setVisible(true);
    }
    return () => {
      if(timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
    }
  }, [appState])
    return (
        <header>
          <h1 className={css.title}>React Todo App</h1>
          <p className={css.headerP}>{visible ? appState : null}</p>
          {appState === "Loading" ? <Loader /> : null}
          <FontAwesomeIcon icon={faCheckDouble} className={css.icon} />
        </header>
    )
}