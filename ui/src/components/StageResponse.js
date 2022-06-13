import {useDispatch, useSelector} from "react-redux";
import {Form} from "react-bootstrap";
import {updateProcessSetFields} from "../modules/appRedux";


export default function StageResponse({_useDispatch = useDispatch, _useSelector = useSelector,
                                          processStage={}, processId}) {
    const dispatch = _useDispatch()
    const { resType, choices="", answer="" } = processStage

    function handleTextFieldChange(event) {
        dispatch(updateProcessSetFields("answer", event.target.value, processId, processStage.id))
    }

    function handleBooleanFieldChange(event) {
        dispatch(updateProcessSetFields("answer", event.target.value, processId, processStage.id))
    }

    function handleMultiFieldChange(event) {
        const multiAns = []
        const checkedForm = event.target.form
        for (let i = 0; i < checkedForm.length; i++) {
            if (checkedForm[i].checked) {
                multiAns.push(checkedForm[i].value)
            }
        }
        dispatch(updateProcessSetFields("answer", multiAns.join('|'), processId, processStage.id))
    }

    function isMultiChecked(eachChoice, multiAns) {
        if (multiAns && multiAns.split('|').findIndex(ans => ans === eachChoice) >= 0) {
            return true;
        }
        return false;
    }

    return <>
        <Form>
            <Form.Group className="mb-3">
                {resType === "text" ? <Form.Control type="text" value={(answer===null) ? "" : answer} onChange={e => handleTextFieldChange(e)} /> : null}
                {resType === "boolean" ? choices.split("|").map((each, index) =>
                    <Form.Check key={index} type={"radio"} value={each} label={each} checked={(each === answer) ? true : false} onChange={e => handleBooleanFieldChange(e)} name={`res_radio_${processId}`} />) : null}
                {resType === "multi" ? choices.split("|").map((each, index) =>
                    <Form.Check key={index} type={"checkbox"} value={each} label={each} checked={isMultiChecked(each, answer)} onChange={e => handleMultiFieldChange(e)} />) : null}
            </Form.Group>
        </Form>
    </>
}