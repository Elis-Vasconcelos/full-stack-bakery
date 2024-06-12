import React, { useState } from 'react';
import style from './fila.module.css';

export default function Form() {
    const [nomeCliente, setNomeCliente] = useState('');
    const [totalPao, setTotalPao] = useState(0);

    // Função para calcular o preço
    const calcularPreco = () => {
        const preco = totalPao * 2;
        return preco;
    };

    return (
        <form className={style.formulario}>
            <div className="nome">
                <input
                    type="text"
                    placeholder="Nome completo do cliente"
                    value={nomeCliente}
                    onChange={(e) => setNomeCliente(e.target.value)}
                />
            </div>

            <div className="pao">
                <input
                    type="number"
                    placeholder="Total de pão"
                    value={totalPao}
                    onChange={(e) => setTotalPao(Number(e.target.value))}
                />
            </div>

            <div>
                Preço: R$ {calcularPreco()}
            </div>
        </form>
    );
}
