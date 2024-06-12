export default function Form (){
    return(
        <form className="formulario">
            
            <div className="nome">
                <input type="text" placeholder="Nome completo do cliente"></input>
            </div>

            <div className="pao">
                <input type="number" placeholder="Total de pão"></input>
            </div>


        </form>
    )
}