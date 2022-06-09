import {Accordion, Card} from "react-bootstrap";

export default function ProcessList({allProcess=[]}) {
    return (
        <>
            {allProcess.map((process, index) => <Card key={index}>
                <Card.Header>{process.title}</Card.Header>
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