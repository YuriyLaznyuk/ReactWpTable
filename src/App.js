import React from 'react';
import ShowTable from "./component/ShowTable";
import ShowTableReducer from "./component/ShowTableReducer";

function App(props) {
    return (
        <div>
            <h1 className="app-h1">Table Biathlon useState</h1>
            <ShowTable/>
            <h1 className="app-h1">Table Biathlon useReducer</h1>
            <ShowTableReducer/>
        </div>
    );
}

export default App;