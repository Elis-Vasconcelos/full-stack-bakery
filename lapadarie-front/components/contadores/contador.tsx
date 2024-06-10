import Image from "next/image";
import Pessoa from "../../public/iconPessoas.svg";
import Carrinho from"../../public/iconCarrinho.svg";
import Dinheiro from "../../public/iconDinheiro.svg";
import style from "./contador.module.css";

export default function Contador(){
    return(
        <div className={style.contadores}>

            <div className={style.fila}>
                <div className={style.topo}>
                    <h6>Pessoas na fila</h6>
                    <Image className={style.imagem} src={Pessoa} alt="Pessoas" />
                </div>
                
                <h3>7</h3> {/* O número de pessoas na fila tem que ser um dado que vem do banco de dados*/}

            </div>


            <div className={style.pao}>
                <div className={style.topo}>
                    <h6>Pães vendidos</h6>
                    <Image className={style.imagem} src={Carrinho} alt="carrinhoDePao" />
                </div>
                
                <h3>350</h3> {/* A quantidade de pães vendidos tem que ser um dado que vem do banco de dados*/}

            </div>
            

            <div className={style.totalVenda}>
                <div className={style.topo1}>
                    <h6>Entrada</h6>
                    <Image className={style.imagem} src={Dinheiro} alt="dinheiroTotal" />
                </div>
                
                <h3>R$ 175,00</h3> {/* O valor total de pão vendido tem que ser um dado que vem do banco de dados*/}

            </div>







        </div>
    )
}