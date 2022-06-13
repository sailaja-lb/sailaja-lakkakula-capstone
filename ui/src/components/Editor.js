import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {initLoadAllProcess} from "../modules/appRedux";
import {Alert, Button, Spinner} from "react-bootstrap";
import ProcessList from "./ProcessList";
import AddProcess from "./AddProcess";

export default function Editor({_useSelector = useSelector, _useDispatch = useDispatch, ProcessListC = ProcessList, AddProcessC = AddProcess, SpinnerC = Spinner}) {

    const dispatch = _useDispatch();
    const loading = _useSelector(state => state.loading)
    const isAddProcess = _useSelector(state => state.isAddNewProcess)
    const newProcessMessageSuccessful = _useSelector(state => state.newProcessMessageSuccessful)
    const deleteProcessMessageSuccessful = _useSelector(state => state.deleteProcessMessageSuccessful)

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
            {deleteProcessMessageSuccessful ? <Alert variant={"success"}>Process has been deleted successfully</Alert> : null}
            {isAddProcess ? <AddProcessC /> : <Button variant="primary" onClick={addNewProcess}>Create Process</Button>}
            {loading ? <SpinnerC animation="grow" /> : <ProcessListC />}
        </div>);
}