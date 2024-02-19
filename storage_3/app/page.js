"use client"
import Row from "@/components/row/row";
import styles from "./page.module.css";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

export default function Home() {
  const [focusIndex, setFocusIndex] = useState(0);   
  const [focusValues, setFocusValues] = useState(updateFocusValues(0));

  function updateFocusValues(focusIndexParam) {
    const localFocusValues = [];
    for (let index = 0; index < 30; index++) {
      if(index === focusIndexParam) {
        localFocusValues.push(true);
      }
      else {
        localFocusValues.push(false);
      }
    }
    return localFocusValues;
  }

  function updateFocusIndex() {
    if(focusIndex !== 29) {
      setFocusValues(updateFocusValues(focusIndex + 1));
      setFocusIndex(focusIndex + 1);
    }
  }

  function renderRows() {
    const rows = [];
    for (let index = 1; index <= 6; index++) {
      var sliceIndex = (index - 1) * 5
      if(Math.ceil((focusIndex + 1) / 5) === index) {
        rows.push(
          <Row key={uuidv4()} rowId={`row_${index}`} rowFocusValues={focusValues.slice(sliceIndex, sliceIndex + 5)} updateFocusIndex={updateFocusIndex} />
        );
      }
      else {
        rows.push(
          <Row key={uuidv4()} rowId={`row_${index}`} rowFocusValues={focusValues.slice(sliceIndex, sliceIndex + 5)} />
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
