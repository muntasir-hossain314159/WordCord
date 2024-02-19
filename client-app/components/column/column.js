import styles from "@/app/page.module.css"
import { useEffect } from "react";

export default function Column({columnId, currentRowNumber, currentColumnNumber, updateRowNumber, updateColumnNumber, value}) {  
  useEffect(() => {

    if(columnId === `row_1_column_1` && currentRowNumber === undefined && currentColumnNumber === undefined) {
      updateRowNumber(1);
      updateColumnNumber(1);
      console.log('initial row and column');
    }
    else if (currentRowNumber === undefined || currentColumnNumber === undefined) {
      console.log('undefined')
    }
    else if (value !== ''){
      if(currentColumnNumber === 5 && currentRowNumber < 6) {
        console.log(currentRowNumber);
        updateColumnNumber(1);
        updateRowNumber(currentRowNumber + 1);
        console.log("updated row and column");
      }
      else {
        updateColumnNumber(currentColumnNumber + 1);
        console.log("updated column")
      }
    }
  }, []);
  
  return (
    <div className="col col-auto" id={columnId}>
        <div className={styles.box} id={`box_${columnId}`}>{value}</div>
    </div>
  );
}
