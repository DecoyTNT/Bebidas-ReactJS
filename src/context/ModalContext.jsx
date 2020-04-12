import React, { useState, useEffect, createContext } from 'react';
import Axios from 'axios';

export const ModalContext = createContext();

const ModalProvider = (props) => {

    const [idReceta, setIdReceta] = useState(null);
    const [info, setInfo] = useState({});

    useEffect(() => {

        const obtenerReceta = async () => {
            if (!idReceta) return;
            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;
            const resp = await Axios.get(url);
            setInfo(resp.data.drinks[0]);
        }
        obtenerReceta();
    }, [idReceta])

    return (
        <ModalContext.Provider
            value={{
                info,
                setInfo,
                setIdReceta
            }}
        >
            {props.children}
        </ModalContext.Provider>
    );
}

export default ModalProvider;