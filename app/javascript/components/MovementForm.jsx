import React, {useEffect, useState} from "react";


const MovementForm = ({ movement, setMovement, expense_items }) => {

    console.log('expense_items: ', expense_items)
    console.log('movement: ', movement)

    return (
        <div>
            <div className="row mb-3">
                <div className="col-6 d-block justify-content-start mt-3">
                    <b style={{display: 'block'}} htmlFor="movement_currency_date">Data Valuta</b>
                    <input type="datetime-local"
                           name="currency_date"
                           id="movement_currency_date"
                           className="form-control"
                           value={movement.currency_date}
                           onChange={(e) => setMovement({ ...movement, currency_date: e.target.value })} />
                </div>

                {
                    !movement.is_new &&
                        <div className="col-6 d-block justify-content-start mt-3">
                            <b>Tipo</b>
                            <div className="pt-1">
                                {[['out', 'Uscita'], ['in', 'Entrata']].map(type => {
                                    return <span key={type[0]}>
                                      <input type="radio" value={type[0]}
                                             checked={type[0] === movement.movement_type}
                                             id={"movement_type_" + type[0]}
                                             onChange={(e) => setMovement({ ...movement, movement_type: e.target.value })}/>
                                      <b className="pr-3 ml-1"
                                         htmlFor={"movement_type_" + type[0]}> {type[1]}</b>
                                </span>
                                })}
                            </div>
                        </div>
                }

                <div className="col-6 d-block justify-content-start mt-3">
                    <b style={{display: 'block'}} htmlFor="movement_currency_date">Ammontare</b>
                    <input type="number"
                           name="amount"
                           id="movement_amount"
                           className="form-control"
                           value={movement.amount}
                           onChange={(e) => setMovement({ ...movement, amount: e.target.value })} />
                </div>


                {
                    movement.movement_type === 'out' &&
                        <div className="col-6 d-block justify-content-start mt-3">
                            <b>Voce di Spesa</b>
                            <select
                                className="form-control mb-3"
                                value={movement.expense_item_id}
                                onChange={(e) => setMovement({ ...movement, expense_item_id: e.target.value })}
                            >
                                <option value="" key="empty_item">Seleziona una Voce</option>
                                {
                                    expense_items.map((item) => {
                                        return <option value={item.id} key={item.id}>
                                            {item.description}
                                        </option>
                                    })
                                }
                            </select>
                        </div>
                }
            </div>

            <div className="row mb-3">
                <div className="col-12 d-block justify-content-start mt-3">
                    <b>Causale</b>
                    <input
                        type="text"
                        className="form-control mb-3"
                        value={movement.causal}
                        onChange={(e) => setMovement({ ...movement, causal: e.target.value })}
                    />
                </div>
            </div>
        </div>
    )
}

export default MovementForm;