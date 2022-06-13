import reducer, {
    ADD_NEW_PROCESS,
    ADD_NEW_PROCESS_CANCEL,
    ADD_NEW_PROCESS_CAROUSEL_INDEX,
    ADD_NEW_PROCESS_SET_FIELDS,
    addNewProcessSetFields,
    DELETE_PROCESS_DONE,
    deleteProcess,
    EDIT_PROCESS_DONE,
    EDIT_PROCESS_START,
    editProcess,
    GET_ALL_PROCESS_DONE,
    GET_ALL_PROCESS_START,
    initLoadAllProcess,
    SAVE_NEW_PROCESS_DONE,
    saveNewProcess,
    SET_ROLE_CONTEXT,
    startProcess,
    UPDATE_PROCESS_DONE,
    UPDATE_PROCESS_SET_FIELDS,
    updateProcess,
    updateProcessDetails, updateProcessSetFields

} from "./appRedux";

//set_role_context
it('should set pms role with editor when type SET_ROLE_CONTEXT is dispatched', () => {
    const initialState = reducer();
    initialState.pmsRole = "";
    const role = "editor";
    const state = reducer(initialState, {type: SET_ROLE_CONTEXT, payload:{role: "editor"}})
    expect(state.pmsRole).toBe("editor")
})
//get_all_process_start test
it('should set loading state to true when get_all_process_start is dispatched', () => {
    const state = reducer(undefined, {type: GET_ALL_PROCESS_START})
    expect(state.loading).toBe(true)
})

//get_all_process_done
it('should set loading to false and allProcess when GET_ALL_PROCESS_DONE dispatch is called',() => {
    const currentState = reducer()
    currentState.loading = true;
    const allProcess = [];
    const state = reducer(currentState, {type: GET_ALL_PROCESS_DONE, payload: {allProcess: []}})
    expect(state.loading).toBe(false)
    expect(state.allProcess).toStrictEqual([])
})
//Add_New_process test
it('should set addNewProcess to true when dispatched',() => {
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
    const state = reducer(undefined, {type: ADD_NEW_PROCESS})
    expect(state.newProcessMessageSuccessful).toBe(false)
    expect(state.processCarouselIndex).toBe(0)
    expect(state.addNewProcess).toStrictEqual(addProcessMapper)
})
//Edit process start test
it('should set addNewProcess to process when dispatch EDIT_PROCESS_START',() => {
    const process = [];
    const state = reducer(undefined, {type: EDIT_PROCESS_START, payload:{process:[]}})
    expect(state.isAddNewProcess).toBe(true)
    expect(state.processCarouselIndex).toBe(0)
    expect(state.addNewProcess).toStrictEqual(process)
})
//ADD_NEW_PROCESS_SET_FIELDS test
it('should set addNewProcess to addNewProcess when dispatch ADD_NEW_PROCESS_SET_FIELDS',() => {
    const addNewProcess = [];
    const state = reducer(undefined, {type: ADD_NEW_PROCESS_SET_FIELDS, payload:{addNewProcess:[]}})
    expect(state.addNewProcess).toStrictEqual(addNewProcess)
})
//SAVE_NEW_PROCESS_DONE test
it('should save new process when dispatched SAVE_NEW_PROCESS_DONE',() => {
        const currentState = reducer();
        currentState.newProcessMessageSuccessful=  false;
        currentState.isAddNewProcess= true;
        currentState.newProcess = [];
        const allProcess = [];
        const state = reducer(currentState, {type: SAVE_NEW_PROCESS_DONE, payload:{allProcess:[]}})
        expect(state.newProcessMessageSuccessful).toBe(true)
        expect(state.isAddNewProcess).toBe(false)
        expect(state.newProcess).toBe(null)
})
//EDIT_PROCESS_DONE test
it('should edit process when dispatched EDIT_PROCESS_DONE',() => {
    const currentState = reducer();
    currentState.newProcessMessageSuccessful=  false;
    currentState.isAddNewProcess= true;
    currentState.newProcess = [];
    const allProcess = [];
    const state = reducer(currentState, {type: EDIT_PROCESS_DONE, payload:{allProcess:[]}})
    expect(state.newProcessMessageSuccessful).toBe(true)
    expect(state.isAddNewProcess).toBe(false)
    expect(state.newProcess).toBe(null)
})
//UPDATE_PROCESS_DONE test
it('should update process when dispatched UPDATE_PROCESS_DONE',() => {
    const currentState = reducer();
    // currentState.newProcessMessageSuccessful=  false;
    // currentState.isAddNewProcess= true;
    currentState.allProcess = ['current'];
     const allProcess = ['updated'];
    const state = reducer(currentState, {type: UPDATE_PROCESS_DONE, payload:{allProcess:['updated']}})
    expect(state.allProcess).toStrictEqual(['updated'])
})
//DELETE_PROCESS_DONE
it('should delete process when dispatched DELETE_PROCESS_DONE',() => {
    const currentState = reducer();
    currentState.deleteProcessMessageSuccessful =  false;
    currentState.allProcess = ['process1', 'process2'];
    const state = reducer(currentState, {type: DELETE_PROCESS_DONE, payload:{allProcess:['process2']}})
    expect(state.allProcess).toStrictEqual(['process2'])
    expect(state.deleteProcessMessageSuccessful).toBe(true)
})
//ADD_NEW_PROCESS_CAROUSEL_INDEX test
it('should add new process carousel index when dispatched ADD_NEW_PROCESS_CAROUSEL_INDEX',() => {
    const currentState = reducer();
    currentState.processCarouselIndex =  2;
    const state = reducer(currentState, {type: ADD_NEW_PROCESS_CAROUSEL_INDEX, payload:{processCarouselIndex: 3}})
    expect(state.processCarouselIndex).toBe(3)
})
//ADD_NEW_PROCESS_CANCEL test
it('should cancel new process when ADD_NEW_PROCESS_CANCEL is dispatched',() =>{
    const currentState = reducer();
    currentState.isAddNewProcess=  true;
    currentState.addNewProcess= "some process";
    const state = reducer(currentState, {type: ADD_NEW_PROCESS_CANCEL})
    expect(state.isAddNewProcess).toBe(false)
    expect(state.addNewProcess).toBe(null)
})
//UPDATE_PROCESS_SET_FIELDS test
it('should update process set fields when dispatched UPDATE_PROCESS_SET_FIELDS',() => {
    const currentState = reducer();
    currentState.allProcess =  ['process1', 'process2', 'process3'];
    const allProcess = ['process4']
    const state = reducer(currentState, {type: UPDATE_PROCESS_SET_FIELDS, payload:{allProcess:['process4'] }})
    expect(state.allProcess).toStrictEqual( allProcess)
})




