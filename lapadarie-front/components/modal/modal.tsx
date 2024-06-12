import React from "react";
import style from "./modal.module.css";
import Form from "../forms/forms";

interface ModalProps{
    isOpen: boolean;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({isOpen, onClose}) => {

    if(!isOpen){

        return null;
    }


     return(

        <div className={style.overlay}>

            <div className={style.modal}>
                <h4>Adicionar pessoa a fila</h4>

                <div className="form">
                    <Form/>
                </div>

                <div className={style.botaoModal}>
                    <button className={style.enviar}>Enviar</button>
                    <button type="submit" className={style.cancelar} onClick={onClose}>Cancelar</button>
                </div>
            </div>            

        </div>
            
    )


    
}; 

export default Modal;