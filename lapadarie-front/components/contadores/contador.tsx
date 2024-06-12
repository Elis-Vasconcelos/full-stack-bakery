import Image from "next/image";
import Pessoa from "../../public/iconPessoas.svg";
import Carrinho from "../../public/iconCarrinho.svg";
import Dinheiro from "../../public/iconDinheiro.svg";
import style from "./contador.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = 'http://localhost:3000/getEstatisticas';

export default function Contador() {
    const [estatisticas, setEstatisticas] = useState({ totalPao: 0, totalPagar: 0, tamanhoFila: 0 });

    const fetchData = async () => {
        try {
            const response = await axios.get(apiUrl);
            setEstatisticas(response.data);
        } catch (error) {
            console.error('Error fetching dados das estatisticas:', error);
        }
    };

    useEffect(() => {
        // Busca dados iniciais
        fetchData();

        // Configura intervalo para buscar dados
        const interval = setInterval(fetchData, 1000); // Busca a cada 1 segundos

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={style.contadores}>

            <div className={style.fila}>
                <div className={style.topo}>
                    <h6>Pessoas na fila</h6>
                    <Image className={style.imagem} src={Pessoa} alt="Pessoas" />
                </div>
                
                <h3>{estatisticas.tamanhoFila}</h3> {/* O número de pessoas na fila tem que ser um dado que vem do banco de dados*/}

            </div>

            <div className={style.pao}>
                <div className={style.topo}>
                    <h6>Pães vendidos</h6>
                    <Image className={style.imagem} src={Carrinho} alt="carrinhoDePao" />
                </div>
                
                <h3>{estatisticas.totalPao}</h3> {/* A quantidade de pães vendidos tem que ser um dado que vem do banco de dados*/}

            </div>

            <div className={style.totalVenda}>
                <div className={style.topo1}>
                    <h6>Entrada</h6>
                    <Image className={style.imagem} src={Dinheiro} alt="dinheiroTotal" />
                </div>
                
                <h3>R$ {estatisticas.totalPagar.toFixed(2)}</h3> {/* O valor total de pão vendido tem que ser um dado que vem do banco de dados*/}

            </div>
        </div>
    );
}
