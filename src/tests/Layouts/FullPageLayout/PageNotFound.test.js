import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import PageNotFound from "../../../layouts/PageNotFound"

describe('PageNotFound Component', () => {

    it('renders PageNotFound component', () => {
        const { container } = render(<PageNotFound />)
        expect(container).toBeDefined();
    });

    it('checks for rendered elements on the DOM', () => {
        const { container } = render(<PageNotFound />);
        expect(container).toBeDefined();
        expect(container.querySelector('.ant-result-title').textContent).toEqual("Page Not Found");
        expect(container.querySelector('.ant-result-subtitle').textContent).toEqual(`Sorry, the page doesn't exist, try again or contact the administrator.`); 
    });
    
    it('triggers & checks for selected item', async () => {
        Object.defineProperty(window, 'location', {
            configurable: true,
            value: { reload: jest.fn() },
          });
        const { container } = render(<PageNotFound />);
        expect(container).toBeDefined();
        userEvent.click(screen.getByTestId('try-again'));
        expect(window.location.reload).toHaveBeenCalled();
    });
})