import React, { useState, useEffect } from "react";
import style from "./editForm.module.css";
import { Cliente } from "../fila/fila";

interface EditFormProps {
  cliente: Cliente;
  onSave: (cliente: Cliente) => void;
  onClose: () => void;
}

const EditForm: React.FC<EditFormProps> = ({ cliente, onSave, onClose }) => {
  const [nome, setNome] = useState(cliente.nome);
  const [totalPao, setTotalPao] = useState(cliente.totalPao.toString());
  const [totalPagar, setTotalPagar] = useState(cliente.totalPagar.toString());
  const precoPorPao = 3.5; 
  useEffect(() => {
    
    setTotalPagar((parseInt(totalPao) * precoPorPao).toFixed(2));
  }, [totalPao]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...cliente,
      nome,
      totalPao: parseInt(totalPao),
      totalPagar: parseFloat(totalPagar),
    });
  };

  return (
    <div className={style.overlay}>
      <div className={style.modal}>
        <h4>Editar pessoa na fila</h4>
        <form onSubmit={handleSubmit}>
          <div className={style.formGroup}>
            <label htmlFor="nome">Nome:</label>
            <input
              id="nome"
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="totalPao">Total de Pão:</label>
            <input
              id="totalPao"
              type="number"
              value={totalPao}
              onChange={(e) => setTotalPao(e.target.value)}
              required
            />
          </div>
          <div className={style.formGroup}>
            <label htmlFor="totalPagar">Total a Pagar:</label>
            <input
              id="totalPagar"
              type="number"
              step="0.01"
              value={totalPagar}
              readOnly
            />
          </div>
          <div className={style.formActions}>
            <button type="submit" className={style.saveButton}>Salvar</button>
            <button type="button" className={style.cancelButton} onClick={onClose}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditForm;
