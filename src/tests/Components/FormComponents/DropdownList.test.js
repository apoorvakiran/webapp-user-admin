import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event";
import DropdownList from "../../../components/formComponents/DropdownList"

describe('DropdownList Component', () => {

    it('renders DropdownList component', () => {
        const { container } = render(<DropdownList jobTitleList={[]} />)
        expect(container).toBeDefined();
    });

    it('checks for rendered elements on the DOM', () => {
        const { container } = render(<DropdownList jobTitleList={[{
            name: 'Job1'
        },
        {
            name: 'Job2'
        },
        {
            name: 'Job3'
        }]} />);
        expect(container).toBeDefined();
        expect(screen.getByTestId('dropdown-list')).toBeDefined();
    });

    it('triggers & checks for selected item', async () => {
        const { container } = render(<DropdownList jobTitleList={[{
            name: 'Job1'
        },
        {
            name: 'Job2'
        },
        {
            name: 'Job3'
        }]} />);
        expect(container).toBeDefined();
        userEvent.click(screen.getByRole('combobox'));
        const option = screen.getByTestId("Job1");
        userEvent.click(option, undefined, { skipPointerEventsCheck: true });
        expect(screen.getByTestId("Job1")).toBeDefined();
    });
})