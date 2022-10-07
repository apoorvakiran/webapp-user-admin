import { render, screen } from "@testing-library/react"
import {LogoComponent} from "../../../layouts/FullPageLayout/Logo"
import Logo from '../../../images/Rivian_logo.svg'

describe('LogoComponent Component', () => {

    it('renders LogoComponent component', () => {
        const { container } = render(<LogoComponent />)
        expect(container).toBeDefined();
    });

    it('checks for rendered elements on the DOM', () => {
        const { container } = render(<LogoComponent />);
        expect(container).toBeDefined();
        expect(screen.getByTestId('logo').getAttribute('src')).toEqual(Logo);
    });
})