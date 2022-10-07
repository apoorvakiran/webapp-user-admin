import { render, screen } from "@testing-library/react"
import UserInfo from "../../../modules/Users/UserInfo"

describe('UserInfo Component', () => {
    beforeAll(() => {
        global.matchMedia = global.matchMedia || function () {
            return {
                addListener: jest.fn(),
                removeListener: jest.fn(),
            };
        }
    });

    it('renders UserInfo component', () => {
        const { container } = render(<UserInfo userData={{
            first_name: "user", last_name: "name",
        }} />);
        expect(container).toBeDefined();
    });

    it('checks for rendered elements on the DOM', () => {
        const { container } = render(<UserInfo userData={{
            first_name: "user", last_name: "name",
            role: 1,
            mac: 123,
            email: "info@gmail.com"
        }} />);
        expect(container).toBeDefined();
        expect(screen.getByTestId('user-name').textContent).toBe("user name");
        expect(screen.getByTestId('user-role').textContent).toBe("Admin");
        expect(screen.getByTestId('user-email').textContent).toBe("info@gmail.com");
        expect(screen.getByTestId('android-id').textContent).toBe("Android ID: 123");
    });
})