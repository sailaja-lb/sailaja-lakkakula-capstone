import reducer, {
    ADD_NEW_PROCESS, DELETE_PROCESS_DONE, deleteProcess, EDIT_PROCESS_DONE, editProcess, GET_ALL_PROCESS_DONE,
    GET_ALL_PROCESS_START, initLoadAllProcess, SAVE_NEW_PROCESS_DONE, saveNewProcess, SET_ROLE_CONTEXT, startProcess

} from "./appRedux";

//set_role_context
it('should set pms role with editor when type SET_ROLE_CONTEXT is dispatched', () => {
    const initialState = reducer();
    initialState.pmsRole = "";
    //const role = "editor";
    const state = reducer(initialState, {type: SET_ROLE_CONTEXT, payload:"editor"})
    expect(state.pmsRole).toBe("editor")
})
//get_all_process_start test
it('should set loading state to true when get_all_process_start is dispatched', () => {
    const state = reducer(undefined, {type: GET_ALL_PROCESS_START})
    expect(state.loading).toBe(true)
})

//Add_New_process test
it('should set addNewProcess to true when dispatched',() => {
        const state = reducer(undefined, {type: ADD_NEW_PROCESS})
        expect(state.addNewProcess).toBe(true)
        expect(state.newProcessMessageSuccessful).toBe(false)
})
//get_all_process_done
it('should set loading to false and allProcess when GET_ALL_PROCESS_DONE dispatch is called',() => {
    const currentState = reducer()
    currentState.loading = true;
    const allProcess = [];
    const state = reducer(currentState, {type: GET_ALL_PROCESS_DONE, payload: allProcess})
    expect(state.loading).toBe(false)
    expect(state.allProcess).toStrictEqual([])
})

it('should save new process when dispatched',() =>{
        const currentState = reducer();
        currentState.newProcessMessageSuccessful=  false;
        currentState.addNewProcess= true;
        const state = reducer(currentState, {type: SAVE_NEW_PROCESS_DONE})
        expect(state.newProcessMessageSuccessful).toBe(true)
        expect(state.addNewProcess).toBe(false)
})

it('should dispatch GET_ALL_PROCESS_START then GET_ALL_PROCESS_DONE when response is ok', async () => {
    const url = `http://localhost:8080/editor/allProcess`
    let _url
    const token = 'some process'
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res(token))
        }))
    }

    const dispatch = jest.fn()
    const sideEffect = initLoadAllProcess(mockFetch)
    await sideEffect(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: GET_ALL_PROCESS_START})
    expect(dispatch).toHaveBeenCalledWith({type: GET_ALL_PROCESS_DONE, payload: token})
})

it('should dispatch DELETE_PROCESS_DONE w/ token when start process for editor', async () => {
    const dispatch = jest.fn()
    const token = 'some token'
    const url = `http://localhost:8080/editor/deleteProcess/${token}`
    let _url1

    const mockFetch = (url) => {
        _url1 = url
        return new Promise(resolve => resolve({
            ok: true,
            method: 'DELETE'
        }))
    }
    const sideEffect = deleteProcess(token, mockFetch)
    await sideEffect(dispatch)
    expect(_url1).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_PROCESS_DONE})

})


it('should dispatch DELETE_PROCESS_DONE w/ token when start process for follower', async () => {
    const dispatch = jest.fn()
    const token = 'some token'
    const url = `http://localhost:8080/follower/deleteProcess/${token}`
    let _url

    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            method: 'DELETE'
        }))
    }
    const sideEffect = startProcess(token, mockFetch)
    await sideEffect(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_PROCESS_DONE})

})

it('should dispatch EDIT_PROCESS_DONE w/ token and process ', async () => {
    const dispatch = jest.fn()
    const token = 'some token'
   const process = "some process"
    const url = `http://localhost:8080/editor/updateProcess/{token}`
    let _url2

    const mockFetch = (url) => {
        _url2 = url
        return new Promise(resolve => resolve({
            ok: true,
            method: 'PUT',
            body: JSON.stringify(process),
            headers: {
                "Content-Type": "application/json"
            }
        }))
    }
    // const sideEffect = initLoadAllProcess(mockFetch)
    // await sideEffect(dispatch)
    const sideEffect = editProcess(token, process, mockFetch)
    await sideEffect(dispatch)
    expect(_url2).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: EDIT_PROCESS_DONE})

})

it('should dispatch SAVE_NEW_PROCESS w/ new process ', async () => {
    const dispatch = jest.fn()
    const newProcess = "new process"
    const url = `http://localhost:8080/editor/createProcess`
    let _url3

    const mockFetch = (url) => {
        _url3 = url
        return new Promise(resolve => resolve({
            ok: true,
            method: 'POST',
            body: JSON.stringify(newProcess),
            headers: {
                "Content-Type": "application/json"
            }
        }))
    }
    // const sideEffect = initLoadAllProcess(mockFetch)
    // await sideEffect(dispatch)
    const sideEffect = saveNewProcess(newProcess, mockFetch)
    await sideEffect(dispatch)
    expect(_url3).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: SAVE_NEW_PROCESS_DONE})

})




