import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StagesList from "./StagesList";

it('should call clickProcessDone when Done button is clicked',() => {
    const dispatch = jest.fn()
    //const mockStage = () => <div>stage component</div>
    render(<StagesList _useDispatch={() => dispatch}
                       _useSelector={fn => fn()}/>)
    const doneButton = screen.getByRole("button", { name: "Done" });
    userEvent.click(doneButton);
    //expect(dispatch).toHaveBeenLastCalledWith({type: ADD_NEW_PROCESS_CANCEL})
    expect(typeof dispatch.mock.calls).toBe('function')

})