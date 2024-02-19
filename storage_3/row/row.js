import { v4 as uuidv4 } from 'uuid';
import Column from "../column/column";

export default function Row({rowId, rowFocusValues, updateFocusIndex}) {
    function renderColumns() {
        var isRow = false;
        const columns = [];
        if (updateFocusIndex !== undefined) {
            isRow = true;
        }

        for (let index = 1; index <= 5; index++) {
            if(isRow && rowFocusValues[index - 1] === true) {
                columns.push(
                    <Column key={uuidv4()} columnId={`${rowId}_column_${index}`} isFocus={true} updateFocusIndex={updateFocusIndex} />
                );
            }
            else {                
                columns.push(
                    <Column key={uuidv4()} columnId={`${rowId}_column_${index}`} isFocus={false}/>
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
