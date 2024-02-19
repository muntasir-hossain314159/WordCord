import { v4 as uuidv4 } from 'uuid';
import Column from "../column/column";

export default function Row({rowId, rowFocusValues, updateFocus}) {
    function renderColumns() {
        var isRow = false;
        const columns = [];
        if (updateFocus !== undefined) {
            isRow = true;
        }

        for (let index = 1; index <= 5; index++) {
            if(isRow && rowFocusValues[index - 1].isFocus === true) {
                columns.push(
                    <Column key={uuidv4()} columnId={`${rowId}_column_${index}`} isFocus={true} updateFocus={updateFocus} />
                );
            }
            else {                
                columns.push(
                    <Column key={uuidv4()} columnId={`${rowId}_column_${index}`} isFocus={false} valueParam={rowFocusValues[index-1].value}/>
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
