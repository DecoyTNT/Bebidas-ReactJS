import React, { createContext, useState, useEffect } from 'react';
import Axios from 'axios';

export const RecetasContext = createContext();

const RecetasProvider = (props) => {

    const [recetas, setRecetas] = useState([]);

    const [busquedaReceta, setBusquedaReceta] = useState({
        nombre: '',
        categoria: ''
    });

    const [consultar, setConsultar] = useState(false);

    const { nombre, categoria } = busquedaReceta;

    useEffect(() => {
        if (consultar) {
            const obtenerRecetas = async () => {
                const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${nombre}&c=${categoria}`;
                const resp = await Axios.get(url);
                // console.log(resp.data.drinks);
                setRecetas(resp.data.drinks);
            }
            obtenerRecetas();
            setConsultar(false);
        }
    }, [consultar, nombre, categoria])

    return (
        <RecetasContext.Provider
            value={{
                recetas,
                setBusquedaReceta,
                setConsultar
            }}
        >
            {props.children}
        </RecetasContext.Provider>
    );
}

export default RecetasProvider;