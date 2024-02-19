import styles from "@/app/page.module.css"
import { useEffect, useRef, useState } from "react";

export default function Column({columnId, currentRowNumber, currentColumnNumber}) {  
  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  
  function handleKeyDown(event) {
    const alphabetRegex = /^[a-zA-Z]$/;
    if (alphabetRegex.test(event.key)) { 
      console.log(`Alphabet key pressed in ${columnId}: ${event.key}`);

      setValue(event.key.toLowerCase());

      if(currentColumnNumber === 5 && currentRowNumber < 6) {
        currentRowNumber = currentRowNumber + 1;
        currentColumnNumber = 1;
      }
      else {
        currentColumnNumber = currentColumnNumber + 1;
      }

      const nextInputField = document.getElementById(`input_row_${currentRowNumber}_column_${currentColumnNumber}`)
      if (nextInputField !== null) {
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

  return (
    <div className="col col-auto" id={columnId}>
        <div className={styles.box} id={`box_${columnId}`}>
          <input tabIndex={-1} type="text" className={styles.input} ref={inputRef} value={value} onKeyDown={handleKeyDown} readOnly id={`input_${columnId}`}/>
        </div>
    </div>
  );
}



