import {useDispatch, useSelector} from "react-redux";
import {Form} from "react-bootstrap";
import {addNewProcessSetFields} from "../modules/appRedux";

export default function AddStage({_useSelector = useSelector, _useDispatch = useDispatch,
                                     stageNumber = 1}) {

    const dispatch = _useDispatch()
    const addNewProcess = _useSelector(state => state.addNewProcess)
    const { prompt, resType="", order, choices } = addNewProcess.stages[stageNumber - 1]

    function onPromptChange(event) {
        const promptVal = event.target.value
        dispatch(addNewProcessSetFields("prompt", promptVal, stageNumber - 1))
    }

    function onResTypeChange(event) {
        const resTypeVal = event.target.value
        dispatch(addNewProcessSetFields("resType", resTypeVal, stageNumber - 1))
    }

    function onOrderChange(event) {
        const orderNum = event.target.value
        dispatch(addNewProcessSetFields("order", orderNum, stageNumber - 1))
    }

    function handleAddMultiFields(event, index) {
        const multiFields = choices.split("|");
        multiFields[index] = event.target.value;
        dispatch(addNewProcessSetFields("choices", multiFields.join("|"), stageNumber - 1))
    }

    return (
        <>
            <h3>Add Stage {stageNumber}</h3>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Prompt</Form.Label>
                    <Form.Control type="text" placeholder="Enter stage prompt" value={prompt} onChange={(e) => onPromptChange(e)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Choose Response Type</Form.Label>
                    <Form.Select value={resType} onChange={(e) => onResTypeChange(e)}>
                        <option value={""}>Select Response Type</option>
                        <option value={"text"}>Text</option>
                        <option value={"multi"}>Multi</option>
                        <option value={"boolean"}>Boolean</option>
                    </Form.Select>
                </Form.Group>
                {resType === "boolean" ? <Form.Group className="mb-3">
                    <Form.Label>Add Boolean fields</Form.Label>
                    {/*{choices ? choices.split("|").map((each, index) => <Form.Control type="text" key={index} placeholder="Enter boolean field text" value={each} onChange={(e) => handleAddMultiFields(e, index)} />) : null}*/}
                    {choices ? choices.split("|").map((each, index) => <Form.Control type="text" key={index} value={each} onChange={(e) => handleAddMultiFields(e, index)} />) : null}

                </Form.Group> : null}
                {resType === "multi" ? <Form.Group className="mb-3">
                    <Form.Label>Add multi checkbox fields</Form.Label>
                    {/*{choices ? choices.split("|").map((each, index) => <Form.Control type="text" key={index} value={each} onChange={(e) => handleAddMultiFields(e, index)} />) : null}*/}
                    {choices ? choices.split("|").map((each, index) => <Form.Control type="text" key={index} value={each} onChange={(e) => handleAddMultiFields(e, index)} />) : null}
                </Form.Group> : null}
                <Form.Group className="mb-3">
                    <Form.Label>Order</Form.Label>
                    <Form.Control type="number" min={"1"} max={"3"} value={order} onChange={(e) => onOrderChange(e)} />
                </Form.Group>
            </Form>
        </>
    );
}