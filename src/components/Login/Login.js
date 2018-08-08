import React, { PureComponent } from 'react';
import { Form, Icon, Input, Button, Checkbox,message } from 'antd';
import '../../CSS/Login.css'
import icon from '../../assets/1024.png'
import { connect } from "react-redux";
import { onLogin } from "../../Actions/LoginAction";
import PropTypes from "prop-types";

const FormItem = Form.Item;

class Login extends PureComponent {

  static contextTypes = {
    history: PropTypes.object,
  };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

          this.props.onSubmit(err,values)
        });
      }
      
      handleLoginState=()=>{

        const {isLoading,isSuccess,loginError} = this.props

        if(isLoading){
          message.loading('正在登陆中')
        }
        if(loginError != null){
          const {message:errorMsg} = loginError
          
          message.error(errorMsg)
        }
        if(isSuccess){
          message.success('登陆成功')
        }
      }

      componentDidUpdate(){
        this.handleLoginState()
      }
      
      render() {
        const { getFieldDecorator } = this.props.form;
        return (
          
          <div>
          <div style={{marginTop: 100,marginBottom: 50}}>
          <img className="login-icon" src={icon} alt={'icon'}></img>
          </div>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <FormItem>
              {getFieldDecorator('userName', {
                rules: [{ required: true, message: '请输入用户名!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名（admin）" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('password', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码（123456）" />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>记住我</Checkbox>
              )}
              <a className="login-form-forgot" href="">忘记密码</a>
              <Button type="primary" htmlType="submit" className="login-form-button" disabled={this.props.isLoading}>
                登录
              </Button>
              或者 <a className='login-form-register' href="">注册</a>
            </FormItem>
          </Form>
          </div>
        );
      }
};

const mapStateToProps = (state,ownProps)=>{

  return {
    userName:state.Login.userName,
    password:state.Login.password,
    loginError:state.Login.loginError,
    isLoading:state.Login.isLoading,
    isSuccess:state.Login.isSuccess,
  }
} 

const mapDispatchToProps = (dispatch)=>{
  return {
    onSubmit:(err,values)=>{
      const {userName,password} = values

      dispatch(onLogin(userName,password))
    },
  }
}

const LoginForm = Form.create()(Login)

const LoginC = connect(mapStateToProps,mapDispatchToProps)(LoginForm)

export default LoginC