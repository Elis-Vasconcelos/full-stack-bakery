import React, { useState } from 'react';
import style from './forms.module.css';
import axios, { AxiosResponse } from 'axios';
import {Cliente} from '../fila/fila';

interface FormProps {
    onClose: () => void;
}

let precoDoPao = 3.5;

export default function Form({onClose}: FormProps) {
    const [nomeCliente, setNomeCliente] = useState('');
    const [totalPao, setTotalPao] = useState(0);

    const calcularTotalPagar = () => {
        return totalPao * precoDoPao;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Faz a solicitação POST para o backend
            const response: AxiosResponse<Cliente> = await axios.post('http://localhost:3000/user', {
                nome: nomeCliente,
                totalPao: totalPao,
                totalPagar: calcularTotalPagar(),
            });

            // Limpa os campos após o envio
            setNomeCliente('');
            setTotalPao(0);

            // Fecha o modal após o envio bem-sucedido
            onClose();

        } catch (error) {
            console.log('Erro ao criar usuário:', error)
        }
    }
return (
        <form className={style.formulario} onSubmit={handleSubmit}>
            <div className={style.nome}>
                <input
                    type="text"
                    placeholder="Nome completo do cliente"
                    value={nomeCliente}
                    onChange={(e) => setNomeCliente(e.target.value)}
                />
            </div>

            <div className={style.pao}>
                <input
                    type="number"
                    placeholder="Total de pão"
                    value={totalPao}
                    onChange={(e) => setTotalPao(Number(e.target.value))}
                />
            </div>

            <div className={style.botaoModal}>
                <button type="submit" className={style.enviar}>Enviar</button>
                <button type="button" className={style.cancelar} onClick={onClose}>Cancelar</button>
            </div>
        </form>
    );
}