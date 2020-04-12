import React, { useContext } from 'react';
import { RecetasContext } from '../context/RecetasContext';
import Receta from './Receta';

const Listado = () => {

    const { recetas } = useContext(RecetasContext);

    if (!recetas) return null;

    return (
        <div className="row mt-5">
            {recetas.map(receta => (
                <Receta
                    key={receta.idDrink}
                    receta={receta}
                />
            ))}
        </div>
    );
}

export default Listado;