import { v4 as uuidv4 } from 'uuid';
import Column from "../column/column";

export default function Row({rowId, currentRowNumber}) {
    function renderColumns() {
        const columns = [];

        for (let index = 1; index <= 5; index++) {
            columns.push(
                <Column key={uuidv4()} columnId={`${rowId}_column_${index}`} currentRowNumber={currentRowNumber} currentColumnNumber={index} />
            );
        }
        return columns;
    }
        
    return (
        <div className="row justify-content-center flex-nowrap gx-2 mb-3" id={rowId}>
            {renderColumns()}
        </div>
    );
}
