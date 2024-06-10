import Image from "next/image";
import Lixeira from "../../public/lixeira.svg";
import style from "./fila.module.css";


export default function Fila(){
    return(
        <div className={style.fila}>

            <button className={style.botao}><h3>+ Adicionar pessoas a fila</h3></button>

            <div className={style.cards}>
                <div className="info">
                    <h6>Nome</h6>
                    <h6>Total de pão:</h6>
                    <h6>Total a pagar:</h6>
                </div>

                <Image className='{style.imagem}' src={Lixeira} alt="lixeira" />

            </div>

        </div>
    )
}