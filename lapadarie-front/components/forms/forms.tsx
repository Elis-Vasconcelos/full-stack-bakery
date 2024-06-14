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
    const [inputValue, setInputValue] = useState(""); // Estado para controlar o valor do campo de entrada

    const calcularTotalPagar = () => {
        return totalPao * precoDoPao;
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Faz a solicitação POST para o backend
            await axios.post('http://localhost:3000/user', {
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
            alert('Erro ao criar cliente. Tente novamente.');
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
                required // Torna o campo obrigatório
            />
            </div>

            <div className={style.pao}>
            <input
                type="text"
                placeholder="Total de pão"
                value={inputValue}
                onChange={(e) => {
                    const val = e.target.value;
                    setInputValue(val); // Atualiza o valor do campo de entrada
                    setTotalPao(val === "" ? 0 : Number(val)); // Atualiza o estado totalPao com um número
                }}
                pattern="^[1-9][0-9]*$" // Padrão que não permite zero ou números negativos
                required // Torna o campo obrigatório
                onFocus={(e) => e.target.select()}
            />
            </div>

            <div className={style.botaoModal}>
                <button type="submit" className={style.enviar}>Enviar</button>
                <button type="button" className={style.cancelar} onClick={onClose}>Cancelar</button>
            </div>
        </form>
    );
}