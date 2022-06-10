import reducer, {
    ADD_NEW_PROCESS, GET_ALL_PROCESS_DONE,
    GET_ALL_PROCESS_START, SET_ROLE_CONTEXT

} from "./appRedux";

//set_role_context
it('should set pms role when type SET_ROLE_CONTEXT is dispatched', () => {
    const role = 'editor';
    const state = reducer(undefined, {type: SET_ROLE_CONTEXT, role})
    expect(state.pmsRole).toBe(role)
})
//get_all_process_start test
it('should set loading state to true when get_all_process_start is dispatched', () => {
    const state = reducer(undefined, {type: GET_ALL_PROCESS_START})
    expect(state.loading).toBe(true)
})

//Add_New_process test
it('should set addNewProcess to true',() => {
        const state = reducer(undefined, {type: ADD_NEW_PROCESS})
        expect(state.addNewProcess).toBe(true)
})
//get_all_process_done
it('should set loading to false and allProcess when GET_ALL_PROCESS_DONE dispatch is called',() => {
    const currentState = reducer()
    expect(currentState.loading).toBe(true)
    const state = reducer(currentState, {type: GET_ALL_PROCESS_DONE, payload:[]})
    expect(state.loading).toBe(false)
    expect(state.allProcess).toBe([])
})


