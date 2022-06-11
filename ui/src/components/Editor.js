import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {initLoadAllProcess} from "../modules/appRedux";
import {Alert, Button, Spinner} from "react-bootstrap";
import ProcessList from "./ProcessList";
import AddProcess from "./AddProcess";

export default function Editor({_useSelector = useSelector, _useDispatch = useDispatch, ProcessListC = ProcessList, AddProcessC = AddProcess}) {

    const dispatch = _useDispatch();
    const loading = _useSelector(state => state.loading)
    const allProcess = _useSelector(state => state.allProcess)
    const isAddProcess = _useSelector(state => state.addNewProcess)
    const newProcessMessageSuccessful = _useSelector(state => state.newProcessMessageSuccessful)

    // useEffect for on componentDidMount life cycle
    useEffect(() => {
        dispatch(initLoadAllProcess());
    }, []);

    function addNewProcess() {
        dispatch({type: "ADD_NEW_PROCESS"})
    }

    return (
        <div>
            {newProcessMessageSuccessful ? <Alert variant={"success"}>New Process has been added successfully</Alert> : null}
            {isAddProcess ? <AddProcessC /> : <Button variant="primary" onClick={addNewProcess}>Create Process</Button>}
            {loading ? <Spinner animation="grow" /> : <ProcessListC allProcess={allProcess} />}
        </div>);
}