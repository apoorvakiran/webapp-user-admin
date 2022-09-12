import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import ScoreFilter from "../../../../modules/Analytics/SpeedScore/ScoreFilter"


describe('ScoreFilter Component', () => {

    it('renders ScoreFilter component', () => {
        const handleChange = jest.fn();
        const { container } = render(<ScoreFilter handleChange={handleChange} />);
        expect(container).toBeDefined();
    });

    it('validates min & max values for ScoreFilter component', () => {
        const handleChange = jest.fn();
        const { container } = render(<ScoreFilter handleChange={handleChange} />);
        expect(container).toBeDefined();
        expect(screen.getByTestId('min-value').textContent).toBe("0");
        expect(screen.getByTestId('max-value').textContent).toBe("7");
    });

    it('updates the select input value when an option is clicked', async () => {
        const handleChange = jest.fn();
        const { container } = render(<ScoreFilter handleChange={handleChange} />);
        userEvent.click(screen.getByRole('combobox'));
        const option = screen.getByTestId("low");
        userEvent.click(option, undefined, { skipPointerEventsCheck: true });
        expect(screen.getByTestId("low")).toBeDefined();

    });

})