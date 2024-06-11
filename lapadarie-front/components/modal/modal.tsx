import React from "react";
import style from "./modal.module.css";

interface ModalProps{
    isOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({isOpen}) => {

    if(!isOpen){

        return null;
    }


     return(

        <div className={style.overlay}>

            <div className={style.modal}>
                <h4>Adicionar pessoa a fila</h4>

                <div className={style.botaoModal}>
                    <button className={style.enviar}>Enviar</button>
                    <button className={style.cancelar}>Cancelar</button>
                </div>
            </div>            

        </div>
            
    )


    
}; 

export default Modal;