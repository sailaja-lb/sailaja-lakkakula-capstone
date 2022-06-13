import {useDispatch, useSelector} from "react-redux";
import {Accordion, Button, Form} from "react-bootstrap";
import StageResponse from "./StageResponse";

export default function StagesList({_useDispatch = useDispatch, _useSelector = useSelector,
                                       processStages = [],  processId, handleProcessDone}) {
    function clickProcessDone() {
        handleProcessDone(processId)
    }
    return <>
        <Accordion defaultActiveKey="0">
            {processStages.map((stage, index) => <Accordion.Item eventKey={index} key={index}>
                <Accordion.Header>{stage.prompt}</Accordion.Header>
                <Accordion.Body>
                    <StageResponse _useDispatch={_useDispatch} processStage={stage} processId={processId} />
                </Accordion.Body>
            </Accordion.Item>)}
            <Button type={"button"} onClick={clickProcessDone}>Done</Button>
        </Accordion>
    </>
}