import {Spinner} from "react-bootstrap";
import ProcessList from "./ProcessList";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {initLoadAllProcess} from "../modules/appRedux";

export default function Follower({_useSelector = useSelector, _useDispatch = useDispatch, ProcessListC = ProcessList}) {

    const dispatch = _useDispatch();
    const loading = _useSelector(state => state.loading)
    const allProcess = _useSelector(state => state.allProcess)

    // useEffect for on componentDidMount life cycle
    useEffect(() => {
        dispatch(initLoadAllProcess());
    }, []);

    return <>
        {loading ? <Spinner animation="grow" /> : <ProcessListC allProcess={allProcess} />}
    </>
}