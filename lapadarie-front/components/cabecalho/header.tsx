import Image from "next/image";
import Logo from "../../public/Logo.svg"
import styles from "./header.module.css"

export default function Cabecalho(){
    return(
        <div className={styles.cabecalho}>
            <Image className={styles.logo} src={Logo} alt="Logo" priority />
        </div>
    )
}