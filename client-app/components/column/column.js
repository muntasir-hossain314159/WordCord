import styles from "@/app/page.module.css"
import { useEffect, useRef, useState } from "react";

export default function Column({columnId, isFocus, updateFocusIndex}) {  
  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  
  function handleKeyDown(event) {
    console.log(`Key pressed in ${columnId}: ${event.key}`);
    setValue(event.key);
    updateFocusIndex();
  }

  useEffect(() => {
    if(isFocus) {
      console.log(`${columnId} isFocused`);
      inputRef.current?.focus();
    }
  })
  

  return (
    <div className="col col-auto" id={columnId}>
        <div className={styles.box} id={`box_${columnId}`}>
          <input tabIndex={-1} type="text" className={styles.input} ref={inputRef} value={value} onKeyDown={handleKeyDown} readOnly/>
        </div>
    </div>
  );
}



