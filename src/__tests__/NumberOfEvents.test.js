import { render } from '@testing-library/react';
import NumberOfEvents from '../components/NumberOfEvents';
import  UserEvent  from '@testing-library/user-event';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsComponent;
  beforeEach(() => {
    NumberOfEventsComponent = render(<NumberOfEvents />);
  });

  //scenario 1
  test('default number 32', async () => {
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    expect(numberTextBox).toHaveValue("32");
  });

  //scenario 2
  test('user specifies a new number to display the specified number ', async () => {
    const user = UserEvent.setup();
    const numberTextBox = NumberOfEventsComponent.queryByRole('textbox');
    await user.type(numberTextBox, "10")
  });
});