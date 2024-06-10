import style from "./page.module.css";
import Contador from "../../components/contadores/contador";
import Fila from "../../components/fila/fila";

export default function Home() {
  return (
    <main className={style.corpo}>

      <Contador/>

      <Fila/>

    </main>
    
  );
}
