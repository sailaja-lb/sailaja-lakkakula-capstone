import {Accordion, Button, Card} from "react-bootstrap";
import {useDispatch} from "react-redux";
import {deleteProcess} from "../modules/appRedux";

export default function ProcessList({allProcess=[], _useDispatch = useDispatch}) {

    const dispatch = useDispatch()

    function handleDeleteProcess(token) {
        dispatch(deleteProcess(token))
    }

    return (
        <>
            {allProcess.map((process, index) => <Card key={index}>
                <Card.Header>
                    {process.title}
                    <div>
                        <Button variant="secondary" type="button" onClick={() => handleDeleteProcess(process.token)}>
                            Delete
                        </Button>
                    </div>
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