import { Flex, Menu, Avatar, Layout} from 'antd'
import {
    AntDesignOutlined,
    HistoryOutlined,
    CalendarOutlined,
    UserOutlined,
    ScheduleOutlined,
    TableOutlined,
    InsertRowAboveOutlined,
  } from '@ant-design/icons';

  const { Header, Content, Footer, Sider } = Layout

const sideBarItems = [
    getItem('Profile', 'sub1', <UserOutlined />),
    getItem('Calendar', 'sub2', <CalendarOutlined/>, [
      getItem('Daily', 'sub3', <ScheduleOutlined/>),
      getItem('Weekly', 'sub4', <InsertRowAboveOutlined/>),
      getItem('Monthly', 'sub5', <TableOutlined/>)
    ]),
    getItem('History', 'sub6', <HistoryOutlined/>)
  ]
  
function getItem(label, key, icon, children) {
    return {key, icon, children, label}
}

const MenuSidebar = ({collapsed, setCollapsed}) => {
    return(
        <Sider theme="dark" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} style={{background:"RoyalBlue"}}>
            <Flex justify={'center'} align={'center'} style={{paddingTop: '1vw'}}>
                <Avatar size={{ xs: 24, sm: 28, md: 32, lg: 54, xl: 60, xxl: 60}} icon={<AntDesignOutlined/>}/>
                </Flex>
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={sideBarItems} style={{paddingTop:'1vw', background:"RoyalBlue"}}/>
        </Sider>
    )
}

export default MenuSidebar