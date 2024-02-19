import styles from "@/app/page.module.css"
import { useEffect, useRef, useState } from "react";

export default function Column({columnId, isFocus, updateFocus, valueParam}) {  
  const inputRef = useRef(null);
  const [value, setValue] = useState('');
  
  function handleKeyDown(event) {
    const alphabetRegex = /^[a-zA-Z]$/;
    if (alphabetRegex.test(event.key)) { 
      console.log(`Alphabet key pressed in ${columnId}: ${event.key}`);
      setValue(event.key.toLowerCase());
      updateFocus(event.key.toLowerCase());
    }
  }

  useEffect(() => {
    if(isFocus) {
      console.log(`${columnId} isFocused`);
      inputRef.current?.focus();
    }
    else if (valueParam !== undefined) {
      setValue(valueParam);
    }
  }, [columnId, isFocus, valueParam])
  

  return (
    <div className="col col-auto" id={columnId}>
        <div className={styles.box} id={`box_${columnId}`}>
          <input tabIndex={-1} type="text" className={styles.input} ref={inputRef} value={value} onKeyDown={handleKeyDown} readOnly/>
        </div>
    </div>
  );
}



