import {useDispatch, useSelector} from "react-redux";
import {Button, Carousel, Form} from "react-bootstrap";
import {useState} from "react";
import AddStage from "./AddStage";
import {saveNewProcess} from "../modules/appRedux";

export default function AddProcess({_useSelector = useSelector,
                                       _useDispatch = useDispatch}) {
    const [carouselIndex, setCarouselIndex] = useState(0)
    const [processMapper, setProcessMapper] = useState({
        title: "",
        stages: [
            {
                "prompt": "",
                "res_type": null,
                "choices": "",
                "stage_order": null
            },
            {
                "prompt": "",
                "res_type": null,
                "choices": "",
                "stage_order": null
            },
            {
                "prompt": "",
                "res_type": null,
                "choices": "",
                "stage_order": null
            }
        ]
    })
    const dispatch = _useDispatch()

    function handleAddStageStep() {
        if (carouselIndex < 3) {
            setCarouselIndex(carouselIndex + 1)
        }
        return carouselIndex;
    }

    function handleProcessTitleChange(event) {
        setProcessMapper({
            ...processMapper,
            title: event.target.value
        })
    }

    function handleSaveProcess() {
        dispatch(saveNewProcess(processMapper))
    }

    return (
        <Carousel activeIndex={carouselIndex} indicators={false}>
            <Carousel.Item>
                <div className={"addProcessWizard"}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Process Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter process title"
                                          value={processMapper.title}
                                          onChange={event => handleProcessTitleChange(event)} />
                        </Form.Group>
                    </Form>
                </div>
                <Carousel.Caption>
                    <Button variant="primary" type="button" onClick={handleAddStageStep} disabled={processMapper.title ? false : true}>
                        Add Stage 1
                    </Button>{' '}
                    <Button variant="secondary" type="button">
                        Cancel
                    </Button>
                </Carousel.Caption>
            </Carousel.Item>
            {[1,2,3].map((stageNumber, index) => (
                <Carousel.Item key={stageNumber}>
                    <div className={"addProcessWizard"}>
                        <AddStage stageNumber={stageNumber} stageMapper={processMapper.stages[index]} />
                    </div>
                    <Carousel.Caption>
                        {stageNumber !== 3 ?
                            <Button variant="primary" type="button" onClick={handleAddStageStep}>
                                Add Stage {stageNumber + 1}
                            </Button> : null}{' '}
                        <Button variant="primary" type="button" onClick={handleSaveProcess} disabled={!processMapper.title && !processMapper.stages[0].prompt}>
                            Save
                        </Button>{' '}
                        <Button variant="secondary" type="button">
                            Cancel
                        </Button>
                    </Carousel.Caption>
                </Carousel.Item>)
            )}
        </Carousel>
    );
}