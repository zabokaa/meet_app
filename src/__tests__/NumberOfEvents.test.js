import { render, within} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberOfEvents from '../components/NumberOfEvents';
import App from '../App';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents onNumberChanged={(value)=>{}}/>);
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

// INTEGRATION TEST
describe('<NumberOfEvents /> integration', () => {
  test('user specifies number for displaying this number of events', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const NoeDOM = AppDOM.querySelector('#number-of-events');
    const NoeInput = within(NoeDOM).queryByRole('textbox');
    await user.type(NoeInput, '{backspace}{backspace}5');

    const EventListDOM = AppDOM.querySelector('#event-list');
    const suggestionByNoe = within(EventListDOM).queryAllByRole('listitem');
    expect(suggestionByNoe.length).toBe(5);
  }) 
});
