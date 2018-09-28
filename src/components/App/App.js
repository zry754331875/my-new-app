import React, { PureComponent } from "react";
import "../../CSS/App.css";
import { Layout, Menu, Breadcrumb, Icon, Button, Badge } from "antd";
import PropTypes from "prop-types";
import icon from "../../assets/1024.png";
import Main from "./Main";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Route, Switch } from "react-router";
import EmailList from "../email/EmailList";
import EmailInfo from "../email/EmailInfo";
import { Link, Redirect } from "react-router-dom";
import { handleMenuClick, onSliderMenuClick } from "../../Actions/AppAction";
import Contact from "../Contact/Contact";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const EmailFolders = ["INBOX"];

const breadcrumbNameMap = {
  "/App": "首页",
  "/App/Main": "",
  "/App/Contact": "通讯录",
  "/App/EmailInfo": "邮件详情",
  "/App/EmailList": "邮箱",
  "/App/EmailList/INBOX": "收件箱",
  "/App/EmailList/Sent": "发件箱",
  "/App/EmailList/Drafts": "草稿箱",
  "/App/EmailList/Trash": "已删除",
  "/App/EmailList/INBOX/EmailInfo": "邮箱详情",
  "/App/EmailList/Sent/EmailInfo": "邮箱详情",
  "/App/EmailList/Drafts/EmailInfo": "邮箱详情",
  "/App/EmailList/Trash/EmailInfo": "邮箱详情"
};

const PrivateRoute = ({ component: Component, isPublic = false, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isPublic ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

function promiseTest() {
  return new Promise((resolve, reject) => {
    let success = true;

    if (success) {
      resolve();
    } else {
      reject();
    }
  });
}

class App extends PureComponent {
  static contextTypes = {
    store: PropTypes.object
  };

  hanldeMenuClick = item => {
    this.props.onMenuClick(item);
  };

  handleSliderMenuClick = item => {
    this.props.onSliderMenuClick(item);
  };

  componentWillMount() {
    this.hanldeMenuClick({ key: 1 });
  }

  render() {
    const { location } = this.props;
    const pathSnippets = location.pathname.split("/").filter(i => i);
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;

      return (
        <Breadcrumb.Item key={url}>
          <Link to={url}>{breadcrumbNameMap[url]}</Link>
        </Breadcrumb.Item>
      );
    });

    return (
      <Layout>
        <Header className="header">
          <img className="logo" src={icon} alt="icon" />
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: "64px" }}
            onClick={this.hanldeMenuClick}
            selectable={false}
          >
            <Menu.Item key="1">{this.props.itemOne}</Menu.Item>
            <Menu.Item key="2">通讯录</Menu.Item>
            <Menu.Item key="3">
              邮件
              <Badge count={this.props.emailBadge} offset={[-25, 3]} />
            </Menu.Item>
            <Menu.Item key="4">退出</Menu.Item>
          </Menu>
        </Header>
        <Layout style={{ padding: "0 50px", marginTop: 64 }}>
          <Sider width={200} style={{ background: "#fff" }}>
            <Menu
              mode={"inline"}
              // defaultSelectedKeys={['1']}
              // defaultOpenKeys={['sub1']}
              style={{ height: "100%", borderRight: 0 }}
              onClick={this.handleSliderMenuClick}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="user" />
                    邮件
                  </span>
                }
              >
                <Menu.Item key="1">收件箱</Menu.Item>
                <Menu.Item key="2">发件箱</Menu.Item>
                <Menu.Item key="3">草稿箱</Menu.Item>
                <Menu.Item key="4">已删除</Menu.Item>
              </SubMenu>
              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="laptop" />
                    通讯录
                  </span>
                }
              >
                <Menu.Item key="5">干部通讯录</Menu.Item>
                <Menu.Item key="6">普通通讯录</Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
          <Layout style={{ padding: "0 24px 24px" }}>
            <Content
              style={{
                background: "#fff",
                padding: 24,
                margin: 0,
                minHeight: 1000
              }}
            >
              <Breadcrumb style={{ marginBottom: 20 }}>
                {extraBreadcrumbItems}
              </Breadcrumb>
              <Switch>
                <PrivateRoute
                  path="/App/Main"
                  component={Main}
                  isPublic={true}
                />
                <Route
                  exact
                  path="/App/EmailList/:folder"
                  component={EmailList}
                />
                <Route path="/App/Contact" component={Contact} />
                <Route
                  path="/App/EmailList/:folder/EmailInfo"
                  component={EmailInfo}
                />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }

  onClick() {
    console.log("123");
  }
}

App.propTypes = {
  itemOne: PropTypes.string
};

App.defaultProps = {
  itemOne: "首页"
};

const mapStateToProps = state => {
  return {
    emailBadge: state.App.emailBadge
  };
};

const mapDispatchToProps = dispatch => ({
  onMenuClick: item => {
    dispatch(handleMenuClick(item));
  },
  onSliderMenuClick: item => {
    dispatch(onSliderMenuClick(item));
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
