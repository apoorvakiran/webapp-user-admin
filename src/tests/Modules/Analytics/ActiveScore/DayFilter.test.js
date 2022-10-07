import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import {DayFilter} from "../../../../modules/Analytics/ActiveScore/DayFilter"


describe('DayFilter Component', () => {

    it('renders DayFilter component', () => {
        const { container } = render(<DayFilter />);
        expect(container).toBeDefined();
    });

    it('checks for rendered elements on the DOM', () => {
        const { container } = render(<DayFilter/>);
        expect(container).toBeDefined();
        expect(screen.getAllByTestId('dashboard-grid').length).toBe(4);
    });

    it('triggers & checks for selected item', async () => {
        const { container } = render(<DayFilter />);
        expect(container).toBeDefined();
        userEvent.click(screen.getAllByTestId('dashboard-grid').at(0));
        expect(screen.getByTestId("item-0").classList.contains("activeGrid")).toBeTruthy();
    });

})