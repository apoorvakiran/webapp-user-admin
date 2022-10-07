import { render, screen } from "@testing-library/react"
import LiveSession from "../../components/LiveSession"

describe('LiveSession Component', () => {

    it('renders LiveSession component', () => {
        const { container } = render(<LiveSession session={'1:34:00'} />)
        expect(container).toBeDefined();
    });

    it('checks for rendered elements on the DOM', () => {
        const { container } = render(<LiveSession session={'1:34:00'}  />)
        expect(container).toBeDefined();
        expect(screen.getByTestId('live-session').textContent).toBe('1:34:00');
    });
})