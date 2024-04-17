"use client"
import Row from "@/components/row/row";
import styles from "./page.module.css";
import { v4 as uuidv4 } from 'uuid';
import { useEffect, useRef, useState } from "react";

export default function Home() {

  const inputRefs = useRef(new Map())
  const [wordcord, setWordcord] = useState("");

  function renderRows() {
    const rows = [];
    for (let index = 1; index <= 6; index++) {
        rows.push(
          <Row key={uuidv4()} rowId={`row_${index}`} currentRowNumber={index} inputRefs={inputRefs} wordcord={wordcord}/>
        );
    }
    return rows;
  }

  useEffect(() => {
    async function fetchDailyWordcordFromDatabase() {
      console.log("Calling Fetch");
      const response = await fetch("/api/wordcord");
      if(response.ok) {
        const wordcordResponse = await response.json();
        console.log(`Fetched Daily WordCord: ${wordcordResponse.wordcord}`);
        setWordcord(wordcordResponse.wordcord);
      }
      else {
        console.log("Error Fetching WordCord");
      }
    }
    fetchDailyWordcordFromDatabase();
  }, []);



  return (
    <main className={styles.main}>
      <h1>
        WordCord
      </h1>
      <div className="container mt-5">
        {renderRows()}
      </div>
    </main>
  );
}
