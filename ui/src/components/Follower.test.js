import {render} from "@testing-library/react";
import Editor from "./Editor";
import Follower from "./Follower";

it('should show processlist once loaded', () =>{
    const dispatch = jest.fn();
    const allProcess= {}
    const expectedList = 'This is expectedList'
    const mockProcessList = () => <div>{expectedList}</div>
    render(<Follower _useDispatch={() => dispatch}
                   _useSelector={fn => fn({allProcess})} ProcessListC = {mockProcessList}/>)
})