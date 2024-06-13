import style from "./historico.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Historico {
  id: number;
  nome: string;
  totalPao: number;
  totalPagar: number;
}

export default function Historico() {
  const [historico, setHistorico] = useState<Historico[]>([]);
  const [isHistoricoVisible, setIsHistoricoVisible] = useState(true);

  const fetchHistorico = async () => {
    try {
      const response = await axios.get('http://localhost:3000/getHistorico');
      setHistorico(response.data);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
    }
  };

  useEffect(() => {
    fetchHistorico();
    const interval = setInterval(fetchHistorico, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleHistorico = () => {
    setIsHistoricoVisible(!isHistoricoVisible);
  };

  return (
    <div className={style.historicoContainer}>
      <button className={style.historicoBotao} onClick={toggleHistorico}>
        <h4>Histórico</h4>
      </button>
      {isHistoricoVisible && historico.map(item => (
        <div key={item.id} className={style.historicoCard}>
          <div className={style.historicoInfo}>
            <h4>{item.nome}</h4>
            <h6>Total de pão: {item.totalPao}</h6>
            <h6>Total a pagar: {item.totalPagar.toFixed(2)}</h6>
          </div>
        </div>
      ))}
    </div>
  );
}
