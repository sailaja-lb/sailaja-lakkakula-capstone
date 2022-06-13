import {Accordion, Button, Card, Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {deleteProcess, EDIT_PROCESS_START, updateProcess} from "../modules/appRedux";
import StagesList from "./StagesList";

export default function ProcessList({allProcess= [], _useDispatch = useDispatch, _useSelector = useSelector}) {

    const dispatch = useDispatch()
    const role = _useSelector(state => state.pmsRole)

    function handleDeleteProcess(pId) {
        dispatch(deleteProcess(pId))
    }

    function handleStartProcess(pId) {
        dispatch(updateProcess(pId, {status: "started"} ))
    }

    function handleProcessDone(pId) {
        dispatch(updateProcess(pId, {status: "finished"}))
    }

    function handleEditProcess(process) {
        dispatch({type: EDIT_PROCESS_START, payload: {process: {...process}}})
    }

    return (
        <>
            {allProcess.map((process, index) => <Card key={index}>
                <Card.Header>
                    <Row>
                        <Col>{process.title}</Col>
                        <Col>
                            {(role === 'editor' && !process.status) ? <>
                                <Button variant="secondary" type="button" onClick={() => handleEditProcess(process)}>
                                    Edit
                                </Button>{' '}</>: null}
                            {role === 'editor' ? <Button variant="secondary" type="button" onClick={() => handleDeleteProcess(process.id)}>
                                    Delete
                                </Button> : null}
                            {(role === 'follower' && !process.status) ? <div>
                                <Button variant="secondary" type="button" onClick={() => handleStartProcess(process.id)}>
                                    Start
                                </Button>
                            </div> : null}
                            {(role === 'follower' && process.status === "started") ? <div>
                                Process started ...
                            </div> : null}
                            {(role === 'follower' && process.status === "finished") ? <div>
                                Process finished
                            </div> : null}
                        </Col>
                    </Row>
                </Card.Header>
                {process.status === "started" ?
                    <Card.Body>
                        <StagesList processStages={process.stages} processId={process.id} handleProcessDone={handleProcessDone} />
                    </Card.Body> : null}
            </Card>)}
        </>
    )
}