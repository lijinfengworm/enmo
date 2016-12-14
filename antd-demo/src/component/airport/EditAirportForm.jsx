import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, Radio } from 'antd';
import Layout from '../common/layout';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
let data = {};
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

const EditAirportForm = Form.create()(React.createClass({
	getInitialState() {
	  	return {
	      name: '',
	      type: 10
	    };
	  },
	loadDataFromServer: function(){
		var url = './test_data/airport_edit.json';
	  	$.ajax({
	    	url: url,
	        dataType: 'json',
	        success: function(data) {
	        	//console.log(data.name);
	        	this.props.form.setFieldsValue(data);
	        	
	       }.bind(this)
	    });
	},
  
  componentDidMount() {
  	this.loadDataFromServer();
	console.log(this.state);
	
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
      		<Layout title="机场配置" sub_title="编辑" route={this.props.route} keys={['8']} menu={['sub2']} >
	    		<div className="ant-layout-topaside">
	    				<Form horizontal onSubmit={this.handleSubmit}>
				        <FormItem {...formItemLayout} label="编号" >
				          {getFieldDecorator('id', {
				            rules: [ {
				              required: true, message: 'Please input id',
				            }],
				          })(
				            <Input />
				          )}
				        </FormItem>
				        <FormItem {...formItemLayout} label="名称"  >
				          {getFieldDecorator('name', {
				            rules: [{
				              required: true, message: 'Please input your name!',
				            }, {
				              validator: this.checkConfirm,
				            }],
				          })(
				            <Input  />
				          )}
				        </FormItem>

				        <FormItem {...formItemLayout} label="英文名称"  >
				          {getFieldDecorator('name_en', {
				            rules: [{
				              required: true, message: 'Please input your name!',
				            }, {
				              validator: this.checkConfirm,
				            }],
				          })(
				            <Input  />
				          )}
				        </FormItem>
				        <FormItem {...formItemLayout} label="国家"  >
				          {getFieldDecorator('county', {
				            rules: [{
				              required: true, message: 'Please input your name!',
				            }, {
				              validator: this.checkConfirm,
				            }],
				          })(
				            <Input  />
				          )}
				        </FormItem>
				        <FormItem {...formItemLayout} label="缩写"  >
				          {getFieldDecorator('abbr', {
				            rules: [{
				              required: true, message: 'Please input your name!',
				            }, {
				              validator: this.checkConfirm,
				            }],
				          })(
				            <Input  />
				          )}
				        </FormItem>
				        <FormItem {...formItemLayout} label="经度"  >
				          {getFieldDecorator('longitude', {
				            rules: [{
				              required: true, message: 'Please input your name!',
				            }, {
				              validator: this.checkConfirm,
				            }],
				          })(
				            <Input  />
				          )}
				        </FormItem>
				        <FormItem {...formItemLayout} label="纬度"  >
				          {getFieldDecorator('latitude', {
				            rules: [{
				              required: true, message: 'Please input your name!',
				            }, {
				              validator: this.checkConfirm,
				            }],
				          })(
				            <Input  />
				          )}
				        </FormItem>
				        <FormItem {...formItemLayout} label="海拔"  >
				          {getFieldDecorator('altitude', {
				            rules: [{
				              required: true, message: 'Please input your name!',
				            }, {
				              validator: this.checkConfirm,
				            }],
				          })(
				            <Input  />
				          )}
				        </FormItem>
				        
				        <FormItem
				          {...formItemLayout}
				          label="类型"
				        >
				          {getFieldDecorator('type', {
				            rules: [
				              { required: true, message: 'Please select your style!' },
				            ],
				          })(
				            <Select   placeholder="Please select a country">
				              <Option value="0">航线城市</Option>
				              <Option value="10" selected>小修中心</Option>
				              <Option value="20">大修中心 </Option>
				            </Select>
				          )}
				        </FormItem>

				        <FormItem {...formItemLayout} label="标签"  >
				          {getFieldDecorator('marks', {
				            rules: [{
				              required: true, message: 'Please input your name!',
				            }, {
				              validator: this.checkConfirm,
				            }],
				          })(
				            <Input  />
				          )}
				        </FormItem>
				        <FormItem {...formItemLayout} label="备注"  >
				          {getFieldDecorator('notes', {
				            rules: [{
				              required: true, message: 'Please input your name!',
				            }, {
				              validator: this.checkConfirm,
				            }],
				          })(
				            <Input  />
				          )}
				        </FormItem>
				        
				        <FormItem {...tailFormItemLayout}>
				          <Button type="primary" htmlType="submit" size="large">保存</Button>
				        </FormItem>
				      </Form>
	    		</div>
		  	</Layout>
	  	</div>
      
    );
  },
}));

export default EditAirportForm;
