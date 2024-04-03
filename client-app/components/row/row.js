import { v4 as uuidv4 } from 'uuid';
import Column from "../column/column";
import { useRef, useState } from 'react';

export default function Row({rowId, currentRowNumber, inputRefs, wordcord}) {
    const rowValueRef = useRef("");
    const [isCompleteRow, setIsCompleteRow] = useState(false);

    function updateIsCompleteRow() {
        console.log("Complete Row: " + rowValueRef.current);
        setIsCompleteRow(true);
    }

    function updateRowValue(character) {
        rowValueRef.current = rowValueRef.current + character;
        console.log("Updated Row Value: " + rowValueRef.current);
    }

    function renderColumns() {
        const columns = [];
        for (let index = 1; index <= 5; index++) {
            if(isCompleteRow) {
                let boxStyle = {};

                if(rowValueRef.current[index-1] === wordcord[index-1]) {
                    boxStyle = {"backgroundColor": "#283618"};
                    wordcord = wordcord.replace(rowValueRef.current[index-1], " ");
                    console.log("WordCord: " + wordcord);
                }
                else if (wordcord.includes(rowValueRef.current[index-1])) {
                    boxStyle = {"backgroundColor": "#bc6c25", "color": "black"}
                    wordcord = wordcord.replace(rowValueRef.current[index-1], " ");
                    console.log("WordCord: " + wordcord);
                }
                else {
                    boxStyle = {"backgroundColor": "#fefae0", "color": "black"}
                }

                columns.push(
                    <Column key={uuidv4()} columnId={`${rowId}_column_${index}`} columnValueParam={rowValueRef.current[index-1]} boxStyle={boxStyle} />
                );
            }
            else {
                columns.push(
                    <Column key={uuidv4()} columnId={`${rowId}_column_${index}`} currentRowNumber={currentRowNumber} currentColumnNumber={index} updateRowValue={updateRowValue} updateIsCompleteRow={updateIsCompleteRow} inputRefs={inputRefs}/>
                );
            }
        }
        return columns;
    }
        
    return (
        <div className="row justify-content-center flex-nowrap gx-2 mb-3" id={rowId}>
            {renderColumns()}
        </div>
    );
}
