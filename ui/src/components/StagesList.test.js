import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StagesList from "./StagesList";

it('should call clickProcessDone when Done button is clicked',() => {
    const handleProcessDone = jest.fn()
    const dispatch = jest.fn()
    //const mockStage = () => <div>stage component</div>
    render(<StagesList _useDispatch={() => dispatch}
                       _useSelector={fn => fn()}
                       processStages={[{
                           prompt: "stage 1",
                           resType: "text",
                           choices: "",
                           answer: ""
                       }]}
                       processId={1} handleProcessDone={handleProcessDone}/>)
    const doneButton = screen.getByRole("button", { name: "Done" });
    userEvent.click(doneButton);
    expect(handleProcessDone).toHaveBeenLastCalledWith(1)
    // expect(typeof dispatch.mock.calls[0][0]).toBe('function')

})