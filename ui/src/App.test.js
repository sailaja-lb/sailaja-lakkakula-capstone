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
    const pmsRole = 'editor'
    render(<App _useDispatch={() => dispatch} _useSelector={fn => fn({pmsRole})} EditorC={mockEditor} FollowerC = {mockFollower}/>)
    expect(screen.getByText(editor)).toBeInTheDocument()
});

it('should display Follower screen when pmsRole not equals to editor', () => {
    const dispatch = jest.fn()
    const editor = "expected editor output"
    const follower = "expected follower"
    const mockEditor = () => <div>{editor}</div>
    const mockFollower = () => <div>{follower}</div>
    const pmsRole = 'follower'
    render(<App _useDispatch={() => dispatch} _useSelector={fn => fn({pmsRole})} EditorC={mockEditor} FollowerC = {mockFollower}/>)
    expect(screen.getByText(follower)).toBeInTheDocument()
});
//PMS
it('should display Heading', () => {
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
it('should display Which role are you?', () => {
    const expectedText = 'Which role are you?'
    const dispatch = jest.fn()
    const editor = "expected editor"
    const follower = "expected follower"
    const mockEditor = () => <div>{editor}</div>
    const mockFollower = () => <div>{follower}</div>
    const pmsRole = ''
    // const state = {
    //     pmsRole: ''
    // }
    render(<App _useDispatch={() => dispatch} _useSelector={fn => fn({pmsRole})} EditorC={mockEditor} FollowerC = {mockFollower} />)
    expect(screen.getByText(expectedText)).toBeInTheDocument()
});



