import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { ModalContext } from '../context/ModalContext';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';

function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles(theme => ({
    paper: {
        position: 'absolute',
        width: 450,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const Receta = ({ receta }) => {

    // Configuración del modal de material-ui
    const [modalStyle] = useState(getModalStyle);
    const [open, setOpen] = useState(false);

    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    const { info, setInfo, setIdReceta } = useContext(ModalContext);

    const monstrarIngredientes = info => {
        let ingredientes = [];
        for (let i = 1; i <= 15; i++) {
            if (info[`strIngredient${i}`]) {
                ingredientes.push(
                    <li key={info[`strIngredient${i}`]}>{info[`strIngredient${i}`]} {info[`strMeasure${i}`]}</li>
                )
            }
        }

        return ingredientes;
    }

    return (
        <div className="col-md-4 mb-3">
            <div className="card">
                <h2 className="card-header">{receta.strDrink}</h2>
                <img src={receta.strDrinkThumb} alt={`Imagen de ${receta.strDrink}`} className="card-img-top" />

                <div className="card-body">
                    <button
                        type="button"
                        className="btn btn-block btn-primary"
                        onClick={() => {
                            setIdReceta(receta.idDrink);
                            handleOpen();
                        }}
                    >
                        Ver receta
                    </button>

                    <Modal
                        open={open}
                        onClose={() => {
                            setIdReceta(null);
                            setInfo({});
                            handleClose();
                        }}
                    >
                        <div className={classes.paper} style={modalStyle} >
                            <h2>{info.strDrink}</h2>
                            <h3 className="mt 4">Instrucciones</h3>
                            <p>
                                {info.strInstructions}
                            </p>
                            <img src={info.strDrinkThumb} alt="" className="img-fluid my-4" />
                            <h3>Ingredientes y cantidades</h3>
                            <ul>
                                {monstrarIngredientes(info)}
                            </ul>
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
    );
}

Receta.propTypes = {
    receta: PropTypes.object.isRequired
}

export default Receta;