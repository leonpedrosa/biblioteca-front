import axios from "axios";
import React from "react";

function Rent() {
    const [result, setOpen] = React.useState(false);

    // const fetchAlugueisData = async () => {
    //     try {
    //         const response = await axios.get('http://127.0.0.1:8001/api/rent')
            
    //     }
    //     catch (error) {
    //         console.error('Erro requisição', error)
    //         throw error
    //     }
    // }
    return (
        <div>
            {result ? (
                <h1>Alugueis com dados  </h1>
            ) : (
                <h1>Alugueis sem dados </h1>
            )}
        </div>
    );
}

export default Rent;
