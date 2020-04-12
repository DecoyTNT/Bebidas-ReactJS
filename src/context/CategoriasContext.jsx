import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

// Crear context
export const CategoriasContext = createContext();

// Provider donde se encuentran las funciones y state
const CategoriasProvider = (props) => {

    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const obetenerCategorias = async () => {
            const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

            const resp = await Axios.get(url);
            // console.log(resp.data.drinks);
            setCategorias(resp.data.drinks);
        }
        obetenerCategorias();
    }, [])

    return (
        <CategoriasContext.Provider
            value={{
                categorias
            }}
        >
            {props.children}
        </CategoriasContext.Provider>
    );
}

export default CategoriasProvider;