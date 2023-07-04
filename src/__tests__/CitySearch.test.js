import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CitySearch from '../components/CitySearch';

// test that involves user interactions, always start with setting up the object
// const user = userEvent.setup();

describe('<CitySearch /> component', () => {
  test('renders text input', () => {
    const CitySearchComponent = render(<CitySearch />);
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    expect(cityTextBox).toBeInTheDocument();
    expect(cityTextBox).toHaveClass('city');
  });
  test('suggestions list is hidden by default', () => {
    const CitySearchComponent = render(<CitySearch />);
    const suggestionList = CitySearchComponent.queryByRole('list');
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('renders a list of suggestions when city textbox gains focus', async () => {
    const CitySearchComponent = render(<CitySearch />);
    const user = userEvent.setup();
    const cityTextBox = CitySearchComponent.queryByRole('textbox');
    await user.click(cityTextBox);   //user's input
    const suggestionList = CitySearchComponent.queryByRole('list');  //suggestions 4 city
    expect(suggestionList).toBeInTheDocument();
    expect(suggestionList).toHaveClass('suggestions');
  });
});
