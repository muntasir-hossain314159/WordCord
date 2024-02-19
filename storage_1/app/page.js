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
      if (alphabetRegex.test(event.key)) {  
        setValue(event.key);
        if(currentColumnNumber === 0 && currentRowNumber === 0) {
          setCurrentRowNumber(1);
          setCurrentColumnNumber(1);
        }
        else if(currentColumnNumber === 5 && currentRowNumber < 6) {
          setCurrentColumnNumber(c => 1);
          setCurrentRowNumber(r => r + 1);
        }
        else {
          setCurrentColumnNumber(c => c + 1);
        }
      };
    }

    document.addEventListener('keypress', handleKeyPress);
    
    return () => {
      document.removeEventListener('keypress', handleKeyPress);
    };
  }, [currentColumnNumber, currentRowNumber]);

  function renderRows() {
    const rows = [];
    for (let index = 1; index <= 6; index++) {
      if(index === currentRowNumber) {        
        rows.push(
          <Row key={uuidv4()} rowId={`row_${index}`}  currentRowNumber={currentRowNumber} currentColumnNumber={currentColumnNumber} value={value}/>  
        );
      }
      else {
        rows.push(
          <Row key={uuidv4()} rowId={`row_${index}`} /> 
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
