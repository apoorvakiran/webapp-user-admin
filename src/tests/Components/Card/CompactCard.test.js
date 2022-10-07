import { render, screen } from "@testing-library/react"
import CompactCard from "../../../components/Card/CompactCard"
import SettingIcon from "../../../images/setting.png";

describe('CompactCard Component', () => {

    it('renders CompactCard component', () => {
        const { container } = render(<CompactCard param={{value:12, png: SettingIcon}} />)
        expect(container).toBeDefined();
    });

    it('checks for rendered elements on the DOM', () => {
        const { container } = render(<CompactCard  param={{value:10, png: SettingIcon}}  />)
        expect(container).toBeDefined();
        expect(screen.getByTestId('radial-bar').textContent).toBe('Chart');
        expect(screen.getByTestId('detail-value').textContent).toBe('$10');
    });
})