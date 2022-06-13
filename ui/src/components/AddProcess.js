import {useDispatch, useSelector} from "react-redux";
import {Button, Carousel, Form} from "react-bootstrap";
import AddStage from "./AddStage";
import {
    ADD_NEW_PROCESS_CANCEL,
    ADD_NEW_PROCESS_CAROUSEL_INDEX,
    addNewProcessSetFields, editProcess,
    saveNewProcess
} from "../modules/appRedux";

export default function AddProcess({_useSelector = useSelector, _useDispatch = useDispatch, AddStageC = AddStage}) {

    const dispatch = _useDispatch()
    const carouselIndex = _useSelector(state => state.processCarouselIndex)
    const addNewprocessMapper = _useSelector(state => state.addNewProcess)

    function handleAddStageStep() {
        if (carouselIndex < 3) {
            dispatch({type: ADD_NEW_PROCESS_CAROUSEL_INDEX, payload: {processCarouselIndex: carouselIndex + 1 }})
        }
        return carouselIndex;
    }

    function handleProcessTitleChange(event) {
        dispatch(addNewProcessSetFields("title", event.target.value))
    }

    function handleSaveProcess() {
        if (addNewprocessMapper.id) {
            dispatch(editProcess(addNewprocessMapper.id))
        } else {
            dispatch(saveNewProcess())
        }
    }

    function handleCancelProcess() {
        dispatch({type: ADD_NEW_PROCESS_CANCEL})
    }

    return (
        <Carousel activeIndex={carouselIndex} indicators={false}>
            <Carousel.Item>
                <div className={"addProcessWizard"}>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Process Title</Form.Label>
                            <Form.Control type="text" placeholder="Enter process title"
                                          value={addNewprocessMapper.title}
                                          onChange={event => handleProcessTitleChange(event)} />
                        </Form.Group>
                    </Form>
                </div>
                <Carousel.Caption>
                    <Button variant="primary" type="button" onClick={handleAddStageStep} disabled={addNewprocessMapper.title ? false : true}>
                        Add Stage 1
                    </Button>{' '}
                    <Button variant="secondary" type="button" onClick={handleCancelProcess}>
                        Cancel
                    </Button>
                </Carousel.Caption>
            </Carousel.Item>
            {[1,2,3].map((stageNumber, index) => (
                <Carousel.Item key={stageNumber}>
                    <div className={"addProcessWizard"}>
                        <AddStageC stageNumber={stageNumber} />
                    </div>
                    <Carousel.Caption>
                        {stageNumber !== 3 ?
                            <Button variant="primary" type="button" onClick={handleAddStageStep} disabled={addNewprocessMapper.stages[stageNumber - 1].prompt ? false : true}>
                                Add Stage {stageNumber + 1}
                            </Button> : null}{' '}
                        <Button variant="primary" type="button" onClick={handleSaveProcess}>
                            Save
                        </Button>{' '}
                        <Button variant="secondary" type="button" onClick={handleCancelProcess}>
                            Cancel
                        </Button>
                    </Carousel.Caption>
                </Carousel.Item>)
            )}
        </Carousel>
    );
}