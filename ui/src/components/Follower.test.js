import {render, screen} from "@testing-library/react";
import Editor from "./Editor";
import Follower from "./Follower";

it('should show spinner component when loading is true', () =>{
    const dispatch = jest.fn();
    const expectedList = 'This is expectedList'
    const loadingText = 'expected loading text'
    const mockProcessList = () => <div>{expectedList}</div>
    const mockLoadingText = () => <div>{loadingText}</div>
    const state = {
        loading: true
    }
    render(<Follower _useDispatch={() => dispatch}
                   _useSelector={fn => fn(state)} ProcessListC = {mockProcessList} SpinnerC ={mockLoadingText}/>)
    expect(screen.getByText(loadingText)).toBeInTheDocument()

})

it('should show processlist when loading is false', () =>{
    const dispatch = jest.fn();
    const expectedList = 'This is expectedList'
    const mockProcessList = () => <div>{expectedList}</div>
    const loadingText = 'expected loading text'
    const mockLoadingText = () => <div>{loadingText}</div>
    const state = {
        loading: false
    }
    render(<Editor _useDispatch={() => dispatch}
                   _useSelector={fn => fn(state)} ProcessListC = {mockProcessList} SpinnerC ={mockLoadingText}/>)
    expect(screen.getByText(expectedList)).toBeInTheDocument()

})
