import React from 'react';
import { Link } from 'react-router';
import { Form, Icon, Input, Button, Checkbox ,Row, Col } from 'antd';

const FormItem = Form.Item;


const Login = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  },
  render() {
  	const { getFieldDecorator } = this.props.form;
    return (
    	<Row>
		    <Col xs={2} sm={4} md={6} lg={8}>Col</Col>
		    <Col xs={20} sm={16} md={12} lg={8}>
		    	<div>
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
	  		</div>
		    </Col>
		    <Col xs={2} sm={4} md={6} lg={8}>Col</Col>
		  </Row>
    	
    );
  },
}));

export default Login;
