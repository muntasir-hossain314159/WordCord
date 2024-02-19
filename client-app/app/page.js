"use client"
import Row from "@/components/row/row";
import styles from "./page.module.css";
import { v4 as uuidv4 } from 'uuid';
import { useRef } from "react";

export default function Home() {

  const inputRefs = useRef(new Map())

  function renderRows() {
    const rows = [];
    for (let index = 1; index <= 6; index++) {
        rows.push(
          <Row key={uuidv4()} rowId={`row_${index}`} currentRowNumber={index} inputRefs={inputRefs} />
        );
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
