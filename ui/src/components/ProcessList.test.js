import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EDIT_PROCESS_START} from "../modules/appRedux";
import ProcessList from "./ProcessList";

it('should call handleEditProcess function and dispatch EDIT_PROCESS_START when edit is clicked', () =>{
    const dispatch = jest.fn()
    const mockStagesList = () => <div>stage list</div>
    const process1 = {
        id: 1,
        title: "Process 1",
        stages: []
    }
    const state = {
        pmsRole: 'editor',
        allProcess: [process1]
    }
    render(<ProcessList _useDispatch={() => dispatch}
                       _useSelector={fn => fn(state)} StagesListC= {mockStagesList}/>)
    const editButton = screen.getByRole("button", { name: "Edit" });
    userEvent.click(editButton);
    expect(dispatch).toHaveBeenLastCalledWith({type: EDIT_PROCESS_START,payload: {process: process1}})

})

it('should call handleDeleteProcess function and dispatch deleteProcess when delete is clicked', () =>{
    const dispatch = jest.fn()
    const mockStagesList = () => <div>stage list</div>
    const process1 = {
        id: 1,
        title: "Process 1",
        stages: []
    }
    const state = {
        pmsRole: 'editor',
        allProcess: [process1]
    }
    render(<ProcessList _useDispatch={() => dispatch}
                        _useSelector={fn => fn(state)} StagesListC= {mockStagesList}/>)
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    userEvent.click(deleteButton);
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')

})

it('should call handleStartProcess function and dispatch updateProcess when start is clicked', () =>{
    const dispatch = jest.fn()
    const mockStagesList = () => <div>stage list</div>
    const process1 = {
        id: 1,
        title: "Process 1",
        stages: []
    }
    const state = {
        pmsRole: 'follower',
        allProcess: [process1]
    }
    render(<ProcessList _useDispatch={() => dispatch}
                        _useSelector={fn => fn(state)} StagesListC= {mockStagesList}/>)
    const startButton = screen.getByRole("button", { name: "Start" });
    userEvent.click(startButton);
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')

})