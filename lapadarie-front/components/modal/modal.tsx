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

        <div className={style.modal}>
            <h3>MODAL</h3>
        </div>
            
    )


    
}; 

export default Modal;