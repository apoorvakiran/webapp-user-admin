import { render, screen } from "@testing-library/react"
import Cards from "../../components/Cards/Cards"

describe('Cards Component', () => {

    it('renders Cards component', () => {
        const { container } = render(<Cards />)
        expect(container).toBeDefined();
    });

    it('checks for rendered elements on the DOM', () => {
        const { container } = render(<Cards  />)
        expect(container).toBeDefined();
        expect(screen.getAllByTestId('card').length).toBe(3);
        expect(screen.getAllByTestId('detail-value').length).toBe(3);
        expect(screen.getAllByTestId('detail-value').at(0).textContent).toBe('$25,970');
        expect(screen.getAllByTestId('detail-value').at(1).textContent).toBe('$14,270');
        expect(screen.getAllByTestId('detail-value').at(2).textContent).toBe('$4,270');
    });
})