//updateProcessDetails test
it('should update process details by process id with updateProcessDetails', async () => {
    const actual = [{id: 1, title: 'process1', status:"", stages: []}, {id: 2, title: 'process2', status:"started", stages: []}];
    const expected = [{id: 1, title: 'process1 updated', status:"", stages: []}, {id: 2, title: 'process2', status:"started", stages: []}];
    const updateResult = await updateProcessDetails(actual, expected[0])
    expect(updateResult).toStrictEqual(expected)

})


//initLoadAllProcess test
it('should dispatch GET_ALL_PROCESS_START then GET_ALL_PROCESS_DONE when response is ok', async () => {
    const url = `http://localhost:8080/editor/allProcess`
    let _url
    const result = 'some process'
    const mockFetch = (url) => {
        _url = url
        return new Promise(resolve => resolve({
            ok: true,
            json: () => new Promise(res => res(result))
        }))
    }

    const dispatch = jest.fn()
    const sideEffect = initLoadAllProcess(mockFetch)
    await sideEffect(dispatch)
    expect(_url).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: GET_ALL_PROCESS_START})
    expect(dispatch).toHaveBeenCalledWith({type: GET_ALL_PROCESS_DONE, payload:
            {allProcess: result}
    })
})

//addNewProcessSetFields
it('should dispatch ADD_NEW_PROCESS_SET_FIELDS w/ new process  ', async () => {
    const dispatch = jest.fn()
    const state = { addNewProcess: { title: "New process", status: "", stages: [] } }
    const getState = () => state
    const setNewFields = addNewProcessSetFields("title", "update new process")
    await setNewFields(dispatch, getState)
    const expectedProcess = { addNewProcess: { title: "update new process", status: "", stages: [] } }
    expect(dispatch).toHaveBeenCalledWith({type: ADD_NEW_PROCESS_SET_FIELDS, payload: expectedProcess})
})
//updateProcessSetFields
it('should dispatch UPDATE_PROCESS_SET_FIELDS by process id w/ existing process  ', async () => {
    const dispatch = jest.fn()
    const state = { allProcess: [{id: 1, title: 'process1', status:"", stages: []}, {id: 2, title: 'process2', status:"started", stages: []}] }
    const getState = () => state
    const updateFields = updateProcessSetFields("title", "update new process", 1)
    await updateFields(dispatch, getState)
    const expectedAllProcess = [{id: 1, title: 'update new process', status:"", stages: []}, {id: 2, title: 'process2', status:"started", stages: []}]
    expect(dispatch).toHaveBeenCalledWith({type: UPDATE_PROCESS_SET_FIELDS, payload: {allProcess: expectedAllProcess}})
})
//saveNewProcess
it('should dispatch SAVE_NEW_PROCESS w/ new process ', async () => {
    const dispatch = jest.fn()
    const addNewProcess = {title: 'process3', status:"", stages: []}
    const allProcess = [{id: 1, title: 'process1', status:"", stages: []}, {id: 2, title: 'process2', status:"started", stages: []}]
    const url = `http://localhost:8080/editor/createProcess`
    let _url3
    const expected = [addNewProcess, ...allProcess]
    const mockFetch = (url) => {
        _url3 = url
        return new Promise(resolve => resolve({
            ok: true,
            method: 'POST',
            body: JSON.stringify(addNewProcess),
            headers: {
                "Content-Type": "application/json"
            },
            json: () => new Promise(res => res(addNewProcess))
        }))
    }
    const state = {allProcess, addNewProcess}
    const getState = () => state
    // const sideEffect = initLoadAllProcess(mockFetch)
    // await sideEffect(dispatch)
    const sideEffect = saveNewProcess(mockFetch)
    await sideEffect(dispatch, getState)
    expect(_url3).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: SAVE_NEW_PROCESS_DONE, payload: {allProcess: expected}})

})

