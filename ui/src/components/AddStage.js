import {useDispatch, useSelector} from "react-redux";
import {Form} from "react-bootstrap";
import {useEffect, useState} from "react";

export default function AddStage({_useSelector = useSelector, _useDispatch = useDispatch,
                                     stageNumber = 1, stageMapper = {}}) {
    const [prompt, setPrompt] = useState("")
    const [resType, setResType] = useState("")
    const [order, setOrder] = useState(stageNumber)
    const [choices, setChoices] = useState("")

    useEffect(() => {
        stageMapper.stage_order = order
    }, [order])

    function onPromptChange(event) {
        const prompt = event.target.value
        setPrompt(prompt)
        stageMapper.prompt = prompt
    }

    function onResTypeChange(event) {
        const resType = event.target.value
        stageMapper.res_type = resType;
        if (resType === "boolean") {
            stageMapper.choices = "True|False"
        } else if (resType === "multi") {
            stageMapper.choices = "||"
        } else {
            stageMapper.choices = ""
        }
        setResType(resType)
        setChoices(stageMapper.choices)
    }

    function onOrderChange(event) {
        const orderNum = event.target.value
        setOrder(orderNum)
        stageMapper.stage_order = orderNum
    }

    function handleAddMultiFields(event, index) {
        const booleanFields = choices.split("|");
        booleanFields[index] = event.target.value;
        stageMapper.choices = booleanFields.join("|")
        setChoices(stageMapper.choices)
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