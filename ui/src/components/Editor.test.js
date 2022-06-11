import Editor from "./Editor";
import {render, screen} from "@testing-library/react";
import {ADD_NEW_PROCESS} from "../modules/appRedux";
import userEvent from "@testing-library/user-event";
import ProcessList from "./ProcessList";
import AddProcess from "./AddProcess";

it('should show processlist once loaded', () =>{
    const dispatch = jest.fn();
    const allProcess= {}
    const expectedList = 'This is expectedList'
    const expectedProcess = 'This is expectedProcess'
    const mockProcessList = () => <div>{expectedList}</div>
    const mockAddProcess = () => <div>{expectedProcess}</div>
    render(<Editor _useDispatch={() => dispatch}
                      _useSelector={fn => fn({allProcess})} ProcessListC = {mockProcessList} AddProcessC ={mockAddProcess}/>)
})
// to display create process button
// it('should show create process button', () => {
//     const expectedList = 'This is expectedList'
//     const expectedProcess = 'This is expectedProcess'
//     const mockProcessList = () => <div>{expectedList}</div>
//     const mockAddProcess = () => <div>{expectedProcess}</div>
//     render(<Editor _useDispatch={() => {}} _useSelector={() => {}} ProcessListC = {mockProcessList} AddProcessC ={mockAddProcess}/>);
//     const createButton = screen.getByText(/Create Process/);
//     expect(createButton).toBeInTheDocument();
// });

it('should dispatch ADD_NEW_PROCESS when create process button is clicked', () => {
    const dispatch = jest.fn()
    let _addNewProcess
    let addNewProcess;
    const expectedList = 'This is expectedList'
    const expectedProcess = 'This is expectedProcess'
    const mockProcessList = () => <div>{expectedList}</div>
    const mockAddProcess = () => <div>{expectedProcess}</div>
    _addNewProcess = addNewProcess;
    render(<Editor _useDispatch={() => dispatch} _useSelector={() => {}} ProcessListC = {mockProcessList} AddProcessC ={mockAddProcess}/>);
    userEvent.click(screen.getByText('Create Process'))
    expect(dispatch).toHaveBeenLastCalledWith({type: ADD_NEW_PROCESS})
});

// it('should show AddProcess at the beginning when adding a Process', () => {
//     const dispatch = jest.fn()
//         const state = {
//             allProcess: [
//                 {title: 'thread1', stages:[]},
//                 {title: 'thread2', stages: []}
//             ],
//             isAddProcess: {title: 'xyz',stages:[]}
//         }
//         const mockProcessList = ({process}) => <div>{process}</div>
//         const mockAddProcess = () => <div>{'xyz'}</div>
//         render(<Editor _useSelector={fn => fn(state)} _useDispatch={() => dispatch} AddProcessC ={mockAddProcess} ProcessListC={mockProcessList}/>)
//         expect(screen.getByText(state.allProcess[1].title)).toBeInTheDocument()
// })
