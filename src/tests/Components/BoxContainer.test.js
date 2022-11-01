import { render, screen } from "@testing-library/react";
import BoxContainer from "../../components/BoxContainer/BoxContainer";


describe('BoxContainer Component', () => {

    it('renders BoxContainer component', () => {
        const { container } = render(<BoxContainer />);
        expect(container).toBeDefined();
    });

    it('checks for rendered elements in the DOM for BoxContainer component', () => {
        const { container } = render(<BoxContainer />);
        expect(container).toBeDefined();
        expect(screen.getByTestId('box-container')).toBeInTheDocument();
        expect(screen.getByTestId('tables')).toBeInTheDocument();
    });

});