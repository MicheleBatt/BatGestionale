import React, {useState} from "react";
import ErrorModal from "./ErrorModal";


const ExpenseItemForm = ({ originalExpenseItem, colors }) => {

    const [ expenseItem, setExpenseItem ] = useState(originalExpenseItem ? originalExpenseItem : { description: '', color : ''})
    const [ showErrorModal, setShowErrorModal ] = useState(false)


    // Funzione che permette di creare una nuova voce di spesa mediante query al server
    function onSubmitHandler() {
        if (expenseItem && expenseItem.description && expenseItem.color) {
            let url = `/expense_items`;

            fetch(url + '.json', {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(expenseItem)
            }).then(response => {
                console.log('response: ', response)
                if (!response.ok)
                    throw Error("An error occour during saving data on the database");
                else
                    return response.json()
            }).then(data => {
                window.location = '/expense_items'
            }).catch((error) => {
                console.log('ERROR:', error);
                console.error('ERROR:', error);
                setShowErrorModal(true);
            });

        }
    }

  return (
      <div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-5">
            <label><b>Descrizione</b></label>
            <input
                className="form-control"
                type="text"
                name="expense_item[description]"
                id="expense_item_description"
                value={expenseItem.description || ''}
                onChange={(e) => setExpenseItem({ ...expenseItem, description: e.target.value })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 mb-5">
            <label><b>Colore</b></label>
              <div className="d-flex justify-content-start text-left">
                  {
                      colors.map(color => {
                          return <div style={{ background: color }}
                                      key={color}
                                      className={`mr-2 rounded color-box cursor-pointer ${expenseItem.color === color ? 'selected-color-box' : 'not-selected-color-box'}`}
                          onClick={(e) => setExpenseItem({ ...expenseItem, color: color })}/>
                      })
                  }
              </div>
          </div>
        </div>


        <div className="hr-line-dashed" />

        <div className="form-group">
          <div className="text-center">
            <button
                className="btn btn-success btn-lg"
                disabled={ !expenseItem || !expenseItem.description || !expenseItem.color }
                onClick={onSubmitHandler}
            >
              <i aria-hidden className="fas fa-save" /> Salva
            </button>
          </div>
        </div>

        <ErrorModal
            showErrorModal={showErrorModal}
            setShowErrorModal={setShowErrorModal}
        />
      </div>
    )
}

export default ExpenseItemForm;