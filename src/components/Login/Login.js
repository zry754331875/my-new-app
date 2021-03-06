import React, { PureComponent } from "react";
import { Form, Icon, Input, Button, Checkbox, message } from "antd";
import "../../CSS/Login.css";
import icon from "../../assets/1024.png";
import { connect } from "react-redux";
import { onLogin } from "../../Actions/LoginAction";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const FormItem = Form.Item;

function getSomething() {
  return "something";
}

async function testAsync() {
  return new Promise(
    resolve => {},
    reject => {
      setTimeout(() => reject("Hello"), 1000);
    }
  );
}

async function test() {
  try {
    const v1 = await getSomething();
    const v2 = await testAsync();
    console.log(v1, v2);
  } catch (error) {
    console.log(error);
  }
}

test();

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      object: { text: "123" }
    };
  }

  static contextTypes = {
    store: PropTypes.object
  };

  handleSubmit = e => {
    e.preventDefault();
    // const {clientHeight} = this.refDiv

    this.props.form.validateFields((err, values) => {
      this.props.onSubmit(err, values);
    });
  };

  handleLoginState = () => {
    const { isLoading, isSuccess, loginError } = this.props;

    if (isLoading) {
      message.loading("正在登陆中");
    }
    if (loginError != null) {
      const { message: errorMsg } = loginError;

      message.error(errorMsg);
    }
    if (isSuccess) {
      message.success("登陆成功");
    }
  };

  componentDidUpdate() {
    this.handleLoginState();
  }

  render() {
    
    const { getFieldDecorator } = this.props.form;

    return (
      <div style={{ ...this.props.style }}>
        <div className="father">
          <div
            className="children"
            onClick={() => {
              let object = this.state.object;

              object.text = "456";

              this.setState({
                object: { text: "456" }
              });
            }}
          >
            {this.state.object.text}
          </div>
        </div>
        <Link to={"/App"} target="_blank">
          跳转
        </Link>
        <div style={{ marginTop: 100, marginBottom: 50 }}>
          <img className="login-icon" src={icon} alt={"icon"} />
        </div>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator("userName", {
              rules: [{ required: true, message: "请输入用户名!" }]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="用户名（admin）"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("password", {
              rules: [{ required: true, message: "请输入密码!" }]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
                placeholder="密码（123456）"
              />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(<Checkbox>记住我</Checkbox>)}
            <a className="login-form-forgot" href="">
              忘记密码
            </a>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={this.props.isLoading}
            >
              登录
            </Button>
            或者{" "}
            <a className="login-form-register" href="">
              注册
            </a>
          </FormItem>
        </Form>
      </div>
    );
  }
}
console.log(Login.prototype);
const mapStateToProps = (state, ownProps) => {
  return {
    userName: state.Login.userName,
    password: state.Login.password,
    loginError: state.Login.loginError,
    isLoading: state.Login.isLoading,
    isSuccess: state.Login.isSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmit: (err, values) => {
      const { userName, password } = values;

      dispatch(onLogin(userName, password));
    }
  };
};

const LoginForm = Form.create()(Login);

const LoginC = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default LoginC;
