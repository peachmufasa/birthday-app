import {ConfigProvider, Layout, Menu} from "antd";
import {
    CalendarOutlined,
    GiftOutlined,
} from '@ant-design/icons';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import {BirthdayList} from "./pages/BirthdayList.tsx";
import {PresentList} from "./pages/PresentList.tsx";
import {Provider} from "react-redux";
import store from "./redux/Store.ts";
import ru_Ru from 'antd/locale/ru_RU';

const {Sider, Content} = Layout;

const App = () => {

    return (
        <ConfigProvider locale={ru_Ru}>
            <Provider store={store}>
                <Router>
                    <Layout style={{minHeight: '100vh'}}>
                        <Sider style={{padding: 10}} trigger={null} collapsed>
                            <Menu
                                theme='dark'
                                mode="inline"
                                defaultSelectedKeys={['1']}
                            >
                                <Menu.Item key="1" icon={<CalendarOutlined/>}>
                                    <Link to="/birthdays">Дни рождения</Link>
                                </Menu.Item>
                                <Menu.Item key="2" icon={<GiftOutlined/>}>
                                    <Link to="/presents">Подарки</Link>
                                </Menu.Item>
                            </Menu>
                        </Sider>
                        <Layout>
                            <Content
                                style={{
                                    margin: 16,
                                    padding: 20,
                                    backgroundColor: '#FFF',
                                    borderRadius: 16
                                }}
                            >
                                <Routes>
                                    <Route path="/birthdays" element={<BirthdayList/>}/>
                                    <Route path="/presents" element={<PresentList/>}/>
                                </Routes>
                            </Content>
                        </Layout>
                    </Layout>
                </Router>
            </Provider>
        </ConfigProvider>
    );
}


export default App
