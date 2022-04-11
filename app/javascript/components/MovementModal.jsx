import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import MovementForm from "./MovementForm";
import {isValidMovement} from "../utils";


const MovementModal = ({ movement, setMovement, expense_items, handleConfirm }) => {

    console.log('expense_items: ', expense_items)
    console.log('movement: ', movement)


    // Funzione che gestisce la chiusura della modale che permette all'utente di aggiornare i dati
    // associati alla blueprint_image
    const handleCloseModal = () => {
        setMovement(null);
    }

    return (
        <Modal
            show={ movement !== null }
            onHide={ handleCloseModal }
            animation={false}
            size="lg"
        >
            <Modal.Header>
                <h4>
                    Inserisci un nuovo movimento di cassa sul Conto
                </h4>
            </Modal.Header>
            <Modal.Body>
                <MovementForm
                    movement={movement}
                    setMovement={setMovement}
                    expense_items={expense_items}
                />
            </Modal.Body>

            <Modal.Footer>
                <div className="center-btn-on-mobile">
                    <button
                        type="button"
                        className="btn btn-primary pr-2 pl-2 mr-3"
                        onClick={ handleCloseModal }>
                        Annulla
                    </button>
                    <button
                        type="button"
                        className="btn btn-success pr-2 pl-2"
                        disabled={!isValidMovement(movement)}
                        onClick={ handleConfirm }>
                        <i aria-hidden className="fas fa-save" /> Salva
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default MovementModal;