import { t } from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import i18n from "i18next";
import LogoutButton from "../../login/auth/LogoutButton";
import "./header.css";
import usuario from "../../../public/images/usuarios.png";
import search from "../../../public/images/busqueda.png";
import axios from "axios";
import { useEffect } from "react";

function Header() {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  const peticionGet = async () => {
    await axios
      .get("api/v1/articules")
      .then((res) => {
        setUsers(res.data);
        setArticles(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
  };

  const filtrar = (terminoBusqueda) => {
    var resultadoBusqueda = setArticles.filter((elemento) => {
      if (
        elemento.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return elemento;
      }
    });
    setUsers(resultadoBusqueda);
  };

  useEffect(() => {
    peticionGet();
  }, []);

  const { t } = useTranslation();

  const [language, setLanguage] = useState("es");
  const onChangeLanguage = () => {
    i18n.changeLanguage(language);
    if (language === "es") {
      setLanguage("en");
    } else {
      setLanguage("es");
    }
  };
  return (
    <header className="Header">
      <div className="Header2">
        {" "}
        <img src={usuario} />
        <NavLink to="/">
          <h1 className="title-header">{t("header.welldone")}</h1>

          <h3 className="title-header2">
            <i>{t("header.stay-curious")}</i>{" "}
          </h3>
        </NavLink>
        <div className="box-search">
          <input
            onChange={handleChange}
            placeholder="Search"
            className="search"
            type="search"
          ></input>
          <img className="search1" src={search} />
        </div>
        <a className="button-settings" onClick={onChangeLanguage}>
          <i>EN/ES</i>
        </a>
        <nav className="header-nav">
          <LogoutButton className="button" />
        </nav>
      </div>
      <div className="Header3">
        <h2 className="title-staycurious">Stay curious.</h2>
        <h5 className="parrafo">{t("header.parrafo")}</h5>{" "}
        <nav className="header-nav">
          <LogoutButton className="button" />
        </nav>
      </div>
    </header>
  );
}

export default Header;
