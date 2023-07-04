import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Event from "../components/Event";
import { getEvents } from "../api";


describe('<Event /> component', () => {
    let EventComponent;
    let allEvents;
    beforeEach(async () => {
      allEvents = await getEvents();
      EventComponent = render(<Event event={allEvents[0]} />)
    });
  // step 4a
    test('renders event title', () => {
      expect(EventComponent.queryByText(allEvents[0].summary)).toBeInTheDocument();
    });

// step 4b
    test('renders event start time', () => {
        expect(EventComponent.queryByText(allEvents[0].created)).toBeInTheDocument();
    });
  //step 4c
    test('renders event location', () => {
      expect(EventComponent.queryByText(allEvents[0].location)).toBeInTheDocument();
    });
  
    test('renders event details button with the title (show details)', () => {
      expect(EventComponent.queryByText('show details')).toBeInTheDocument();
    });
  
    // SCENARIOS
    test('event element is collapsed by default', () => {
      expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
    });
  
    test('user clicks on the event element Then the event details should be displayed', async () => {
      const user = userEvent.setup();
      await user.click(EventComponent.queryByText('show details'));
  
      expect(EventComponent.container.querySelector('.details')).toBeInTheDocument();
      expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
      expect(EventComponent.queryByText('show details')).not.toBeInTheDocument();
    });
  
    test('User can collapse an event to hide its details', async () => {
      const user = userEvent.setup();
  
      await user.click(EventComponent.queryByText('show details'));
      expect(EventComponent.container.querySelector('.details')).toBeInTheDocument();
      expect(EventComponent.queryByText('hide details')).toBeInTheDocument();
      expect(EventComponent.queryByText('show details')).not.toBeInTheDocument();
  
      await user.click(EventComponent.queryByText('hide details'));
      expect(EventComponent.container.querySelector('.details')).not.toBeInTheDocument();
      expect(EventComponent.queryByText('hide details')).not.toBeInTheDocument();
      expect(EventComponent.queryByText('show details')).toBeInTheDocument();
    });
  });