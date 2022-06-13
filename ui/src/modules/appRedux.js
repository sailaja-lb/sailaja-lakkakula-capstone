export const EDITOR_SUCCESS = 'editor/EDITOR_SUCCESS'
export const EDITOR_FAILURE = 'editor/EDITOR_FAILURE'
export const SET_ROLE_CONTEXT = 'SET_ROLE_CONTEXT'
export const GET_ALL_PROCESS_START = 'GET_ALL_PROCESS_START'
export const GET_ALL_PROCESS_DONE = 'GET_ALL_PROCESS_DONE'
export const ADD_NEW_PROCESS_CAROUSEL_INDEX = 'ADD_NEW_PROCESS_CAROUSEL_INDEX'
export const ADD_NEW_PROCESS = 'ADD_NEW_PROCESS'
export const ADD_NEW_PROCESS_SET_FIELDS = 'ADD_NEW_PROCESS_SET_FIELDS'
export const ADD_NEW_PROCESS_CANCEL = 'ADD_NEW_PROCESS_CANCEL'
export const SAVE_NEW_PROCESS_START = 'SAVE_NEW_PROCESS_START'
export const SAVE_NEW_PROCESS_DONE = 'SAVE_NEW_PROCESS_DONE'
export const DELETE_PROCESS_START = 'DELETE_PROCESS_START'
export const DELETE_PROCESS_DONE = 'DELETE_PROCESS_DONE'
export const EDIT_PROCESS_START = 'EDIT_PROCESS_START'
export const EDIT_PROCESS_DONE = 'EDIT_PROCESS_DONE'
// export const UPDATE_PROCESS_START = 'UPDATE_PROCESS_START'
export const UPDATE_PROCESS_DONE = 'UPDATE_PROCESS_DONE'
export const UPDATE_PROCESS_SET_FIELDS = 'UPDATE_PROCESS_SET_FIELDS'

const addStageMapper = {
    prompt: "",
    resType: "",
    choices: "",
    order: null
}

const addProcessMapper = {
    title: "",
    stages: [
        {
            prompt: "",
            resType: "",
            choices: "",
            order: 1,
            answer: ""
        },
        {
            prompt: "",
            resType: "",
            choices: "",
            order: 2,
            answer: ""
        },
        {
            prompt: "",
            resType: "",
            choices: "",
            order: 3,
            answer: ""
        }
    ]
}

const initialState = {
    pmsRole: "",
    allProcess: [],
    isAddNewProcess: false,
    addNewProcess: null,
    loading: false,
    newProcessMessageSuccessful: false,
    processCarouselIndex: 0
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
                allProcess: action.payload.allProcess
            }
        case ADD_NEW_PROCESS:
            return {
                ...state,
                isAddNewProcess: true,
                processCarouselIndex: 0,
                newProcessMessageSuccessful: false,
                addNewProcess: {...addProcessMapper}
            }
        case EDIT_PROCESS_START:
            return {
                ...state,
                isAddNewProcess: true,
                processCarouselIndex: 0,
                addNewProcess: action.payload.process
            }
        case ADD_NEW_PROCESS_SET_FIELDS:
            return {
                ...state,
                addNewProcess: action.payload.addNewProcess
            }
        // case SAVE_NEW_PROCESS_START:
        //     return {
        //         ...state
        //     }
        case SAVE_NEW_PROCESS_DONE:
            return {
                ...state,
                newProcess: null,
                newProcessMessageSuccessful: true,
                isAddNewProcess: false,
                allProcess: action.payload.allProcess
            }
            //both same why?
        case EDIT_PROCESS_DONE:
            return {
                ...state,
                newProcess: null,
                newProcessMessageSuccessful: true,
                isAddNewProcess: false,
                allProcess: action.payload.allProcess
            }
        case UPDATE_PROCESS_DONE:
            return {
                ...state,
                allProcess: action.payload.allProcess
            }
        case DELETE_PROCESS_DONE:
            return {
                ...state,
                allProcess: action.payload.allProcess,
                deleteProcessMessageSuccessful: true
            }
        case ADD_NEW_PROCESS_CAROUSEL_INDEX:
            return {
                ...state,
                processCarouselIndex: action.payload.processCarouselIndex
            }
        case ADD_NEW_PROCESS_CANCEL:
            return {
                ...state,
                isAddNewProcess: false,
                addNewProcess: null
            }
        case UPDATE_PROCESS_SET_FIELDS:
            return {
                ...state,
                allProcess: action.payload.allProcess
            }
        default:
            return {...state}
    }
}

export async function updateProcessDetails(allProcess, process) {
    return allProcess.map(each => {
        if (each.id === process.id) {
            return {...each, ...process}
        }
        return each;
    })
}

