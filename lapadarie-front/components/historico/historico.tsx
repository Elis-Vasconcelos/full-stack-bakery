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

  return (
    <div className={style.historicoContainer}>
      <h3 className={style.historicoTitulo}>Histórico</h3>
      {historico.map(item => (
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
