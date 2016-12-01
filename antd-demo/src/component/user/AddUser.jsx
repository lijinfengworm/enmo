import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Radio } from 'antd';
import Layout from '../common/layout';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

const RegistrationForm = Form.create()(React.createClass({
  getInitialState() {
    return {
      passwordDirty: false,
    };
  },
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
      	//这应该是个ajax提交
        console.log('Received values of form: ', values);
      }
    });
  },
  handlePasswordBlur(e) {
    const value = e.target.value;
    this.setState({ passwordDirty: this.state.passwordDirty || !!value });
  },
  checkPassowrd(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  },
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    console.log(form);
    if (value && this.state.passwordDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 14,
        offset: 6,
      },
    };
    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '86',
    })(
      <Select className="icp-selector">
        <Option value="86">+86</Option>
      </Select>
    );
    return (
    	<div>
      		<Layout title="用户中心" sub_title="用户列表" route={this.props.route} >
	    		<div className="ant-layout-topaside">
	    				<Form horizontal onSubmit={this.handleSubmit}>
				        <FormItem {...formItemLayout} label="E-mail" >
				          {getFieldDecorator('email', {
				            rules: [{
				              type: 'email', message: 'The input is not valid E-mail!',
				            }, {
				              required: true, message: 'Please input your E-mail!',
				            }],
				          })(
				            <Input />
				          )}
				        </FormItem>
				        <FormItem {...formItemLayout} label="Password" hasFeedback >
				          {getFieldDecorator('password', {
				            rules: [{
				              required: true, message: 'Please input your password!',
				            }, {
				              validator: this.checkConfirm,
				            }],
				          })(
				            <Input type="password" onBlur={this.handlePasswordBlur} />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="Confirm Password"
				          hasFeedback
				        >
				          {getFieldDecorator('confirm', {
				            rules: [{
				              required: true, message: 'Please confirm your password!',
				            }, {
				              validator: this.checkPassowrd,
				            }],
				          })(
				            <Input type="password" />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label={(
				            <span>
				              Username&nbsp;
				              <Tooltip title="What do you want other to call you?">
				                <Icon type="question-circle-o" />
				              </Tooltip>
				            </span>
				          )}
				          hasFeedback
				        >
				          {getFieldDecorator('nickname', {
				            rules: [{ required: true, message: 'Please input your nickname!' }],
				          })(
				            <Input />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="Habitual Residence"
				        >
				          {getFieldDecorator('residence', {
				            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
				            rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
				          })(
				            <Cascader options={residences} />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="Phone Number"
				        >
				          {getFieldDecorator('phone', {
				            rules: [{ required: true, message: 'Please input your phone number!' }],
				          })(
				            <Input addonBefore={prefixSelector} />
				          )}
				        </FormItem>
				        <FormItem
				          {...formItemLayout}
				          label="Captcha"
				        >
				          <Row gutter={8}>
				            <Col span={12}>
				              {getFieldDecorator('captcha', {
				                rules: [{ required: true, message: 'Please input the captcha you got!' }],
				              })(
				                <Input size="large" />
				              )}
				            </Col>
				            <Col span={12}>
				              <Button size="large">Get captcha</Button>
				            </Col>
				          </Row>
				        </FormItem>
				        <FormItem {...tailFormItemLayout} style={{ marginBottom: 8 }}>
				          {getFieldDecorator('agreement', {
				            valuePropName: 'checked',
				          })(
				            <Checkbox>I had read the <a>agreement</a></Checkbox>
				          )}
				        </FormItem>
				        <FormItem {...tailFormItemLayout}>
				          <Button type="primary" htmlType="submit" size="large">Register</Button>
				        </FormItem>
				      </Form>
	    		</div>
		  	</Layout>
	  	</div>
      
    );
  },
}));

export default RegistrationForm;
