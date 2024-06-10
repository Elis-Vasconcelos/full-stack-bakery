"use client";

import Image from "next/image";
import Lixeira from "../../public/lixeira.svg";
import style from "./fila.module.css";
import { use, useState } from "react";


export default function Fila(){ 

    const [mostrarForms, setMostrarForms] = useState(false);
    const [nomeCliente, setnomeCliente] = useState<string>('');
    const [totalPao, setTotalPao] = useState<number>(0);
    const [totalPagar, setTotalPagar] = useState<number>(0);
    const [fila, setFila] = useState<{ nome: string, pao: number, pagar: number }[]>([]);


    const visivelAoClick = () =>{ //controlar a visibilidade do forms
        setMostrarForms(!mostrarForms);
    };

    const enviarForms = (event: React.FormEvent) =>{ //controlar o envio do forms
        event.preventDefault();
        setFila([...fila, { nome: nomeCliente, pao: totalPao, pagar: totalPagar } ]);
        setnomeCliente('');
        setTotalPao(0);
        setTotalPagar(0);
        setMostrarForms(false);
    }

    return(
        <div className={style.fila}>

            <button className={style.botao}>
                <h3>+ Adicionar pessoas a fila</h3>
            </button>

            <div className="formulario">
                <h3>Adicionar pessoa a fila</h3>

                <div className="campoForms">
                    <label>Nome</label>
                    <input 
                            type="text" 
                            value={nomeCliente}
                            placeholder="Nome completo do cliente"
                        />
                </div>



            </div>

            <div className={style.cards}>
                <div className="info">
                    <h4>Nome</h4>
                    <div className={style.compra}>
                        <h6>Total de pão:</h6>
                        <h6>Total a pagar:</h6>
                    </div>
                    
                </div>

                <button className={style.lixo}><Image className='lixo' src={Lixeira} alt="lixeira" /></button>

            </div>

        </div>
    )
}