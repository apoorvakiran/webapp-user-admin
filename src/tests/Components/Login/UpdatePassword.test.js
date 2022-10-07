import { render, screen } from "@testing-library/react"
import UpdatePassword from "../../../components/Login/UpdatePassword"

describe('UpdatePassword Component', () => {

    it('renders UpdatePassword component', () => {
        const { container } = render(<UpdatePassword />)
        expect(container).toBeDefined();
    });

    it('checks for rendered elements on the DOM', () => {
        const { container } = render(<UpdatePassword  />)
        expect(container).toBeDefined();
        expect(screen.getByTestId('header-title').textContent).toBe('Mentore');
        expect(screen.getAllByTestId('form-input').at(0).getAttribute('placeholder')).toBe('Password');
        expect(screen.getByTestId('button-title').textContent).toBe('Save');
    });
})