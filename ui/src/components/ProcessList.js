import {Accordion, Button, Card, Col, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {deleteProcess} from "../modules/appRedux";

export default function ProcessList({allProcess= [], _useDispatch = useDispatch, _useSelector = useSelector}) {

    const dispatch = useDispatch()
    const role = _useSelector(state => state.pmsRole)

    function handleDeleteProcess(pId) {
        dispatch(deleteProcess(pId))
    }

    function handleStartProcess(pId) {
        dispatch()
    }

    return (
        <>
            {allProcess.map((process, index) => <Card key={index}>
                <Card.Header>
                    <Row>
                        <Col>{process.title}</Col>
                        <Col>
                            {role === 'editor' ? <div>
                                <Button variant="secondary" type="button" onClick={() => handleDeleteProcess(process.id)}>
                                    Delete
                                </Button>
                            </div> : null}
                            {(role === 'follower' && process.status !== "finished") ? <div>
                                <Button variant="secondary" type="button" onClick={handleStartProcess}>
                                    Start
                                </Button>
                            </div> : null}
                        </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Accordion defaultActiveKey="0">
                    {process.stages.map((stage, index) => <Accordion.Item eventKey={index} key={index}>
                        <Accordion.Header>{stage.prompt}</Accordion.Header>
                        <Accordion.Body>
                        </Accordion.Body>
                    </Accordion.Item>)}
                    </Accordion>
                </Card.Body>
            </Card>)}
        </>
    )
}