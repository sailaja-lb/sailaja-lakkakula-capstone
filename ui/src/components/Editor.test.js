import Editor from "./Editor";
import {render, screen} from "@testing-library/react";
import {ADD_NEW_PROCESS} from "../modules/appRedux";
import userEvent from "@testing-library/user-event";

it('should show ProcessList when loading is false', () =>{
    const dispatch = jest.fn();
    const expectedList = 'This is expectedList'
    const expectedProcess = 'This is expectedProcess'
    const mockProcessList = () => <div>{expectedList}</div>
    const mockAddProcess = () => <div>{expectedProcess}</div>
    const loadingText = 'expected loading text'
    const mockLoadingText = () => <div>{loadingText}</div>
    const state = {
        loading: false
    }
    render(<Editor _useDispatch={() => dispatch}
                      _useSelector={fn => fn(state)} ProcessListC = {mockProcessList} AddProcessC ={mockAddProcess} SpinnerC ={mockLoadingText}/>)
    expect(screen.getByText(expectedList)).toBeInTheDocument()

})

it('should show spinner component when loading is true', () =>{
    const dispatch = jest.fn();
    const expectedList = 'This is expectedList'
    const expectedProcess = 'This is expectedProcess'
    const loadingText = 'expected loading text'
    const mockProcessList = () => <div>{expectedList}</div>
    const mockAddProcess = () => <div>{expectedProcess}</div>
    const mockLoadingText = () => <div>{loadingText}</div>
    const state = {
        loading: true
    }
    render(<Editor _useDispatch={() => dispatch}
                   _useSelector={fn => fn(state)} ProcessListC = {mockProcessList} AddProcessC ={mockAddProcess} SpinnerC ={mockLoadingText}/>)
    expect(screen.getByText(loadingText)).toBeInTheDocument()

})

it('should show AddProcess component when isAddProcess is true', () =>{
    const dispatch = jest.fn();
    const expectedList = 'This is expectedList'
    const expectedProcess = 'This is expectedProcess'
    const loadingText = 'expected loading text'
    const mockProcessList = () => <div>{expectedList}</div>
    const mockAddProcess = () => <div>{expectedProcess}</div>
    const mockLoadingText = () => <div>{loadingText}</div>
    const state = {
       isAddProcess : true
    }
    render(<Editor _useDispatch={() => dispatch}
                   _useSelector={fn => fn(state)} ProcessListC = {mockProcessList} AddProcessC ={mockAddProcess} SpinnerC ={mockLoadingText}/>)
    expect(screen.getByText(expectedList)).toBeInTheDocument()

})


it('should show create process button when isAddProcess is false', () => {
    const dispatch = jest.fn();
    const expectedList = 'This is expectedList'
    const expectedProcess = 'This is expectedProcess'
    const loadingText = 'expected loading text'
    const mockProcessList = () => <div>{expectedList}</div>
    const mockAddProcess = () => <div>{expectedProcess}</div>
    const mockLoadingText = () => <div>{loadingText}</div>
    const state = {
        isAddProcess : false
    }
    render(<Editor _useDispatch={() => dispatch}
                   _useSelector={fn => fn(state)} ProcessListC = {mockProcessList} AddProcessC ={mockAddProcess} SpinnerC ={mockLoadingText}/>)
    const createButton = screen.getByText(/Create Process/);
    expect(createButton).toBeInTheDocument();
});

it('should dispatch ADD_NEW_PROCESS when create process button is clicked', () => {
    const dispatch = jest.fn()
    const expectedList = 'This is expectedList'
    const expectedProcess = 'This is expectedProcess'
    const mockProcessList = () => <div>{expectedList}</div>
    const mockAddProcess = () => <div>{expectedProcess}</div>
    render(<Editor _useDispatch={() => dispatch} _useSelector={() => {}} ProcessListC = {mockProcessList} AddProcessC ={mockAddProcess}/>);
    userEvent.click(screen.getByText('Create Process'))
    expect(dispatch).toHaveBeenLastCalledWith({type: ADD_NEW_PROCESS})
});
it('should show Process has been deleted successfully when deleteProcessMessageSuccessful is true', () => {
    const dispatch = jest.fn();
    const expectedList = 'This is expectedList'
    const expectedProcess = 'This is expectedProcess'
    const loadingText = 'expected loading text'
    const mockProcessList = () => <div>{expectedList}</div>
    const mockAddProcess = () => <div>{expectedProcess}</div>
    const mockLoadingText = () => <div>{loadingText}</div>
    const state = {
        deleteProcessMessageSuccessful : true
    }
    render(<Editor _useDispatch={() => dispatch}
                   _useSelector={fn => fn(state)} ProcessListC = {mockProcessList} AddProcessC ={mockAddProcess} SpinnerC ={mockLoadingText}/>)
    expect(screen.getByText("Process has been deleted successfully")).toBeInTheDocument()
});

it('should show New Process has been added successfully when newProcessMessageSuccessful is true', () => {
    const dispatch = jest.fn();
    const expectedList = 'This is expectedList'
    const expectedProcess = 'This is expectedProcess'
    const loadingText = 'expected loading text'
    const mockProcessList = () => <div>{expectedList}</div>
    const mockAddProcess = () => <div>{expectedProcess}</div>
    const mockLoadingText = () => <div>{loadingText}</div>
    const state = {
        newProcessMessageSuccessful : true
    }
    render(<Editor _useDispatch={() => dispatch}
                   _useSelector={fn => fn(state)} ProcessListC = {mockProcessList} AddProcessC ={mockAddProcess} SpinnerC ={mockLoadingText}/>)
    expect(screen.getByText("New Process has been added successfully")).toBeInTheDocument()
});

