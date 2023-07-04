import { render } from '@testing-library/react';
import App from '../App';

describe('<App /> component', () => {   //DOM node
    test('renders list of events', () => {
        const AppDOM = render(<App />).container.firstChild;
        expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();  // = matcher func
      });
});