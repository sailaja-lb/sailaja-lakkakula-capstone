import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {SET_ROLE_CONTEXT} from "./modules/appRedux";
import Editor from "./components/Editor";
import Follower from "./components/Follower";
import {FloatingLabel, Form} from "react-bootstrap";

export function App({_useDispatch = useDispatch, _useSelector = useSelector}) {

    const dispatch = _useDispatch()
    const pmsRole = _useSelector(state => state.pmsRole)

    const handleRoleChange = (event) => {
        const role = event.target.value;
        dispatch({type: SET_ROLE_CONTEXT, payload: {role} });
    }

  return (
      <div className="App">
        <header className="App-header" style={{minHeight: "100px"}}>
            PMS
        </header>
        <div className={"container-fluid"}>
            <main>
            {pmsRole === "" ? (
                <div>
                    <FloatingLabel label="Select your role">
                        <Form.Select onChange={event => handleRoleChange(event)}>
                            <option>Which role are you?</option>
                            <option value="editor">Editor</option>
                            <option value="follower">Follower</option>
                        </Form.Select>
                    </FloatingLabel>
                </div>) : ( pmsRole === "editor" ? <Editor /> : <Follower /> )
            }
            </main>
        </div>
      </div>
  );
}

export default App;
