import { v4 as uuidv4 } from 'uuid';
import Column from "../column/column";

export default function Row({rowId, currentRowNumber, currentColumnNumber, value}) {

    function renderColumns() {
        var isRow = false;
        const columns = [];

        if(currentRowNumber && rowId === `row_${currentRowNumber}`) {
            console.log(`row_${currentRowNumber} - isRow - true`);
            isRow = true;
        }

        for (let index = 1; index <= 5; index++) {
            if(isRow && index === currentColumnNumber) {
                columns.push(
                    <Column key={uuidv4()} columnId={`${rowId}_column_${index}`} value={value} />
                );
            }
            else {                
                columns.push(
                    <Column key={uuidv4()} columnId={`${rowId}_column_${index}`} value=""/>
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
