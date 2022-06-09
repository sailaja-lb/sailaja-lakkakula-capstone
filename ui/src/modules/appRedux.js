export const EDITOR_SUCCESS = 'editor/EDITOR_SUCCESS'
export const EDITOR_FAILURE = 'editor/EDITOR_FAILURE'
export const SET_ROLE_CONTEXT = 'SET_ROLE_CONTEXT'
export const GET_ALL_PROCESS_START = 'GET_ALL_PROCESS_START'
export const GET_ALL_PROCESS_DONE = 'GET_ALL_PROCESS_DONE'

const initialState = {
    pmsRole: "",
    //isEditor: false,
    allProcess: []
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
        // case EDITOR_SUCCESS:
        //     return {
        //         ...state,
        //         isEditor: true
        //     }
        // case EDITOR_FAILURE:
        //     return {
        //         ...state,
        //         isEditor: false
        //     }
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