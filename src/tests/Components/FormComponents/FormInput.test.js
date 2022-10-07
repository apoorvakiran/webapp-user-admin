import { render, screen } from "@testing-library/react"
import {FormInput} from "../../../components/formComponents/FormInput"

describe('FormInput Component', () => {

    it('renders FormInput component', () => {
        const { container } = render(<FormInput type="text" placeholder="form-input" />)
        expect(container).toBeDefined();
    });

    it('checks for rendered elements on the DOM', () => {
        const { container } = render(<FormInput type="text" placeholder="form-input"  />)
        expect(container).toBeDefined();
        expect(screen.getByTestId('form-input').getAttribute('placeholder')).toBe('form-input');
        expect(screen.getByTestId('form-input').getAttribute('type')).toBe('text');
    });
})