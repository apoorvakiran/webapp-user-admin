import { render, screen } from "@testing-library/react"
import {FormButton} from "../../../components/formComponents/FormButton"

describe('FormButton Component', () => {

    it('renders FormButton component', () => {
        const { container } = render(<FormButton title="Button" changeStyleClass="button" />)
        expect(container).toBeDefined();
    });

    it('checks for rendered elements on the DOM', () => {
        const { container } = render(<FormButton title="Button" changeStyleClass="button" />)
        expect(container).toBeDefined();
        expect(screen.getByTestId('form-button')).toBeDefined();
        expect(screen.getByTestId('form-button').classList.contains('button')).toBeTruthy();
        expect(screen.getByTestId('button-title').textContent).toBe('Button');
    });
})