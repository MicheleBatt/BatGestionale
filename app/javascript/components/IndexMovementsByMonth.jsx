import React, {useState, useEffect} from "react";
import ErrorModal from "./ErrorModal";
import {CURRENCY_EURO, parseMonth} from "../utils";
import MovementModal from "./MovementModal";


const IndexMovementsByMonth = ({
    originalCount,
    expense_items,
    groupedMonthsByYear
}) => {

    const [ count, setCount ] = useState(JSON.parse(originalCount))
    const [ expenseItems, setExpenseItems ] = useState(JSON.parse(expense_items))
    const [ showErrorModal, setShowErrorModal ] = useState(false)
    const emptyFilters = {
        year: '',
        month: ''
    }
    const [ filters, setFilters ] = useState(null)

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

    console.log('count: ', count)
    console.log('expenseItems: ', expenseItems)
    console.log('groupedMonthsByYear: ', groupedMonthsByYear)






    useEffect(() => {
        if (filters) {
            getCount()
        }
    }, [filters]);


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


    // Funzione che permette di ottenere dal server nuovi movimenti del conto
    const getCount = () => {
        console.log('getSubmissionLists')

        let url = `/counts/${count.id}.json?year=${filters.year}&month=${filters.month}`

        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setCount(data)
            })
            .catch((err) => console.log(err));
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
      <div className="container-fluid pr-3">
          <div className="container-fluid shadow bg-light card p-4 ml-1 mr-5">
              <div className="row">
                  <div className="col-6">
                      <h2>Registro Economico { count.name } - { parseMonth(count.current_month) } { count.current_year}</h2>
                  </div>
                  <div className="col-2 d-flex justify-content-end">
                      {
                          count.enable_previous_month &&
                            <button className="btn btn-secondary"
                            onClick={() => setFilters(count.current_month > 1 ?
                                { year: count.current_year, month: count.current_month - 1 } :
                                { year: count.current_year - 1, month: 12 }
                            )}>
                                <i aria-hidden className="fas fa-angle-left mr-2" />
                                Mese Precedente
                            </button>
                      }
                  </div>

                  <div className="col-2 d-block justify-content-center">
                      <div className="text-center">
                          <select  name="grouped-months" id="grouped-months"
                                   className="form-control"
                                   value={filters && filters.year && filters.month ? filters.year.toString() + '_' +  filters.month.toString() : ''}
                                   onChange={ (e) => setFilters(
                                       {year: e.target.value.split('_')[0],
                                              month: e.target.value.split('_')[1]}
                                   )}>
                              <option value="" key="no_user" disabled={true}>
                                  Seleziona un mese specifico
                              </option>
                              {
                                  Object.entries(groupedMonthsByYear).map(([year, months]) => {
                                      return <optgroup key={year} label={year}>
                                          {
                                              months.map((month) => {
                                                  return <option value={year.toString() + '_' + month[1].toString()}
                                                                 key={year.toString() + '_' + month[1].toString()}>
                                                      {parseMonth(month[1])}
                                                  </option>
                                              })
                                          }
                                      </optgroup>
                                  })
                              }
                          </select>
                      </div>
                  </div>

                  <div className="col-2">
                      {
                          count.enable_next_month &&
                              <button className="btn btn-secondary"
                                      onClick={() => setFilters(count.current_month < 12 ?
                                          { year: count.current_year, month: count.current_month + 1 } :
                                          { year: count.current_year + 1, month: 1 }
                                      )}>
                                  Mese Successivo
                                  <i aria-hidden className="fas fa-angle-right ml-2" />
                              </button>
                      }
                  </div>
              </div>
          </div>

          <div className="container-fluid shadow bg-light card p-4 my-4 ml-1">
              <div className="f-flex justify-content-end text-right mb-5">
                  <button className="btn btn-danger mr-3"
                          onClick={() => setMovement(newOutMovement)}
                  >
                      <i aria-hidden className="fas fa-plus mr-1 w-5" />
                      Inserisci nuovo Movimento in Uscita
                  </button>
                  <button className="btn btn-success mr-3"
                          onClick={() => setMovement(newInMovement)}
                  >
                      <i aria-hidden className="fas fa-plus mr-1 w-5" />
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
                  {count.movements.map((movement, i) => (
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
                      <EmptyRowTable /><EmptyRowTable />
                  </tr>

                  <tr key="total">
                      <td className="text-right b-solid" colSpan="2">
                          <b>TOTALE:</b>
                      </td>
                      <td className="text-center b-solid bg-red">
                          {count.out_month + CURRENCY_EURO}
                      </td>
                      <td className="text-right b-solid" colSpan="2">
                          <b>TOTALE:</b>
                      </td>
                      <td className="text-center b-solid bg-green">
                          {count.in_month + CURRENCY_EURO}
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
                          {count.initial_month_amount + CURRENCY_EURO}
                      </td>
                  </tr>
                  <tr key="total_3">
                      <td className="text-right b-solid" colSpan="5">
                          SALDO COMPLESSIVO A FINE MESE:
                      </td>
                      <td className={`text-center b-solid ${ count.in_month < count.out_month ? 'bg-red' : 'bg-green' }`}>
                          {count.in_out_month + CURRENCY_EURO}
                      </td>
                  </tr>
                  <tr key="total_4">
                      <td className="text-right b-solid" colSpan="5">
                          FONDO CASSA COMPLESSIVO A FINE MESE:
                      </td>
                      <td className={`text-center b-solid ${ (count.initial_month_amount + count.in_out_month) < count.initial_month_amount ? 'bg-red' : 'bg-green' }`}>
                          {(count.initial_month_amount + count.in_out_month) + CURRENCY_EURO}
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
                              {count.amounts_by_expensive_items[expenseItem.id.toString()] && count.amounts_by_expensive_items[expenseItem.id.toString()] + CURRENCY_EURO}
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
      </div>
    )
}

export default IndexMovementsByMonth;