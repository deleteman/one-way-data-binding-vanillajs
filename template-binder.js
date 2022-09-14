import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

function capitalize(str) {
    return str? str.charAt(0).toUpperCase() + str.slice(1) : "";
}

export function newBoundVariable(name, initValue) {
    let newVal = initValue;
    let elemID = uuidv4().split("-").join("")
    Object.defineProperty(window, name, {
        set: function(value) {
            newVal = value
            let targetRef = document.getElementById(elemID)
            if(!targetRef) return
            targetRef.innerHTML = value
        },
        get: function() {
            return {
                toString() {
                    return newVal
                },
                realName() {
                    return elemID
                }
            }
        }
    })
    return window
}

export function html(strings, ...variables) {
    let newHTML = variables.map( (_var, idx) => {
        if(typeof _var == "function") return strings[idx] + _var.toString();
        let elemID = _var.realName()
        return strings[idx] + `<span id="${elemID}">${_var}</span>`
    })
    newHTML.push(strings[strings.length - 1])
    return newHTML.join("");
}

export function render(node, container) {
    const range = document.createRange()

    range.selectNode(document.querySelector("#" + container))
    const htmlNode =range.createContextualFragment(node);
 
    document.querySelector("body").appendChild(htmlNode)
}

export function useState(varName, init) {
    let { [varName]: _var} = newBoundVariable(varName, init)
    const setterKey = 'set' + capitalize(varName)
    window[setterKey] = function(val) {
        return window[varName] = val
    }
    return  [_var, window[setterKey]]
}

export function useReactState(init) {
    const varName = uuidv4().split("-").join("")
    let { [varName]: _var} = newBoundVariable(varName, init)
    return  [_var, function(val) {
        return window[varName] = val
    }]
}

export function useFn(cb) {
    window[cb.name] = cb
}
