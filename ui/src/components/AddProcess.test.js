import AddProcess from "./AddProcess";
import {queryAllByRole, render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
    ADD_NEW_PROCESS,
    ADD_NEW_PROCESS_CANCEL,
    ADD_NEW_PROCESS_CAROUSEL_INDEX,
    addNewProcessSetFields, SAVE_NEW_PROCESS_DONE, saveNewProcess
} from "../modules/appRedux";

it('should display Process Title', () => {
    const expectedHeading = 'Process Title'
    const mockStage = () => <div>stage component</div>
    const dispatch = jest.fn()

    const state = {
        processCarouselIndex: 0,
        isAddNewProcess: true,
        addNewProcess: {
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
    }
    render(<AddProcess _useDispatch={() => dispatch} _useSelector={fn => fn(state)} AddStageC={mockStage}/>)
    expect(screen.getByText(expectedHeading)).toBeInTheDocument()
});
// it('should dispatch addNewProcessSetFields when title field changes and call handleProcessTitleChange', () => {
//     const addNewprocessMapper = {
//             title: 'Title1'
//     }
//     const mockStage = () => <div>stage component</div>
//     const dispatch = jest.fn()
//
//     render(<AddProcess _useDispatch={() => dispatch} _useSelector={fn => fn({addNewprocessMapper})} AddStageC={mockStage}/>)
//     const titleElement = screen.getByDisplayValue(addNewprocessMapper.title)
//     const newText = 'A'
//     userEvent.type(titleElement, newText)
//     let thread = {...addNewprocessMapper, title: addNewprocessMapper.title + newText}
//     expect(dispatch).toHaveBeenCalledWith(addNewProcessSetFields)
//
// })

it('should call handleAddStageStep function and dispatch ADD_NEW_PROCESS_CAROUSEL_INDEX when Add Stage 1 is clicked', () =>{
    const dispatch = jest.fn()
    const mockStage = () => <div>stage component</div>
    const state = {
        processCarouselIndex: 0,
        isAddNewProcess: true,
        addNewProcess: {
            title: "Process 1",
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
    }
    render(<AddProcess _useDispatch={() => dispatch}
                      _useSelector={fn => fn(state)} AddStageC = {mockStage}/>)
    const addStageStepButton = screen.getByRole("button", { name: "Add Stage 1" });
    userEvent.click(addStageStepButton);
    expect(dispatch).toHaveBeenLastCalledWith({type: ADD_NEW_PROCESS_CAROUSEL_INDEX, payload: {processCarouselIndex: 1 }})

})

it('should call handleCancelProcess function and dispatch ADD_NEW_PROCESS_CANCEL when cancel is clicked', () =>{
    const dispatch = jest.fn()
    const mockStage = () => <div>stage component</div>
    const state = {
        processCarouselIndex: 0,
        isAddNewProcess: true,
        addNewProcess: {
            title: "Process 1",
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
    }
    render(<AddProcess _useDispatch={() => dispatch}
                       _useSelector={fn => fn(state)} AddStageC = {mockStage}/>)
    const cancelButton = screen.queryAllByRole("button", { name: "Cancel" })[0];
    userEvent.click(cancelButton);
    expect(dispatch).toHaveBeenLastCalledWith({type: ADD_NEW_PROCESS_CANCEL})

})

it('should call handleSaveProcess function when save is clicked', () =>{
    const dispatch = jest.fn()
    const mockStage = () => <div>stage component</div>
    const state = {
        processCarouselIndex: 0,
        isAddNewProcess: true,
        addNewProcess: {
            title: "Process 1",
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
    }
    render(<AddProcess _useDispatch={() => dispatch}
                       _useSelector={fn => fn(state)} AddStageC = {mockStage}/>)
    const saveButton = screen.queryAllByRole("button", { name: "Save" })[0];
    userEvent.click(saveButton);
    expect(typeof dispatch.mock.calls[0][0]).toBe('function')
})