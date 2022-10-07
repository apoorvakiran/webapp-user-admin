import { render, screen } from "@testing-library/react"
import ForgotPassword from "../../../components/Login/ForgotPassword"

describe('ForgotPassword Component', () => {

    it('renders ForgotPassword component', () => {
        const { container } = render(<ForgotPassword />)
        expect(container).toBeDefined();
    });

    it('checks for rendered elements on the DOM', () => {
        const { container } = render(<ForgotPassword  />)
        expect(container).toBeDefined();
        expect(screen.getByTestId('header-title').textContent).toBe('Password Recovery');
        expect(screen.getByTestId('form-input').getAttribute('placeholder')).toBe('Enter E-mail');
        expect(screen.getByTestId('button-title').textContent).toBe('Send Password Update Link');
    });
})