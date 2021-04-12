import React, {useState} from 'react';
import {biathletes} from "../table/biathletes";

const biatList = biathletes.sort((a, b) => (a.id - b.id));

function ShowTable(props) {

    const [list, setList] = useState(biatList);
    const [name, setName] = useState();
    const [buttonSelected, setButtonSelected] = useState(null);
    const [revers, setRevers] = useState('hike');
    const [flag, setFlag] = useState(false);

    function filterName(btn) {
        setButtonSelected(btn);
        setRevers('hike');

        setFlag(false);
        setList(
            list.filter(i => i.name.toLowerCase().includes(name.toLowerCase()))
        );

    }

    const defaultResults = (btn) => {

        setRevers('hike');
        setFlag(false);
        setButtonSelected(btn);
        setList(biatList.sort((a, b) => (a.id - b.id)));

    };

    function showSort(data, button, x, y) {

        setButtonSelected(button);
        (buttonSelected === button && flag) ? setRevers('hike') : setRevers('drop');
        setFlag(!flag);

        let arrHit = list.sort(function (a, b) {

            if (a[data] > b[data]) {

                switch (revers) {
                    case "hike":
                        return x;
                    case "drop":
                        return -x;

                }
            }
            if (a[data] < b[data]) {

                switch (revers) {
                    case "hike":
                        return y;
                    case "drop":
                        return -y;
                }
            }
            return 0;

        });
        setList(arrHit);

    }

    return (
        <div>
            <table className="showTable">
                <thead>
                <tr>
                    <th colSpan={3}>
                        <input type="text" placeholder='name'
                               onChange={e => setName(e.target.value)}/>
                        <button className={(buttonSelected === 'search') ? 'actionBtn' : null}
                                onClick={() => filterName('search')}>search
                        </button>
                    </th>
                </tr>
                <tr>
                    <th colSpan={3}>
                        <button className={(buttonSelected === 'def') ? 'actionBtn' : null}
                                onClick={() => defaultResults('def')}>
                            default results
                        </button>

                    </th>
                </tr>
                <tr>
                    <th>name
                        <button className={(buttonSelected === 'btn1') ? 'actionBtn' : null}
                                onClick={() => showSort('name', "btn1", 1, -1)}
                        >{(buttonSelected === 'btn1' && revers === "hike") ? <span>&#9651;</span> :
                            <span>&#9661;</span>}</button>
                    </th>
                    <th>hit
                        <button className={(buttonSelected === 'btn2') ? 'actionBtn' : null}
                                onClick={() => showSort('hit', "btn2", 1, -1)}
                        >{(buttonSelected === 'btn2' && revers === "hike") ? <span>&#9651;</span> :
                            <span>&#9661;</span>}</button>
                    </th>
                    <th>short rate
                        <button className={(buttonSelected === 'btn3') ? 'actionBtn' : null}
                                onClick={() => showSort('speed', "btn3", 1, -1)}
                        >{(buttonSelected === 'btn3' && revers === "hike") ? <span>&#9651;</span> :
                            <span>&#9661;</span>}</button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    list.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.name}</td>
                                    <td>{item.hit}</td>
                                    <td>{item.speed}</td>
                                </tr>
                            );

                        }
                    )
                }
                </tbody>
            </table>
        </div>
    );
}

export default ShowTable;