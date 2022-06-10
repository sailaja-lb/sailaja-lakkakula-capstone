import Editor from "./Editor";
import {render, screen} from "@testing-library/react";
import {ADD_NEW_PROCESS} from "../modules/appRedux";
import userEvent from "@testing-library/user-event";

it('should show processlist once loaded', () =>{
    const dispatch = jest.fn();
    const allProcess= {}
    render(<Editor _useDispatch={() => dispatch}
                      _useSelector={fn => fn({allProcess})}/>)
})
// to display create process button
it('should show create process button', () => {
    render(<Editor _useDispatch={() => {}} _useSelector={() => {}}/>);
    const createButton = screen.getByText(/Create Process/);
    expect(createButton).toBeInTheDocument();
});

it('should dispatch ADD_NEW_PROCESS when create process button is clicked', () => {
    const dispatch = jest.fn()
    render(<Editor _useDispatch={() => dispatch} _useSelector={() => {}}/>);
    userEvent.click(screen.getByText('Create Process'))
    expect(dispatch).toHaveBeenLastCalledWith({type: ADD_NEW_PROCESS})
});

it('should show AddProcess at the beginning when adding a Process', () => {

})