import React, {useState} from "react";
import ErrorModal from "./ErrorModal";
import {CURRENCY_EURO, parseMonth} from "../utils";
import MovementModal from "./MovementModal";


const IndexMovementsByMonth = ({
    originalCount,
    originalMovements,
    initialMonthAmount,
    outMonth,
    inMonth,
    inOutMonth,
    expense_items,
    amounts_by_expensive_items,
    currentYear,
    currentMonth,
    enablePreviousMonth,
    enableNextMonth
}) => {

    const [ count, setCount ] = useState(JSON.parse(originalCount))
    const [ movements, setMovements ] = useState(JSON.parse(originalMovements))
    const [ expenseItems, setExpenseItems ] = useState(JSON.parse(expense_items))
    const [ amountsByExpensiveItems, setAmountsByExpensiveItems ] = useState(amounts_by_expensive_items)
    const [ showErrorModal, setShowErrorModal ] = useState(false)

    const newOutMovement = {
        count_id: count.id,
        expense_item_id: null,
        amount: 0.0,
        causal: '',
        currency_date: null,
        movement_type: 'out',
        is_new: true
    }

    const newInMovement = {
        count_id: count.id,
        expense_item_id: null,
        amount: 0.0,
        causal: '',
        currency_date: null,
        movement_type: 'in',
        is_new: true
    }

    const [ movement, setMovement ] = useState(null)

    console.log('movements: ', movements)
    console.log('expenseItems: ', expenseItems)
    console.log('enablePreviousMonth: ', enablePreviousMonth)
    console.log('enableNextMonth: ', enableNextMonth)
    console.log('amounts_by_expensive_items: ', amounts_by_expensive_items)



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




    const MovementRowTable = ({ movement }) => {
        
        return <>
            <td className="text-center b-solid cursor-pointer"
                style={{ background: movement.expense_item ? movement.expense_item.color : 'transparent' }}
                onClick={() => setMovement(movement)}
            >
                { movement.currency_date }
            </td>
            <td className="text-center b-solid cursor-pointer"
                style={{ background: movement.expense_item ? movement.expense_item.color : 'transparent' }}
                onClick={() => setMovement(movement)}
            >
                { movement.causal }
            </td>
            <td className="text-center b-solid cursor-pointer"
                style={{ background: movement.expense_item ? movement.expense_item.color : 'transparent' }}
                onClick={() => setMovement(movement)}
            >
                { movement.amount + CURRENCY_EURO }
            </td>
        </>
    }


    const EmptyRowTable = ({ }) => {

        return <>
            <td className="b-left-solid b-top-bottom-transparent" />
            <td className="b-top-bottom-transparent" />
            <td className="b-right-solid b-top-bottom-transparent"/>
        </>
    }


    const FullEmptyRowTable = ({ }) => {

        return <>
            <td className="b-left-solid b-top-bottom-transparent" />
            <td className="b-top-bottom-transparent" />
            <td className="b-top-bottom-transparent" />
            <td className="b-top-bottom-transparent" />
            <td className="b-top-bottom-transparent" />
            <td className="b-right-solid b-top-bottom-transparent"/>
        </>
    }
    
    
  return (
      <>
          <div className="container-fluid shadow bg-light card p-4 ml-5 mr-5">
              <div className="row">
                  <div className="col-8">
                      <h2>Registro Economico { count.name } - { parseMonth(currentMonth) } { currentYear}</h2>
                  </div>
                  <div className="col-2">
                      {
                          enablePreviousMonth &&
                            <button className="btn btn-secondary">
                                <i className="fas fa-angle-left mr-2" />
                                Mese Precedente
                            </button>
                      }
                  </div>
                  <div className="col-2">
                      {
                          enableNextMonth &&
                              <button className="btn btn-secondary">
                                  Mese Successivo
                                  <i className="fas fa-angle-right ml-2" />
                              </button>
                      }
                  </div>
              </div>
          </div>

          <div className="container-fluid shadow bg-light card p-4 my-4 ml-5">
              <div className="f-flex justify-content-end text-right mb-5">
                  <button className="btn btn-danger mr-3"
                          onClick={() => setMovement(newOutMovement)}
                  >
                      <i className="fas fa-plus mr-1 w-5" />
                      Inserisci nuovo Movimento in Uscita
                  </button>
                  <button className="btn btn-success mr-3"
                          onClick={() => setMovement(newInMovement)}
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
                  {movements.map((movement, i) => (
                      <tr key={`movement-${movement.id}`}>

                          {
                              movement.movement_type === 'out' ?
                                  <>
                                      <MovementRowTable
                                          movement={movement}
                                      />
                                      <EmptyRowTable />
                                  </>
                                  :
                                  <>
                                      <EmptyRowTable />
                                      <MovementRowTable
                                          movement={movement}
                                      />
                                  </>
                          }
                      </tr>
                  ))}

                  <tr key="empty_row">
                      <td className="b-left-solid" /><td /><td className="b-right-solid"/>
                      <EmptyRowTable />
                  </tr>

                  <tr key="total">
                      <td className="text-right b-solid" colSpan="2">
                          <b>TOTALE:</b>
                      </td>
                      <td className="text-center b-solid bg-red">
                          {outMonth + CURRENCY_EURO}
                      </td>
                      <td className="text-right b-solid" colSpan="2">
                          <b>TOTALE:</b>
                      </td>
                      <td className="text-center b-solid bg-green">
                          {inMonth + CURRENCY_EURO}
                      </td>
                  </tr>

                  <tr key="empty_row_2">
                      <FullEmptyRowTable />
                  </tr>
                  <tr key="empty_row_3">
                      <FullEmptyRowTable />
                  </tr>

                  <tr key="total_2">
                      <td className="text-right b-solid" colSpan="5">
                          FONDO CASSA COMPLESSIVO A INIZIO MESE:
                      </td>
                      <td className="text-center b-solid ">
                          {initialMonthAmount + CURRENCY_EURO}
                      </td>
                  </tr>
                  <tr key="total_3">
                      <td className="text-right b-solid" colSpan="5">
                          SALDO COMPLESSIVO A FINE MESE:
                      </td>
                      <td className={`text-center b-solid ${ inMonth < outMonth ? 'bg-red' : 'bg-green' }`}>
                          {inOutMonth + CURRENCY_EURO}
                      </td>
                  </tr>
                  <tr key="total_4">
                      <td className="text-right b-solid" colSpan="5">
                          FONDO CASSA COMPLESSIVO A FINE MESE:
                      </td>
                      <td className={`text-center b-solid ${ (initialMonthAmount + inOutMonth) < initialMonthAmount ? 'bg-red' : 'bg-green' }`}>
                          {(initialMonthAmount + inOutMonth) + CURRENCY_EURO}
                      </td>
                  </tr>

                  <tr key="empty_row_4">
                      <FullEmptyRowTable />
                  </tr>
                  <tr key="empty_row_5">
                      <FullEmptyRowTable />
                  </tr>

                  {expenseItems.map((expenseItem, i) => (
                      <tr key={`movement-${expenseItem.id}`}
                          style={{ background: expenseItem.color }}>
                          <td className="text-right b-solid" colSpan="5">
                              <b>AMMONTARE { expenseItem.description.toUpperCase() }:</b>
                          </td>
                          <td className="text-center b-solid">
                              {amountsByExpensiveItems[expenseItem.id.toString()] && amountsByExpensiveItems[expenseItem.id.toString()] + CURRENCY_EURO}
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
      </>
    )
}

export default IndexMovementsByMonth;