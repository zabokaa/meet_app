import { render, waitFor, screen, within} from '@testing-library/react';
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
  test('renders a list of x events when user is changing input value to x', async () => {
    render (<App />);
    const NumberOfEventsInput = screen.getByRole('textbox', {name: /number of events/i });
    const EventListDOM = screen.getByTestId('event-list');

      await userEvent.type(NumberOfEventsInput, "{backspace}{backspace}10");
      // await userEvent.clear(NumberOfEventsInput);
      // await userEvent.type(NumberOfEventsInput, '10');
      // await userEvent.type(NumberOfEventsInput, '{enter}')  //triggering input change event ?
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBe(10)   
      })
      
  });
});