import { render, screen } from "@testing-library/react"
import Card from "../../../components/Card/Card"
import SettingIcon from "../../images/setting.png";

describe('Card Component', () => {

    it('renders Card component', () => {
        const { container } = render(<Card value= {12} png= {SettingIcon} />)
        expect(container).toBeDefined();
    });

    it('checks for rendered elements on the DOM', () => {
        const { container } = render(<Card value= {12} png= {SettingIcon}  />)
        expect(container).toBeDefined();
        expect(screen.getByTestId('card').hasChildNodes()).toBeTruthy();
        expect(screen.getByTestId('radial-bar').textContent).toBe('Chart');
        expect(screen.getByTestId('detail-value').textContent).toBe('$12');
    });
})