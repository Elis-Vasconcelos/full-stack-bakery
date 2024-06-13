import style from "./fila.module.css";
import React, { useEffect, useState } from "react";
import Modal from '../modal/modal'
import axios from "axios";
import Image from "next/image";
import Lixeira from "../../public/lixeira.svg"

interface Cliente {
    id: number;
    nome: string;
    totalPao: number;
    totalPagar: number;
  }

export default function Fila(){ 

    const [modalOpen, setModalOpen] = useState(false);

    const [clientes, setClientes] = useState<Cliente[]>([]);

    const sairDaFila = async (id: number) => {
        try {
            await axios.post('http://localhost:3000/userSairFila', { id });

            // Atualiza a lista de clientes após a remoção
            const clientesAtualizados = clientes.filter(cliente => cliente.id !== id);
            setClientes(clientesAtualizados);
        } catch(error) {
            console.log('Erro ao retirar cliente:', error)
        }
    }

    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getFila');
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes na fila:', error);
      }
    };

    useEffect(() => {
        // Busca dados iniciais
        fetchClientes();
        
        // Configura intervalo para buscar dados
        const interval = setInterval(fetchClientes, 1000); // Busca a cada 1 segundos

        // Limpa o intervalo quando o componente é desmontado
        return () => clearInterval(interval);
      }, []);

    return(
        <div className={style.fila}>

            <button className={style.botao} onClick={() => setModalOpen(true)}>
                <h3> + Adicionar pessoas a fila</h3>
            </button>

            <div className="modal">

                <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}/>

            </div>
            
            {clientes.map(cliente => (
                <div key={cliente.id} className={style.cards}>
                <div className="info">
                    <h4>{cliente.nome}</h4>
                    <div className={style.compra}>
                    <h6>Total de pão: {cliente.totalPao}</h6>
                    <h6>Total a pagar: {cliente.totalPagar.toFixed(2)}</h6>
                    </div>
                </div>

                <button className={style.lixo} onClick={() => sairDaFila(cliente.id)}>
                    <Image className='lixo' src={Lixeira} alt="lixeira" />
                </button>

            </div>
            ))}
        </div>
    )
}
