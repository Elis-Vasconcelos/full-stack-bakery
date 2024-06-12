"use client"

import style from "./page.module.css";
import Contador from "../../components/contadores/contador";
import Fila from "../../components/fila/fila";
import Historico from "../../components/historico/historico";

export default function Home() {
  return (
    <main className={style.corpo}>

      <Contador/>

      <Fila/>

      <Historico />

    </main>
    
  );
}
