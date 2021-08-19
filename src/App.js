
import './App.css';
import React, { useState } from 'react'

function App() {
  const availableNotes = [2000, 500, 100, 20, 10, 5, 1];
  const [billAmount, setBillAmount] = useState('')
  const [cashGiven, setCashGiven] = useState('')
  const [message, setMessage] = useState('')
  const [noOfNotes, setNoOfNotes] = useState([])
  const [showTable, setShowTable] = useState(false)
  const [showCashText, setShowCashText] = useState(false)

  const validateBillAndCashAmount = () => {
    // hideMessage();
    if (billAmount > 0) {
      // 12
      console.log("::::::::::", typeof cashGiven)
      if (parseInt(cashGiven) >= parseInt(billAmount)) {

        const amountToBeReturned = cashGiven - billAmount // 2022 - 12 = 2010
        calculateChange(amountToBeReturned);
      } else {
        setMessage("Do you wanna wash plates?");
      }
    } else {
      setMessage("Invalid Bill Amount");
    }
  };

  function calculateChange(amountToBeReturned) {
    // 2010
    // go over all the available
    var numOfnotes = []
    for (let i = 0; i < availableNotes.length; i++) {
      // no of notes need for the denomination
      const numberOfNotes = Math.trunc(amountToBeReturned / availableNotes[i]);
      // 2010 / 2000 = 1 || 10 / 500 = 0

      // amount left after calculating the number of notes needed
      amountToBeReturned = amountToBeReturned % availableNotes[i];
      // 2010 % 2000 = 10 || 10 % 500 = 10

      // updating the no of notes in the table for the current amount
      numOfnotes.push(numberOfNotes);

      // setNoOfNotes(...noOfNotes, numOfnotes)
    }
    setNoOfNotes(numOfnotes)
    setShowTable(true)
  }
  return (
    <>
      {console.log(noOfNotes)}
      <main className="container">
        <div>
          <h1 className="heading">Cash Register Manager</h1>
          <p className="description">
            Enter the bill amount and cash given by the customer and know minimum
            number of notes to return.
        </p>
          <label className="input-label" for="bill-amount">Bill Amount:</label>
          <input className="input" id="bill-amount" type="text" onChange={(e) => setBillAmount(e.target.value)} />
          <button id="check-button" onClick={() => setShowCashText(true)}>Next</button>
          {showCashText && <> <label className="input-label">Cash Given:</label>
            <input className="input" id="cash-given" type="text" onChange={(e) => setCashGiven(e.target.value)} /></>}
          {showCashText && <button id="check-button" onClick={validateBillAndCashAmount}>Check</button>}
          <p id="error-message">{message}</p>
          {showTable && <table className="change-table">
            <caption>
              Return Change
            </caption>
            <tr>
              <th>No of Notes</th>
              {noOfNotes.map((note, i) => <td key={i} className="no-of-notes">{note}</td>)}
            </tr>
            <tr>
              <th>Note</th>
              <td>2000</td>
              <td>500</td>
              <td>100</td>
              <td>20</td>
              <td>10</td>
              <td>5</td>
              <td>1</td>
            </tr>
          </table>}

        </div>
      </main>

    </>
  );
}

export default App;
