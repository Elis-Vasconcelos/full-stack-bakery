import style from "./page.module.css";
import Contador from "../../components/contadores/contador";

export default function Home() {
  return (
    <main className={style.corpo}>

      <Contador/>

    </main>
    
  );
}
