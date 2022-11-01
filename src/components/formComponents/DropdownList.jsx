
import { Select } from 'antd';
import '../Login/loginForm.css';

// const menu = (
//     <Menu
//         items={[
//             {
//                 label: "All Jobs",
//                 key: '0',
//             },
//             {
//                 label: "Meat grinder",
//                 key: '1',
//             }
//         ]}
//     />
// );

const handleChange = (value) => {
    console.log(`selected ${value}`);
};

const DropdownList = (props) => (
    // <Dropdown overlay={menu} trigger={['click']}>
    //     <Button className="dropdownBtn">
    //         <Space>
    //             All Jobs
    //             <DownOutlined />
    //         </Space>
    //     </Button>
    // </Dropdown>

    <Select defaultValue="All Jobs" style={{ width: 120 }} onChange={handleChange}>
        <Select.Option value={0}> All Jobs </Select.Option>
        {props.jobTitleList.map((row, index) => (
            <Select.Option value={row.name}>{row.name} </Select.Option>
        ))}
    </Select>

);

export default DropdownList;