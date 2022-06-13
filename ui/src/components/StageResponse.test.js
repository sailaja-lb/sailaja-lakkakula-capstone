import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StageResponse from "./StageResponse";

it('should call handleTextFieldChange function and dispatch updateProcessSetFields when start is clicked', () =>{
    const dispatch = jest.fn()
    const stageRes = {
        resType: "text",
        choices: "",
        answer: "stage text"
    }

    render(<StageResponse _useDispatch={() => dispatch}
                        _useSelector={fn => fn()} processId={1}
                          processStage={stageRes} />)
    const textField = screen.getByDisplayValue(stageRes.answer)
    userEvent.type(textField, "text")
    expect(typeof dispatch.mock.calls[0][0]).toBe("function")

})
