import { render, screen } from "@testing-library/react"
import NoData from "../../../layouts/FullPageLayout/NoData"

describe('NoData Component', () => {

    it('renders NoData component', () => {
        const { container } = render(<NoData />)
        expect(container).toBeDefined();
    });

    it('checks for rendered elements on the DOM', () => {
        const { container } = render(<NoData />);
        expect(container).toBeDefined();
        expect(screen.getByTestId('no-data-found').textContent).toEqual("No Data Found");
        expect(container.querySelector('.ant-card-head-title').textContent).toEqual('No Data');
        
    });
})