export function initLoadAllProcess(_fetch=fetch) {
    return async function allProcess(dispatch) {
        dispatch({type: GET_ALL_PROCESS_START})
        const url = `http://localhost:8080/editor/allProcess`
        const response = await _fetch(url)

        if (response.ok) {
            const result = await response.json()
            dispatch({type: GET_ALL_PROCESS_DONE, payload: {allProcess: result}})
        }
    }
}

export function addNewProcessSetFields(addFieldName, addFieldVal="", stageIndex=-1) {
    return async function addNewProcessSetFields(dispatch, getState) {
        const state = getState()
        const addNewProcess = {...state.addNewProcess}
        if (addFieldName === "title") {
            addNewProcess.title = addFieldVal
        }
        // else if (addFieldName === "stage") {
        //     addNewProcess.stages.push({...addStageMapper})
        // }

        if (stageIndex > -1) {
            const currentStage = addNewProcess.stages[stageIndex]
            currentStage[addFieldName] = addFieldVal
            if (addFieldName === "resType") {
                if (addFieldVal === "boolean") {
                    currentStage["choices"] = "True|False"
                } else if (addFieldVal === "multi") {
                    currentStage["choices"] = "||"
                } else {
                    currentStage["choices"] = ""
                }
            }
        }
        dispatch({type: ADD_NEW_PROCESS_SET_FIELDS, payload: {addNewProcess}})
    }
}

export function updateProcessSetFields(updateFieldName, updateFieldVal="", processId, stageId=null) {
    return async function updateProcessSetFields(dispatch, getState) {
        const state = getState()
        const allProcess = [...state.allProcess]
        let updateProcess = allProcess.find(each => each.id === processId)
        if (updateProcess) {
            // updateProcess = {...updateProcess}
            if (updateFieldName === "title") {
                updateProcess.title = updateFieldVal
            }
            const updateStage = updateProcess.stages.find(each => each.id === stageId)
            if (updateStage) {
                updateStage[updateFieldName] = updateFieldVal
            }
        }
        dispatch({type: UPDATE_PROCESS_SET_FIELDS, payload: {allProcess}})
    }
}

export function saveNewProcess(_fetch=fetch) {
    return async function saveProcess(dispatch, getState) {
        // dispatch({type: SAVE_NEW_PROCESS_START})
        const state = getState()
        const newProcess = state.addNewProcess
        const url = `http://localhost:8080/editor/createProcess`
        const response = await _fetch(url, {
            method: 'POST',
            body: JSON.stringify(newProcess),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            const result = await response.json()
            dispatch({type: SAVE_NEW_PROCESS_DONE, payload: {allProcess: [result, ...state.allProcess]}})
        }
    }
}

export function editProcess(pId, _fetch=fetch) {
    return async function editProcess(dispatch, getState) {
        const state = getState()
        const process = state.addNewProcess
        if (process.id === pId) {
            const allProcess = [...state.allProcess]
            const url = `http://localhost:8080/editor/updateProcess/${pId}`
            const response = await _fetch(url, {
                method: 'PUT',
                body: JSON.stringify(process),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            if (response.ok) {
                const result = await response.json()
                const processIndex = allProcess.findIndex(ps => ps.id === pId)
                if (processIndex >= 0) {
                    allProcess[processIndex] = result
                }
                dispatch({type: EDIT_PROCESS_DONE, payload: {allProcess}})
            }
        }
    }
}

export function deleteProcess(processId, _fetch=fetch) {
    return async function deleteProcess(dispatch, getState) {
        dispatch({type: DELETE_PROCESS_START})
        const url = `http://localhost:8080/editor/deleteProcess/${processId}`
        const response = await _fetch(url, {
            method: 'DELETE'
        })

        if (response.ok) {
            const state = getState()
            const allProcess = [...state.allProcess]
            const deleteProcessIndex = allProcess.findIndex((each) => each.id === processId)
            if (deleteProcessIndex >= 0) {
                allProcess.splice(deleteProcessIndex, 1)
            }
            dispatch({type: DELETE_PROCESS_DONE, payload: {allProcess}})
        }
    }
}

export function updateProcess(processId, status={}, _fetch=fetch) {
    return async function updateProcess(dispatch, getState) {
        // dispatch({type: UPDATE_PROCESS_START})
        const state = getState()
        const url = `http://localhost:8080/editor/updateProcess/${processId}`
        const process = state.allProcess.find(each => each.id === processId)
        const response = await _fetch(url, {
            method: 'PUT',
            body: JSON.stringify({...process, ...status}),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            const result = await response.json()
            const allProcess = await updateProcessDetails(state.allProcess, result)
            dispatch({type: UPDATE_PROCESS_DONE, payload: {allProcess}})
        }
    }
}