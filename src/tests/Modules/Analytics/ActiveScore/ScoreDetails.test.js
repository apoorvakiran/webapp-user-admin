import { render, screen } from "@testing-library/react"
import ScoreDetails from "../../../../modules/Analytics/ActiveScore/ScoreDetails"


describe('ScoreDetails Component', () => {

    it('renders ScoreDetails component', () => {
        const { container } = render(<ScoreDetails detailsText={""} />);
        expect(container).toBeDefined();
    });

    it('checks for rendered elements on the DOM based on scoreDescription values', () => {
        const { container } = render(<ScoreDetails detailsText={"Active Score"} />);
        expect(container).toBeDefined();
        expect(screen.getByTestId('scoreDescription').textContent).toBe("A metric of productivity measured by the ratio measured in percentage of intense active motion vs mild active motion. Value ranges from 0% to 100%. It is an indicator of individual productivity and engagement.");
        render(<ScoreDetails detailsText={"Injury Risk Score"} />, {container});
        expect(screen.getByTestId('scoreDescription').textContent).toBe("Measures the risk of injury due to poor ergonomic motion. Value ranges from 0 to 7. The higher the number, the higher the risk of injury. The dominant motion (pitch, yaw, roll) used in this index is speed of pitch. It is a measure of force on the hand and wrist.");
        render(<ScoreDetails detailsText={"Risk Frequency"} />, {container});
        expect(screen.getByTestId('scoreDescription').textContent).toBe("A count of the number of times the Risk Index exceeds a safe value. Value ranges from 0 to 10. The higher the number, the higher the risk of injury. The maximum value is capped at 10.");
        render(<ScoreDetails detailsText={"Speed Score"} />, {container});
        expect(screen.getByTestId('scoreDescription').textContent).toBe("Measures the speed (and force) on the hand and wrist. Value ranges from 0 to 7. The higher the number, the higher the force. The speed score takes into account maximum values among pitch, yaw and roll for each sample. It is a measure of how fast the hand and wrist are moving. ");
    });
})