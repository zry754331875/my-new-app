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
import { handleMenuClick } from "../../Actions/AppAction";
import Login from "../Login/Login";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

class App extends Component {

  hanldeMenuClick=(item)=>{
    this.props.onMenuClick(item)
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
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
          onClick={this.hanldeMenuClick}
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
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <SubMenu key="sub1" title={<span><Icon type="user" />subnav 1</span>}>
              <Menu.Item key="1">option1</Menu.Item>
              <Menu.Item key="2">option2</Menu.Item>
              <Menu.Item key="3">option3</Menu.Item>
              <Menu.Item key="4">option4</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" title={<span><Icon type="laptop" />subnav 2</span>}>
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="notification" />subnav 3</span>}>
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 1000 }}>
          <Switch>
            <Route path="/Main" component={Main}/>
            <Route path="/EmailList" component={EmailList}/>
            <Route path="/Login" component={Login}/>
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
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
