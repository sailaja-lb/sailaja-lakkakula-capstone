import {render, screen} from '@testing-library/react';
import App from './App';
import {SET_ROLE_CONTEXT} from "./modules/appRedux";
import Editor from "./components/Editor";

it('should display Editor when pmsRole equals editor', () => {
    const dispatch = jest.fn()
    const mockEditor = () => <div>{button}</div>
    const state = {
        pmsRole: 'editor'
    }
    render(<App _useDispatch={() => dispatch} _useSelector={fn => fn({state})}  EditorC={mockEditor}/>)
    expect(dispatch).toHaveBeenLastCalledWith({type: SET_ROLE_CONTEXT, payload: 'editor'})
});

it('should display Follower when pmsRole not equals to editor', () => {
    const dispatch = jest.fn()
    const pmsRole = 'follower'
    render(<App _useDispatch={() => dispatch} _useSelector={fn => fn({pmsRole})}/>)
    expect(dispatch).toHaveBeenLastCalledWith({type: SET_ROLE_CONTEXT, payload: 'follower'})
});

it('should display Heading when page loaded', () => {
    const expectedHeading = 'PMS'
    const dispatch = jest.fn()
    const state = {
        pmsRole: 'editor'
    }
    render(<App _useDispatch={() => dispatch} _useSelector={fn => fn({state})} />)
    expect(screen.getByText(expectedHeading)).toBeInTheDocument()
});

