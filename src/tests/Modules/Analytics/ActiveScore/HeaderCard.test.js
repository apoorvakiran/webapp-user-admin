import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import HeaderCard from "../../../../modules/Analytics/ActiveScore/HeaderCard";


describe('HeaderCard Component', () => {

    it('renders HeaderCard component', () => {
        const handleChange = jest.fn();
        const { container } = render(<HeaderCard handleChange={handleChange} />);
        expect(container).toBeDefined();
    });

    it('validates min & max values for HeaderCard component', () => {
        const handleChange = jest.fn();
        const { container } = render(<HeaderCard handleChange={handleChange} minValue={10} maxValue={100} />);
        expect(container).toBeDefined();
        expect(screen.getByTestId('minValue').textContent).toBe("10");
        expect(screen.getByTestId('maxValue').textContent).toBe("100");
    });

    it('updates the select input value when an option is clicked', async () => {
        // const handleChange = jest.fn();
        // const { container } = render(<HeaderCard handleChange={handleChange} minValue={10} maxValue={100} />);
        userEvent.click(screen.getByRole('combobox'));
        const option = screen.getByTestId("low");
        userEvent.click(option, undefined, { skipPointerEventsCheck: true });
        expect(screen.getByTestId("low")).toBeDefined();

    });

});