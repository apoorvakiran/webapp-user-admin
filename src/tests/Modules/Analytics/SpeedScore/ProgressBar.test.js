import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import ProgressBar from "../../../../modules/Analytics/SpeedScore/ProgressBar";


describe('ProgressBar Component', () => {

    it('renders ProgressBar component', () => {
      
        const { container } = render(<ProgressBar percent={20} strokeWidth={120} strokeColor="#000"  />);
        expect(container).toBeDefined();
    });

    it('check for rendered elements in the DOM for ProgressBar component', () => {
        const { container } = render(<ProgressBar percent={20} strokeWidth={120} strokeColor="#000" />);
        expect(container).toBeDefined();
        expect(screen.getByTestId('progress')).toBeDefined();
    });

})