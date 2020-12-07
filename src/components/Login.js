import React, { useState } from "react";
import styles from "../styles/Login.module.scss";

import axios from "axios";
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const [ID, setID] = useState("");
  const [name, setName] = useState("");

  let history = useHistory();

  const userAuth = () => {
    const url = "https://dev.teledirectasia.com:3092";
    axios
      .post(`${url}/login`, { name: name, apiKey: ID })
      .then((response) => {
        const processedObject = {
          ...response.data,
          name: response.data.token.name,
          token: response.data.token.token,
        };
        sessionStorage.setItem("loginSession", JSON.stringify(processedObject));
        history.push("/dashboard");
        alert(response.data.msg);
      })
      .catch((error) => {
        alert(error.response.data.msg);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <p className={styles.loginHeader}>Login</p>
        <input
          className={styles.id}
          type="text"
          value={ID}
          onChange={(e) => setID(e.target.value)}
          placeholder="Id"
        ></input>
        <input
          className={styles.name}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        ></input>
        <button className={styles.loginBtn} onClick={userAuth}>
          Login
        </button>
      </div>
    </div>
  );
}
