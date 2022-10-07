import { render, screen } from "@testing-library/react"
import {FormHeader} from "../../../components/formComponents/FormHeader"

describe('FormHeader Component', () => {

    it('renders FormHeader component', () => {
        const { container } = render(<FormHeader title="header" />)
        expect(container).toBeDefined();
    });

    it('checks for rendered elements on the DOM', () => {
        const { container } = render(<FormHeader title="header" />)
        expect(container).toBeDefined();
        expect(screen.getByTestId('header-title').textContent).toBe('header');
    });
})