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
                <p>MODAL ABERTO</p>
            </div>

        </div>
            
    )


    
}; 

export default Modal;