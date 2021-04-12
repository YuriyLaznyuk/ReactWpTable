import React, {useReducer} from 'react';
import {biathletes} from "../table/biathletes";

const listInit = biathletes.sort((a, b) => (a.id - b.id));
const initState = {list: listInit, name: '', buttonSelected: null, revers: 'hike', flag: false};

function reducer(state, action) {
    switch (action.type) {
        case 'filter name':
            return {
                ...state,
                buttonSelected: 'search',
                revers: 'hike',
                flag: false,
                list: state.list.filter(i => i.name.toLowerCase().includes(
                    state.name.toLowerCase()
                ))
            };
        case 'search name':
            return {
                ...state,
                name: action.payload
            };
        case 'default results':
            return {
                ...state,
                list: listInit.sort((a,b)=>(a.id-b.id)),
                buttonSelected: 'default',
                revers: 'hike',
                flag: false

            };
        case 'click button':
            let arrSort = state.list.sort(function (a, b) {
                if (a[action.payload.data] > b[action.payload.data]) {
                    switch (state.revers) {
                        case "hike":
                            return action.payload.x;
                        case "drop":
                            return -action.payload.x;
                    }
                }
                if (a[action.payload.data] < b[action.payload.data]) {
                    switch (state.revers) {
                        case "hike":
                            return action.payload.y;
                        case "drop":
                            return -action.payload.y;
                    }
                }
                return 0;

            });
            return {
                ...state,
                buttonSelected: action.payload.button,
                revers: (state.buttonSelected===action.payload.button && state.flag)
                ? 'hike' :'drop',
                flag: !state.flag,
            }
        default:
            return state;

    }

}

function ShowTableReducer(props) {
    const [state, dispatch] = useReducer(reducer, initState);
    const {list, buttonSelected, revers} = state;

    return (
        <div>
            <table className='showTable'>
                <thead>
                <tr>
                    <td colSpan={3}>
                        <input onChange={e => dispatch({
                            type: 'search name', payload: e.target.value
                        })} type="text" placeholder='name'/>
                        <button className={(buttonSelected === 'search') ? 'actionBtn' : null} onClick={() => dispatch({
                            type: 'filter name'
                        })}>search
                        </button>
                    </td>
                </tr>
                <tr>
                    <td colSpan={3}>
                        <button className={(buttonSelected === 'default') ? 'actionBtn' : null}
                                onClick={() => dispatch({
                                    type: 'default results'
                                })}>default results
                        </button>
                    </td>
                </tr>
                <tr>
                    <th>name
                        <button className={(buttonSelected === 'btn1') ? 'actionBtn' : null} onClick={()=>dispatch({
                            type:'click button',payload:{data:'name',button:'btn1',x:1, y:-1}
                        })}>{(buttonSelected==='btn1' && revers==='hike')
                        ? <span>&#9651;</span> : <span>&#9661;</span>}</button>
                    </th>
                    <th>
                        hit
                        <button className={(buttonSelected === 'btn2') ? 'actionBtn' : null} onClick={()=>dispatch({
                            type:'click button', payload:{data:'hit',button:'btn2', x:1, y:-1}
                        })}>{(buttonSelected==='btn2' && revers==='hike')
                        ? <span>&#9651;</span> :<span>&#9661;</span>}</button>
                    </th>
                    <th>
                        short rate
                        <button className={(buttonSelected === 'btn3') ? 'actionBtn' : null} onClick={()=>dispatch({
                            type:'click button', payload:{data:'speed', button:'btn3', x:1, y:-1}
                        })}>{(buttonSelected==='btn3' && revers==='hike')
                        ? <span>&#9651;</span> : <span>&#9661;</span> }</button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {list.map((item, index) =>
                    <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.hit}</td>
                        <td>{item.speed}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default ShowTableReducer;