//deleteProcess
it('should dispatch DELETE_PROCESS_DONE w/ token when start process for editor', async () => {
    const dispatch = jest.fn()
    const processId = 1
    const url = `http://localhost:8080/editor/deleteProcess/${processId}`
    let _url1

    const mockFetch = (url) => {
        _url1 = url
        return new Promise(resolve => resolve({
            ok: true,
            method: 'DELETE'
        }))
    }
    const state = { allProcess: [{id: 1, title: 'process1', status:"", stages: []}, {id: 2, title: 'process2', status:"started", stages: []}] }
    const getState = () => state
    const sideEffect = deleteProcess(processId, mockFetch)
    await sideEffect(dispatch, getState)
    const expected = { allProcess: [{id: 2, title: 'process2', status:"started", stages: []}] }
    expect(_url1).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: DELETE_PROCESS_DONE, payload:{allProcess: expected.allProcess}})

})
//update process status
it('should dispatch UPDATE_PROCESS_DONE with all processes', async () => {
    const dispatch = jest.fn()
    const processId = 1
    const url = `http://localhost:8080/editor/updateProcess/${processId}`
    let _url2

    const mockFetch = (url) => {
        _url2 = url
        return new Promise(resolve => resolve({
            ok: true,
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            json: () => new Promise(res => res({id: 1, title: 'process1', status:"started", stages: []}))
        }))
    }
    const state = { allProcess: [{id: 1, title: 'process1', status:"", stages: []}, {id: 2, title: 'process2', status:"started", stages: []}] }
    const getState = () => state
    const sideEffect = updateProcess(processId, {status: "started"}, mockFetch)
    await sideEffect(dispatch, getState)
    const expected = { allProcess: [{id: 1, title: 'process1', status:"started", stages: []}, {id: 2, title: 'process2', status:"started", stages: []}] }
    expect(_url2).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: UPDATE_PROCESS_DONE, payload:{allProcess: expected.allProcess}})

})
//editProcess
it('should dispatch EDIT_PROCESS_DONE w/ pId ', async () => {
    const dispatch = jest.fn()
    const pId = 1
    const process = {id: 1, title: 'process1', status:"", stages: []}
    const url = `http://localhost:8080/editor/updateProcess/${pId}`
    let _url2

    const mockFetch = (url) => {
        _url2 = url
        return new Promise(resolve => resolve({
            ok: true,
            method: 'PUT',
            body: JSON.stringify(process),
            headers: {
                "Content-Type": "application/json"
            },
            json: () => new Promise(res => res({id: 1, title: 'process1', status:"", stages: [{prompt: "stage1", order: 1, resType: "text"}]}))
        }))
    }
    const state = {
        allProcess: [{id: 1, title: 'process1', status:"", stages: []}, {id: 2, title: 'process2', status:"started", stages: []}],
        addNewProcess: {id: 1, title: 'process1', status:"", stages: [{prompt: "stage1", order: 1, resType: "text"}]}
    }

    const sideEffect = editProcess(pId, mockFetch)
    const getState = () => state
    await sideEffect(dispatch, getState)
    const expected = { allProcess: [{id: 1, title: 'process1', status:"", stages: [{prompt: "stage1", order: 1, resType: "text"}]}, {id: 2, title: 'process2', status:"started", stages: []}] }
    expect(_url2).toBe(url)
    expect(dispatch).toHaveBeenCalledWith({type: EDIT_PROCESS_DONE,payload:{allProcess: expected.allProcess} })

})