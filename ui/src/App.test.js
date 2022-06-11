import {render, screen} from '@testing-library/react';
import App from './App';
import {SET_ROLE_CONTEXT} from "./modules/appRedux";
import Editor from "./components/Editor";

it('should display Editor when pmsRole equals editor', () => {
    const dispatch = jest.fn()
    const editor = "expected editor output"
    const follower = "expected follower"
    const mockEditor = () => <div>{editor}</div>
    const mockFollower = () => <div>{follower}</div>
    const role = 'editor'
    const state = {
        pmsRole: ''
    }
    render(<App _useDispatch={() => dispatch} _useSelector={fn => fn({state})}  EditorC={mockEditor} FollowerC = {mockFollower}/>)
    expect(dispatch).toHaveBeenLastCalledWith({type: SET_ROLE_CONTEXT, payload: {role}})
});

it('should display Follower when pmsRole not equals to editor', () => {
    const dispatch = jest.fn()
    const editor = "expected editor"
    const follower = "expected follower"
    const mockEditor = () => <div>{editor}</div>
    const mockFollower = () => <div>{follower}</div>
    const pmsRole = 'follower'
    render(<App _useDispatch={() => dispatch} _useSelector={fn => fn({pmsRole})} EditorC={mockEditor} FollowerC = {mockFollower}/>)
    expect(dispatch).toHaveBeenLastCalledWith({type: SET_ROLE_CONTEXT, payload: 'follower'})
});

it('should display Heading when page loaded', () => {
    const expectedHeading = 'PMS'
    const dispatch = jest.fn()
    const editor = "expected editor"
    const follower = "expected follower"
    const mockEditor = () => <div>{editor}</div>
    const mockFollower = () => <div>{follower}</div>
    const state = {
        pmsRole: 'editor'
    }
    render(<App _useDispatch={() => dispatch} _useSelector={fn => fn({state})} EditorC={mockEditor} FollowerC = {mockFollower} />)
    expect(screen.getByText(expectedHeading)).toBeInTheDocument()
});

