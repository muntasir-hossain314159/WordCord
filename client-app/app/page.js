"use client"
import Row from "@/components/row/row";
import styles from "./page.module.css";
import { v4 as uuidv4 } from 'uuid';
import { useState } from "react";

export default function Home() {
  const [focusIndex, setFocusIndex] = useState(0);   
  const [focusValues, setFocusValues] = useState(updateFocusValues(0));

  function updateFocus(character) {
    if(focusIndex !== 29) {
      setFocusIndex(focusIndex + 1);
      setFocusValues(updateFocusValues(focusIndex + 1, character));
    }
  }

  function updateFocusValues(focusIndexParam, character) {
    const localFocusValues = [];
    for (let index = 0; index < 30; index++) {
      if(focusIndexParam === 0) {
        if(index === 0) {
          localFocusValues.push({value: "", isFocus: true});
        }
        else {
          localFocusValues.push({value: "", isFocus: false});
        }
      }
      else if(focusIndexParam - 1 >= 0 && focusIndexParam - 1 === index)  {
          localFocusValues.push({value: character, isFocus: false});
      }
      else if (focusIndexParam === index) {
        localFocusValues.push({value: "", isFocus: true});
      }
      else {
        localFocusValues.push(focusValues[index]);
      }
    }
    return localFocusValues;
  }

  function renderRows() {
    const rows = [];
    for (let index = 1; index <= 6; index++) {
      var sliceIndex = (index - 1) * 5
      if(Math.ceil((focusIndex + 1) / 5) === index) {
        rows.push(
          <Row key={uuidv4()} rowId={`row_${index}`} rowFocusValues={focusValues.slice(sliceIndex, sliceIndex + 5)} updateFocus={updateFocus} />
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
