import { render,screen,fireEvent, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom';
import Login from '../Login'

test('Checking component Loader' ,() =>{
    //test the component
    render(<Login/>);
    // expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
    //if you have multiple values have the same name and you test this value you can use above line to test the specific value
    expect(screen.queryByText(/Login/)).toBeInTheDocument();
}) 

test('Checking email and password inputs are empty', () => {
    render(<Login/>);
    expect(screen.queryByPlaceholderText("email")).toHaveValue("");
    expect(screen.queryByPlaceholderText("password")).toHaveValue("");
})

test('Shows the success message for correct credentials', async () => {
    render(<Login/>);
    fireEvent.change(screen.getByPlaceholderText("email"),{ target: { value:"moseesmohan@gmail.com" } });
    fireEvent.change(screen.getByPlaceholderText("password"),{ target: { value:"test@123"} });
    fireEvent.click(screen.getByRole('button', {name : /sign in|Login/i} ));

     await waitFor(() => {
        expect(screen.getByText(/Login Succesful/i)).toBeInTheDocument();
    }, { timeout: 4000 }); 
});