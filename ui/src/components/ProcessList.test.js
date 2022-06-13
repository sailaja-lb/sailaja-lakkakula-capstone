import {render, screen} from "@testing-library/react";
import AddProcess from "./AddProcess";
import userEvent from "@testing-library/user-event";
import { EDIT_PROCESS_START} from "../modules/appRedux";

it('should call handleEditProcess function and dispatch EDIT_PROCESS_START when edit is clicked', () =>{
    const dispatch = jest.fn()
    const mockStagesList = () => <div>stage list</div>
    const state = {
        pmsRole: 'editor',
        allProcess= []
    }
    render(<AddProcess _useDispatch={() => dispatch}
                       _useSelector={fn => fn(state)} AddStageC = {mockStagesList}/>)
    const editButton = screen.getByRole("button", { name: "Edit" });
    userEvent.click(editButton);
    expect(dispatch).toHaveBeenLastCalledWith({type: EDIT_PROCESS_START,payload: {process: {...process}}})

})