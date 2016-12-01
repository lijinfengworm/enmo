import React from 'react';
import { Link } from 'react-router';
import { Form, Icon, Input, Button, Checkbox ,Row, Col } from 'antd';

const FormItem = Form.Item;


const App = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(values.userName == 'wuyou@163.com' && values.password == 'Linux123'){
          window.location.href="/#/airport/list";
        }
        console.log('Received values of form: ', values);
      }
    });
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Row>
        <Col span={12} offset={9}>
          <Form onSubmit={this.handleSubmit}  className="login-form">
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: 'Please input your username!' }],
                })(
                  <Input addonBefore={<Icon type="user" />} placeholder="Username" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                  <Input addonBefore={<Icon type="lock" />} type="password" placeholder="Password" />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>Remember me</Checkbox>
                )}
                <a className="login-form-forgot">Forgot password</a>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Log in
                </Button>
                Or <a>register now!</a>
              </FormItem>
          </Form>
        </Col>
        </Row>
      </div>
    );
  },
}));

export default App;
