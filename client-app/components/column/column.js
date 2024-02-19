import styles from "@/app/page.module.css"
import { useEffect, useRef, useState } from "react";

export default function Column({columnId, currentRowNumber, currentColumnNumber, updateRowValue, updateIsCompleteRow, columnValueParam, boxStyle}) {  
  const inputRef = useRef(null);
  const [columnValue, setColumnValue] = useState('');
  
  function handleKeyDown(event) {
    const alphabetRegex = /^[a-zA-Z]$/;
    if (alphabetRegex.test(event.key)) { 
      console.log(`Alphabet key pressed in ${columnId}: ${event.key}`);

      setColumnValue(event.key.toLowerCase());
      updateRowValue(event.key.toLowerCase());

      if(currentColumnNumber === 5) {
        updateIsCompleteRow();
        if(currentRowNumber < 6) {
          currentRowNumber = currentRowNumber + 1;
          currentColumnNumber = 1;
        }
      }
      else {
        currentColumnNumber = currentColumnNumber + 1;
      }

      const nextInputField = document.getElementById(`input_row_${currentRowNumber}_column_${currentColumnNumber}`)
      if (nextInputField !== null) {
        console.log("Next Field: " + columnId);
        nextInputField.focus();
      }
    }
  }

  useEffect(() => {
    if (currentRowNumber === 1 && currentColumnNumber === 1)
    {
      inputRef.current?.focus();
    }
  }, [currentRowNumber, currentColumnNumber])

  if(columnValueParam === undefined) {
    return (
      <div className="col col-auto" id={columnId} >
        <div className={styles.box} id={`box_${columnId}`} >
          <input tabIndex={-1} type="text" className={styles.input} ref={inputRef} value={columnValue} onKeyDown={handleKeyDown} readOnly id={`input_${columnId}`}/>
        </div>
      </div>
    )
  }
  else {
    return (
      <div id={columnId} className="col col-auto" >
        <div id={`box_${columnId}`} className={styles.box} style={boxStyle}>
          <input id={`input_${columnId}`} tabIndex={-1} type="text" className={styles.input} value={columnValueParam} readOnly/>
        </div>
      </div>
    )
  }
}



