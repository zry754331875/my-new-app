import React, { PureComponent } from 'react';
import '../../CSS/App.css';
import { Layout, Menu, Breadcrumb, Icon, Button,Badge} from 'antd';
import PropTypes from 'prop-types';
import icon from '../../assets/1024.png'
import Main from "./Main";
import { connect } from "react-redux";
import { push } from 'connected-react-router'
import { Route, Switch, Redirect} from 'react-router'
import EmailList from "../email/EmailList";
import EmailInfo from "../email/EmailInfo";
import { Link } from 'react-router-dom'
import { handleMenuClick,onSliderMenuClick } from "../../Actions/AppAction";
import Contact from "../Contact/Contact";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const EmailFolders = ['INBOX',]

const breadcrumbNameMap = {
  '/ygoa/App':'首页',
  '/ygoa/App/Main': '',
  '/ygoa/App/Contact': '通讯录',
  '/ygoa/App/EmailInfo': '邮件详情',
  '/ygoa/App/EmailList':'邮箱',
  '/ygoa/App/EmailList/INBOX': '收件箱',
  '/ygoa/App/EmailList/Sent': '发件箱',
  '/ygoa/App/EmailList/Drafts': '草稿箱',
  '/ygoa/App/EmailList/Trash': '已删除',
  '/ygoa/App/EmailList/INBOX/EmailInfo': '邮箱详情',
  '/ygoa/App/EmailList/Sent/EmailInfo': '邮箱详情',
  '/ygoa/App/EmailList/Drafts/EmailInfo': '邮箱详情',
  '/ygoa/App/EmailList/Trash/EmailInfo': '邮箱详情',
};

class App extends PureComponent {

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
    
    const { location } = this.props;
    const pathSnippets = location.pathname.split('/').filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
      
      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>
            {breadcrumbNameMap[url]}
          </Link>
        </Breadcrumb.Item>
      );
    });

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
          <Breadcrumb style={{marginBottom:20}}>
            {extraBreadcrumbItems}
          </Breadcrumb>
          <Switch>
            <Route path="/ygoa/App/Main" component={Main}/>
            <Route exact path="/ygoa/App/EmailList/:folder" component={EmailList}/>
            <Route path="/ygoa/App/Contact" component={Contact}/>
            <Route path='/ygoa/App/EmailList/:folder/EmailInfo' component={EmailInfo}></Route>
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
