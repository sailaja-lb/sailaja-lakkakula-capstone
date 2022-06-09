import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {initLoadAllProcess} from "../modules/appRedux";
import {Spinner} from "react-bootstrap";
import ProcessList from "./ProcessList";

export default function Editor({_useSelector = useSelector, _useDispatch = useDispatch}) {

    const dispatch = _useDispatch();
    const loading = _useSelector(state => state.loading)
    const allProcess = _useSelector(state => state.allProcess)

    useEffect(() => {
        dispatch(initLoadAllProcess());
    }, []);

    return (
        <div>
            Editor
            {loading ? <Spinner animation="grow" /> : <ProcessList allProcess={allProcess} />}
        </div>);
}