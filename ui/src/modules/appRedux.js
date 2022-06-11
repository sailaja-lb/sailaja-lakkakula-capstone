export const EDITOR_SUCCESS = 'editor/EDITOR_SUCCESS'
export const EDITOR_FAILURE = 'editor/EDITOR_FAILURE'
export const SET_ROLE_CONTEXT = 'SET_ROLE_CONTEXT'
export const GET_ALL_PROCESS_START = 'GET_ALL_PROCESS_START'
export const GET_ALL_PROCESS_DONE = 'GET_ALL_PROCESS_DONE'
export const ADD_NEW_PROCESS = 'ADD_NEW_PROCESS'
export const SAVE_NEW_PROCESS = 'SAVE_NEW_PROCESS'
export const SAVE_NEW_PROCESS_DONE = 'SAVE_NEW_PROCESS_DONE'
export const DELETE_PROCESS = 'DELETE_PROCESS'
export const DELETE_PROCESS_DONE = 'DELETE_PROCESS_DONE'
export const EDIT_PROCESS = 'EDIT_PROCESS'
export const EDIT_PROCESS_DONE = 'EDIT_PROCESS_DONE'

const initialState = {
    pmsRole: "",
    allProcess: [],
    addNewProcess: false,
    loading: false,
    newProcessMessageSuccessful: false,
}
export default function reducer(state = initialState, action) {
    switch (action?.type) {
        case SET_ROLE_CONTEXT:
            return {
                ...state,
                pmsRole: action.payload.role
            }
        case GET_ALL_PROCESS_START:
            return {
                ...state,
                loading: true
            }
        case GET_ALL_PROCESS_DONE:
            return {
                ...state,
                loading: false,
                allProcess: action.payload
            }
        case ADD_NEW_PROCESS:
            return {
                ...state,
                addNewProcess: true,
                newProcessMessageSuccessful: false
            }
        case SAVE_NEW_PROCESS:
            return {
                ...state,
                newProcess: action.payload.newProcess
            }
        case SAVE_NEW_PROCESS_DONE:
            return {
                ...state,
                newProcess: null,
                newProcessMessageSuccessful: true,
                addNewProcess: false
            }
        default:
            return {...state}
    }
}

export function initLoadAllProcess(_fetch=fetch) {
    return async function allProcess(dispatch) {
        dispatch({type: GET_ALL_PROCESS_START})
        const url = `http://localhost:8080/editor/allProcess`
        const response = await _fetch(url)

        if (response.ok) {
            const result = await response.json()
            dispatch({type: GET_ALL_PROCESS_DONE, payload: result})
        }
    }
}

export function saveNewProcess(newProcess, _fetch=fetch) {
    return async function saveProcess(dispatch) {
        dispatch({type: SAVE_NEW_PROCESS, payload:{newProcess}})
        const url = `http://localhost:8080/editor/createProcess`
        const response = await _fetch(url, {
            method: 'POST',
            body: JSON.stringify(newProcess),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            dispatch({type: SAVE_NEW_PROCESS_DONE})
        }
    }
}

export function editProcess(token, process, _fetch=fetch) {
    return async function editProcess(dispatch) {
        // dispatch({type: EDIT_PROCESS})
        const url = `http://localhost:8080/editor/updateProcess/{token}`
        const response = await _fetch(url, {
            method: 'PUT',
            body: JSON.stringify(process),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            dispatch({type: EDIT_PROCESS_DONE})
        }
    }
}

export function deleteProcess(token, _fetch=fetch) {
    return async function deleteProcess(dispatch) {
        const url = `http://localhost:8080/editor/deleteProcess/${token}`
        const response = await _fetch(url, {
            method: 'DELETE'
        })

        if (response.ok) {
            dispatch({type: DELETE_PROCESS_DONE})
        }
    }
}

export function startProcess(token, _fetch=fetch) {
    return async function deleteProcess(dispatch) {
        const url = `http://localhost:8080/follower/deleteProcess/${token}`
        const response = await _fetch(url, {
            method: 'DELETE'
        })

        if (response.ok) {
            dispatch({type: DELETE_PROCESS_DONE})
        }
    }
}