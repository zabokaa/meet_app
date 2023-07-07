import { render, waitFor, screen, within, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import App from "../App";


describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents />);
  });

  test('renders number of events text input', () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox).toBeInTheDocument();
    expect(numberTextBox).toHaveClass('number-of-events-input');
  });

  //scenario 1
  test('default number is 32', async () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox).toHaveValue("32");
  });


  //scenario 2
  test('user specifies a new number to display the specified number ', async () => {
    const user = userEvent.setup();
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    await user.type(numberTextBox, "10")
  });
});

// exc 4.5
describe('<NumberOfEvents /> integration', () => {
  test('number of events rendered matches input', () => {
    const { container } = render(<App />);
  
    const input = container.querySelector('#number-of-events-input');
    fireEvent.change(input, { target: { value: '10' } });
  
    const eventList = container.querySelector('#event-list');
    expect(eventList.children.length).toBe(10);
  });
  
  test('deleting number from input removes events', () => {
    const { container } = render(<App />);
  
    const input = container.querySelector('#number-of-events-input');
    fireEvent.change(input, { target: { value: '10' } });
  
    fireEvent.change(input, { target: { value: '' } });
  
    const eventList = container.querySelector('#event-list');
    expect(eventList.children.length).toBe(0);
  });
  
  test('updates the number of events displayed', () => {
    const { container } = render(<App />);
  
    const input = container.querySelector('#number-of-events-input');
    fireEvent.change(input, { target: { value: '10' } });
  
    fireEvent.change(input, { target: { value: '5' } });
  
    const eventList = container.querySelector('#event-list');
    expect(eventList.children.length).toBe(5);
  });
  
 
  ///////////
  // test('renders a list of x events when user is changing input value to x', async () => {
  //   render (<App />);
  //   const NumberOfEventsInput = screen.getByRole('textbox', {name: /number of events/i });
  //   const EventListDOM = screen.getByTestId('event-list');
  //   const user = userEvent.setup();
  //   await user.type(NumberOfEventsInput, "{backspace}{backspace}10");
  //     // await userEvent.type(NumberOfEventsInput, "{backspace}{backspace}10");
  //     // await userEvent.clear(NumberOfEventsInput);
  //     // await userEvent.type(NumberOfEventsInput, '10');
  //     // await userEvent.type(NumberOfEventsInput, '{enter}')  //triggering input change event ?
  //     await waitFor(() => {
  //       const EventListItems = within(EventListDOM).queryAllByRole('listitem');
  //       expect(EventListItems.length).toBe(10)   
  //       // expect(NumberOfEventsInput.length).toBe(10)   
  //     })
      
  // });
});