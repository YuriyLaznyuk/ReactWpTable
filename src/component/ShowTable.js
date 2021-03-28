import React, {useState} from 'react';
import {biathletes} from "../table/biathletes";

// const biatList = biathletes;
const biatList = biathletes.sort((a, b) => (a.id - b.id));

function ShowTable(props) {
    // const [list, setList] = useState([]);
    const [list, setList] = useState(biatList);
    const [name, setName] = useState();
    const [btn, setBtn] = useState(null);
    const [revers, setRevers] = useState('hike');
    const [flag, setFlag] = useState(false);


    function filterName(btn) {
        setBtn(btn);
        setRevers('hike');
        setFlag(false);
        setList(
            // biatList.filter(i => i.name.includes(name))
            list.filter(i => i.name.includes(name))
        )

    }

    // const defaultResults = (btn) => {
    //     if (list.length > 0) {
    //         setList([]);
    //     }
    //     setRevers('hike');
    //     setFlag(false);
    //     setTimeout(() => {
    //         setBtn(btn);
    //         biatList.sort((a, b) => (a.id - b.id));
    //         setList(biatList);
    //
    //     }, 0)
    // }


    const defaultResults = (btn) => {
        // if (list.length > 0) {
        //     setList([]);
        // }


        setRevers('hike');
        setFlag(false);
        setBtn(btn);
        setList(biatList.sort((a, b) => (a.id - b.id)));


    }


    function showSort(data, button, x, y) {
        // if (list.length > 0) {
        //     setList([]);
        // }

        setBtn(button);
        (btn === button && flag) ? setRevers('hike') : setRevers('drop');
        setFlag(!flag);

        // let arrHit = biatList.sort(function (a, b) {
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
                        return -y
                }
            }
            return 0
        });
        setList(arrHit)
        // console.log(arrHit)

    }


    return (
        <div>
            <table className="showTable">
                <thead>
                <tr>
                    <th colSpan={3}>
                        <input type="text" placeholder='name'
                               onChange={e => setName(e.target.value)}/>
                        <button className={(btn === 'search') ? 'actionBtn' : null}
                                onClick={() => filterName('search')}>search
                        </button>
                    </th>
                </tr>
                <tr>
                    <th colSpan={3}>
                        <button className={(btn === 'def') ? 'actionBtn' : null}
                                onClick={() => defaultResults('def')}>
                            default results
                        </button>

                    </th>
                </tr>
                <tr>
                    <th>name
                        <button className={(btn === 'btn1') ? 'actionBtn' : null}
                                onClick={() => showSort('name', "btn1", -1, 1)}
                        >{(btn === 'btn1' && revers === "hike") ? <span>&#9651;</span> : <span>&#9661;</span>}</button>
                    </th>
                    <th>hit
                        <button className={(btn === 'btn2') ? 'actionBtn' : null}
                                onClick={() => showSort('hit', "btn2", 1, -1)}
                        >{(btn === 'btn2' && revers === "hike") ? <span>&#9651;</span> : <span>&#9661;</span>}</button>
                    </th>
                    <th>short rate
                        <button className={(btn === 'btn3') ? 'actionBtn' : null}
                                onClick={() => showSort('speed', "btn3", 1, -1)}
                        >{(btn === 'btn3' && revers === "hike") ? <span>&#9651;</span> : <span>&#9661;</span>}</button>
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
                            )

                        }
                    )
                }
                </tbody>
            </table>
        </div>
    );
}

export default ShowTable;