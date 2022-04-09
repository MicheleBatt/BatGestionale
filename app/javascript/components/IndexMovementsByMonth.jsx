import React, {useState} from "react";
import ErrorModal from "./ErrorModal";
import {CURRENCY_EURO} from "../utils";
import MovementModal from "./MovementModal";


const IndexMovementsByMonth = ({ originalCount, originalMonth, outMonth, inMonth, inOutMonth, expense_items }) => {

    const [ count, setCount ] = useState(JSON.parse(originalCount))
    const [ month, setMonth ] = useState(JSON.parse(originalMonth))
    const [ expenseItems, setExpenseItems ] = useState(JSON.parse(expense_items))
    const [ showErrorModal, setShowErrorModal ] = useState(false)

    const newOutMovement = {
        count_id: count.id,
        month_id: month.id,
        expense_item_id: null,
        amount: 0.0,
        causal: '',
        currency_date: null,
        movement_type: 'out',
        is_new: true
    }

    const newInMovement = {
        count_id: count.id,
        month_id: month.id,
        expense_item_id: null,
        amount: 0.0,
        causal: '',
        currency_date: null,
        movement_type: 'in',
        is_new: true
    }

    const [ movement, setMovement ] = useState(null)

    console.log('month: ', month)
    console.log('expenseItems: ', expenseItems)



    const createMovement = () => {
        const url = "/movements";
        console.log(movement)

        fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movement),
        }).then((res) => {
            if (!res.ok)
                throw Error("An error occour during saving data on the database");
            else
                return res.json()
        })
            .then((data) => {
                location.reload()
            })
            .catch((error) => {
                console.error("ERROR:", error);
            });
    }


  return (
      <div>
          <div className="f-flex justify-content-end text-right mb-5">
              <button className="btn btn-danger mr-3"
                onClick={() => setMovement(newOutMovement)}
              >
                  <i className="fas fa-plus mr-1 w-5" />
                  Inserisci nuovo Movimento in Uscita
              </button>
              <button className="btn btn-success mr-3"
                      onClick={() => setMovement(newOutMovement)}
              >
                  <i className="fas fa-plus mr-1 w-5" />
                  Inserisci nuovo Movimento in Entrata
              </button>
              <a href={'/counts'} className="btn btn-secondary">
                  Torna alla pagina principale del Conto
              </a>
          </div>

          <table className="table table-hover no-margins mt-5">
              <thead>
              <tr>
                  <th className="text-center b-solid color-red text-underline" colSpan="3">
                      <h3><b>USCITE</b></h3>
                  </th>
                  <th className="text-center b-solid color-red text-underline" colSpan="3">
                      <h3><b>ENTRATE</b></h3>
                  </th>
              </tr>
              <tr>
                  <th className="text-center b-solid text-underline">Data</th>
                  <th className="text-center b-solid text-underline">Causale</th>
                  <th className="text-center b-solid text-underline">Importo</th>
                  <th className="text-center b-solid text-underline">Data</th>
                  <th className="text-center b-solid text-underline">Causale</th>
                  <th className="text-center b-solid text-underline">Importo</th>
              </tr>
              </thead>
              <tbody>
              {month.movements.map((movement, i) => (
                  <tr key={`movement-${movement.id}`}>
                      <td className={`text-center ${movement.movement_type === 'out' && 'b-solid'}`}
                          style={{ background: movement.movement_type === 'out' ? movement.expense_item.color : '' }}
                      >
                          { movement.movement_type === 'out' && movement.currency_date }
                      </td>
                      <td className={`text-center ${movement.movement_type === 'out' && 'b-solid'}`}
                          style={{ background: movement.movement_type === 'out' ? movement.expense_item.color : '' }}
                      >
                          { movement.movement_type === 'out' && movement.causal }
                      </td>
                      <td className={`text-center ${movement.movement_type === 'out' && 'b-solid'}`}
                          style={{ background: movement.movement_type === 'out' ? movement.expense_item.color : '' }}
                      >
                          { movement.movement_type === 'out' && movement.amount + CURRENCY_EURO }
                      </td>

                      <td className={`text-center ${movement.movement_type === 'in' && 'b-solid'}`}
                          style={{ background: movement.movement_type === 'in' ? movement.expense_item.color : '' }}
                      >
                          { movement.movement_type === 'in' && movement.currency_date }
                      </td>
                      <td className={`text-center ${movement.movement_type === 'in' && 'b-solid'}`}
                          style={{ background: movement.movement_type === 'in' ? movement.expense_item.color : '' }}
                      >
                          { movement.movement_type === 'in' && movement.causal }
                      </td>
                      <td className={`text-center ${movement.movement_type === 'in' && 'b-solid'}`}
                          style={{ background: movement.movement_type === 'in' ? movement.expense_item.color : '' }}
                      >
                          { movement.movement_type === 'in' && movement.amount + CURRENCY_EURO }
                      </td>
                  </tr>
              ))}

              <tr key="empty_row">
                  <td className="b-left-solid" /><td /><td className="b-right-solid"/><td /><td /><td />
              </tr>

              <tr key="total">
                  <td className="text-right b-solid" colSpan="2">
                      <b>TOTALE:</b>
                  </td>
                  <td className="text-center b-solid">
                      {outMonth + CURRENCY_EURO}
                  </td>
                  <td className="text-right b-solid" colSpan="2">
                      <b>TOTALE:</b>
                  </td>
                  <td className="text-center b-solid">
                      {inMonth + CURRENCY_EURO}
                  </td>
              </tr>

              <tr key="empty_row_2">
                  <td /><td /><td /><td /><td /><td />
              </tr>
              <tr key="empty_row_3">
                  <td /><td /><td /><td /><td /><td />
              </tr>

              <tr key="total">
                  <td className="text-right b-solid" colSpan="5">
                      FONDO CASSA COMPLESSIVO A INIZIO MESE:
                  </td>
                  <td className="text-center b-solid">
                      {month.initial_amount + CURRENCY_EURO}
                  </td>
              </tr>
              <tr key="total">
                  <td className="text-right b-solid" colSpan="5">
                      SALDO COMPLESSIVO A FINE MESE:
                  </td>
                  <td className="text-center b-solid">
                      {inOutMonth + CURRENCY_EURO}
                  </td>
              </tr>
              <tr key="total">
                  <td className="text-right b-solid" colSpan="5">
                      FONDO CASSA COMPLESSIVO A FINE MESE:
                  </td>
                  <td className="text-center b-solid">
                      {month.final_amount + CURRENCY_EURO}
                  </td>
              </tr>

              <tr key="empty_row_4">
                  <td /><td /><td /><td /><td /><td />
              </tr>
              <tr key="empty_row_5">
                  <td /><td /><td /><td /><td /><td />
              </tr>

              {expenseItems.map((expenseItem, i) => (
                  <tr key={`movement-${expenseItem.id}`}
                      style={{ background: expenseItem.color }}>
                      <td className="text-right b-solid" colSpan="5">
                          <b>AMMONTARE { expenseItem.description.toUpperCase() }:</b>
                      </td>
                      <td className="text-center b-solid">
                      </td>
                  </tr>
              ))}
              </tbody>
          </table>

          <MovementModal
              movement={movement}
              setMovement={setMovement}
              expense_items={expenseItems}
              handleConfirm={createMovement}
          />
      </div>
    )
}

export default IndexMovementsByMonth;