import React from 'react';
import { Form, Input, Tooltip, Icon, message, Cascader, Select, Row, Col, Checkbox, Button, Radio } from 'antd';
import Layout from '../common/layout';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
let data = {};

const EditCity = Form.create()(React.createClass({
	getInitialState() {
	  	return {
	      name: '',
	      type: 10
	    };
	  },

	loadDataFromServer: function(){
		var dt = {"id": this.props.params.ttid};
		var url = 'http://114.55.128.237/sshinfo/city/getById.aspx?data='+JSON.stringify(dt);
	  	$.ajax({
	    	url: decodeURIComponent(url),
	        dataType: 'json',
	        success: function(data) {
	        	data.city.latitude = data.city.latitude.toString(); 
	        	data.city.longitude = data.city.longitude.toString(); 
	        	this.props.form.setFieldsValue(data.city);
	        	
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
      	if(this.props.params.ttid){
      		var url = 'http://114.55.128.237/sshinfo/city/add.aspx?data='+JSON.stringify(values);
      	}else{
      		var url = 'http://114.55.128.237/sshinfo/city/update.aspx?data='+JSON.stringify(values);
      	}
	  	$.ajax({
	    	url: decodeURIComponent(url),
	        success: function(data) {
	        	if(data.resultCode == 1){
	        		message.success('操作成功!');
	        	}else{
	        		message.info('操作失败');
	        	}
	        	
	       }.bind(this)
	    });
        
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
    const prefixSelector = getFieldDecorator('id', {
      initialValue: this.props.params.ttid,
    })(
      <Select className="icp-selector">
        <Option value="86">+86</Option>
      </Select>
    );
    return (
    	<div>
      		<Layout title="机场配置" sub_title="城市编辑" route={this.props.route} keys={['5']} menu={['sub2']}  >
	    		<div className="ant-layout-topaside">
	    			<div className="common-top">
	    			<a href={`#/airport/city`}>
	    				<Button type="primary" ><Icon type="left" />Go back</Button></a>
	    			</div>
    				<Form horizontal onSubmit={this.handleSubmit}>
			        
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

			        
			        <FormItem {...formItemLayout} label="位置经度"  >
			          {getFieldDecorator('longitude', {
			            rules: [{
			              required: true, message: '请输入位置经度!',
			            }, {
			              validator: this.checkConfirm,
			            }],
			          })(
			            <Input  />
			          )}
			        </FormItem>
			        <FormItem {...formItemLayout} label="位置纬度"  >
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

export default EditCity;
