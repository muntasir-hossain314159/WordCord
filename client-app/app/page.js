"use client"
import Row from "@/components/row/row";
import styles from "./page.module.css";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from "react";

export default function Home() {

  const [currentRowNumber, setCurrentRowNumber] = useState(0);
  const [currentColumnNumber, setCurrentColumnNumber] = useState(0);
  const [value, setValue] = useState('');

  useEffect(() => {
    const alphabetRegex = /^[a-zA-Z]$/;

    const handleKeyPress = (event) => {
      console.log(event.key);
      if (alphabetRegex.test(event.key)) {  
        console.log("Key press is an alphabet")
        setValue(event.key);
      };
    }

    document.addEventListener('keypress', handleKeyPress);
    
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [currentRowNumber, currentColumnNumber]);

  function updateRowNumber(rowNumber) {
    setCurrentRowNumber(rowNumber);
  }

  function updateColumnNumber(columnNumber) {
    setCurrentColumnNumber(columnNumber);
  }

  function renderRows() {
    const rows = [];
    for (let index = 1; index <= 6; index++) {
      if(index === currentRowNumber) {        
        rows.push(
          <Row key={uuidv4()} rowId={`row_${index}`} currentRowNumber={currentRowNumber} currentColumnNumber={currentColumnNumber} updateRowNumber={updateRowNumber} updateColumnNumber={updateColumnNumber} value={value}/>
        );
      }
      else {
        rows.push(
          <Row key={uuidv4()} rowId={`row_${index}`} updateRowNumber={updateRowNumber} updateColumnNumber={updateColumnNumber} /> 
        )
      }
    }
    return rows;
  }

  return (
    <main className={styles.main}>
      <h1>
        Wordle for Discord
      </h1>
      <div className="container mt-5">
        {renderRows()}
      </div>
    </main>
  );
}
