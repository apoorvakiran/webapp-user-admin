import { render, screen } from "@testing-library/react"
import Charts from "../../components/Charts/Chart"
import SettingIcon from "../../images/setting.png";
import { ActiveScoreDesc } from "../../utils/Data/Data";

describe('Charts Component', () => {

    it('renders Charts component', () => {
        const { container } = render(<Charts  title="Active Score"
        desc={ActiveScoreDesc}
        data={[]}
        labels={[]}
        Icon={SettingIcon}
        LinearGradientColor={["#05FF00", "#F3BE00", "#FF0000"]} />)
        expect(container).toBeDefined();
    });

    it('checks for rendered elements on the DOM', () => {
        const { container } = render(<Charts  title="Active Score"
        desc={ActiveScoreDesc}
        data={[]}
        labels={[]}
        Icon={SettingIcon}
        LinearGradientColor={["#05FF00", "#F3BE00", "#FF0000"]}  />)
        expect(container).toBeDefined();
        expect(screen.getByTestId('SettingTitle').textContent).toBe('Active Score');
        expect(screen.getByTestId('desc').textContent).toBe('A metric of productivity measured by the ratio measured in percentage of intense active motion vs mild active motion. Value ranges from 0% to 100%. It is an indicator of individual productivity and engagement.');
    });
})