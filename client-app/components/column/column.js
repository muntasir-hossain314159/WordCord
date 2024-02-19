import styles from "@/app/page.module.css"
import { useEffect, useState } from "react";

export default function Column({columnId, currentRowNumber, currentColumnNumber, updateRowValue, updateIsCompleteRow, columnValueParam, boxStyle, inputRefs}) {  
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

      const nextInputField = inputRefs.current.get(`input_row_${currentRowNumber}_column_${currentColumnNumber}`)
      if (nextInputField !== null) {
        console.log("Next Field: " + columnId);
        nextInputField.focus();
      }
    }
  }

  useEffect(() => {
    if (currentRowNumber === 1 && currentColumnNumber === 1)
    {
      inputRefs.current.get(`input_row_${currentRowNumber}_column_${currentColumnNumber}`).focus();
    }
  }, [currentRowNumber, currentColumnNumber, inputRefs])

  if(columnValueParam === undefined) {
    return (
      <div className="col col-auto" id={columnId} >
        <div className={styles.box} id={`box_${columnId}`} >
          <input 
            tabIndex={-1} 
            type="text" 
            className={styles.input} 
            id={`input_${columnId}`}
            ref={element => {
              if(element) {
                inputRefs.current.set(`input_${columnId}`, element);
              }
              else {
                inputRefs.current.delete(`input_${columnId}`);
              }
            }} 
            value={columnValue} 
            onKeyDown={handleKeyDown} 
            readOnly />
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



