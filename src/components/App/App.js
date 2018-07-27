import React, { Component } from 'react';
import '../../CSS/App.css';
import { Layout, Menu, Breadcrumb, Icon, Button,Badge} from 'antd';
import PropTypes from 'prop-types';
import icon from '../../assets/1024.png'
import Main from "./Main";
import { connect } from "react-redux";
import { push } from 'connected-react-router'
import { Route, Switch, Redirect} from 'react-router'
import EmailList from "../email/EmailList";
import { Link } from 'react-router-dom'
import { handleMenuClick,onSliderMenuClick } from "../../Actions/AppAction";
import Contact from "../Contact/Contact";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const EmailFolders = ['INBOX',]
class App extends Component {

  hanldeMenuClick=(item)=>{
    this.props.onMenuClick(item)
  }

  handleSliderMenuClick=(item)=>{
    this.props.onSliderMenuClick(item)
  }

  componentWillMount(){
    this.hanldeMenuClick({key:1})
  }

  render() {
    
    return (
    <Layout>
      <Header className="header">
        <img className="logo" src={icon} alt='icon'>
        </img>
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
          onClick={this.hanldeMenuClick}
          selectable={false}
        >
          <Menu.Item key="1">{this.props.itemOne}</Menu.Item>
          <Menu.Item key="2">通讯录</Menu.Item>
          <Menu.Item key="3">
            邮件
            <Badge count={this.props.emailBadge} offset={[-25,3]}>
            </Badge>
          </Menu.Item>
          <Menu
          className='right'
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="4">退出</Menu.Item>
        </Menu>
        </Menu>
        
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff'}}>
          <Menu
            mode={'inline'}
            // defaultSelectedKeys={['1']}
            // defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
            onClick={this.handleSliderMenuClick}
          >
            <SubMenu key="sub1" title={<span><Icon type="user" />邮件</span>}>
              <Menu.Item key="1">收件箱</Menu.Item>
              <Menu.Item key="2">发件箱</Menu.Item>
              <Menu.Item key="3">草稿箱</Menu.Item>
              <Menu.Item key="4">已删除</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="laptop" />通讯录</span>}>
              <Menu.Item key="5">干部通讯录</Menu.Item>
              <Menu.Item key="6">普通通讯录</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 1000 }}>
          <Switch>
            <Route path="/App/Main" component={Main}/>
            <Route path="/App/EmailList/:folder" component={EmailList}/>
            <Route path="/App/Contact" component={Contact}/>
          </Switch>
          </Content>
        </Layout>
      </Layout>
  </Layout>)
  }

  onClick(){
    console.log('123')
  }
}

App.propTypes = {
  itemOne:PropTypes.string,
}

App.defaultProps = {
  itemOne: '首页'
};

const mapStateToProps = (state) =>{
  return {
    emailBadge:state.App.emailBadge,
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    onMenuClick:(item)=>{
      dispatch(handleMenuClick(item))
    },
    onSliderMenuClick:(item)=>{
      dispatch(onSliderMenuClick(item))
    }
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
