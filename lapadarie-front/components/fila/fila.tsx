import style from "./fila.module.css";
import React, { useEffect, useState } from "react";
import Modal from '../modal/modal'
import axios from "axios";
import Image from "next/image";
import Lixeira from "../../public/lixeira.svg";
import EditForm from "../editForm/editForm";
import Caneta from "../../public/caneta.svg";

export interface Cliente {
    id: number;
    nome: string;
    totalPao: number;
    totalPagar: number;
  }

export default function Fila() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [clienteAtual, setClienteAtual] = useState<Cliente | null>(null);

      const abrirModalAdicao = () => {
        setIsAddModalOpen(true);
      };
    
      const abrirModalEdicao = (cliente: Cliente) => {
        setClienteAtual(cliente);
        setIsEditModalOpen(true);
      };
    
      const fecharModalEdicao = () => {
        setIsEditModalOpen(false);
      };
    

    const atualizarCliente = async (cliente: Cliente) => {
        try {
        await axios.put('http://localhost:3000/updateUser', cliente);
        fetchClientes(); // Atualiza a lista de clientes
        setIsEditModalOpen(false);
        } catch (error) {
        console.error('Erro ao atualizar cliente:', error);
        alert('Erro ao atualizar cliente. Tente novamente.');
        }
    };

    const sairDaFila = async (id: number) => {
        try {
            await axios.post('http://localhost:3000/userSairFila', { id });

            // Atualiza a lista de clientes após a remoção
            const clientesAtualizados = clientes.filter(cliente => cliente.id !== id);
            setClientes(clientesAtualizados);
        } catch(error) {
            console.log('Erro ao retirar cliente:', error)
            alert('Erro ao retirar cliente. Tente novamente.');
        }
    }

    const fetchClientes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getFila');
        setClientes(response.data);
      } catch (error) {
        console.error('Erro ao buscar clientes na fila:', error);
       alert('Erro ao buscar cliente na fila. Tente novamente.');
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

      return (
        <div className={style.fila}>
    
            <button className={style.botao} onClick={() => abrirModalAdicao()}>
                <h3> + Adicionar pessoas a fila</h3>
            </button>
    
            {isAddModalOpen && (
                <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
            )}

    
            {clientes.map(cliente => (
                <div key={cliente.id} className={style.cards}>
                    <div className="info">
                        <h4>{cliente.nome}</h4>
                        <div className={style.compra}>
                            <h6>Total de pão: {cliente.totalPao}</h6>
                            <h6>Total a pagar: {cliente.totalPagar.toFixed(2)}</h6>
                        </div>
                    </div>
                    <div className="actions">
                        <button className={style.caneta} onClick={() => abrirModalEdicao(cliente)}>
                            <Image className='pen' src={Caneta} alt="caneta" />
                        </button>
                        <button className={style.lixo} onClick={() => sairDaFila(cliente.id)}>
                            <Image className='lixo' src={Lixeira} alt="lixeira" />
                        </button>
                    </div>
                </div>
            ))}

            {isEditModalOpen && clienteAtual && (
                    <EditForm
                    cliente={clienteAtual}
                    onClose={fecharModalEdicao}
                    onSave={atualizarCliente}
                    />
                )}

            
        </div>
    )};