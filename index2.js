import {html, useState, useReactState, useFn} from './template-binder.js'


export function App() {
    let [counter, setCounter] = useState('counter', 0)
    let [counter2, setCounter2] = useState('counter2', 0)
    let [myNumber, setMyNumber] = useReactState(0)

    useFn(function incrMyNumber() {
        setMyNumber(myNumber + 1)
    })

    useFn( function Reset() {
        setCounter(0)
    })

    useFn( function incrCounter() {
        setCounter(counter + 1)
    })

    useFn( function decrCounter() {
        setCounter(counter - 1)
    })

    return html`
        <div class='App'>
            <h1>"React" Counter</h1>
            <p>
                Let's update this counter: ${counter}
                <button onClick="incrCounter()">+</button>
                <button onClick="decrCounter()">-</button>
                <button onClick="Reset()">Reset</button>
            </p>
            <p>
                Or this counter instead: ${counter2}
                <button onClick="counter2++">+</button>
                <button onClick="setCounter2(counter2 - 1)">-</button>
            </p>
              <p>
                Or this counter instead: ${myNumber}
                <button onClick="incrMyNumber()">+</button>
                <button onClick="setMyNumber(myNumber - 1)">-</button>
            </p>
        </div>
        `
}