import React from 'react';
import { Form, Input, Tooltip, Icon, message, Cascader, Select, Row, Col, Checkbox, Button, Radio } from 'antd';
import Layout from '../common/layout';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
let data = {};

const EditRoute = Form.create()(React.createClass({
	contextTypes: {
	    router: React.PropTypes.object
	},
	getInitialState() {
	  	return {
	      name: '',
	      type: 10
	    };
	  },

	loadDataFromServer: function(){
		var dt = {"id": this.props.params.ttid};
		var url = 'http://114.55.128.237/sshinfo/route/getById.aspx?data='+JSON.stringify(dt);
	  	$.ajax({
	    	url: decodeURIComponent(url),
	        dataType: 'json',
	        success: function(data) {
	        	this.props.form.setFieldsValue(data.route);
	        	
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
      		var url = 'http://114.55.128.237/sshinfo/route/add.aspx?data='+JSON.stringify(values);
      	}else{
      		var url = 'http://114.55.128.237/sshinfo/route/update.aspx?data='+JSON.stringify(values);
      	}
	  	$.ajax({
	    	url: decodeURIComponent(url),
	        success: function(data) {
	        	if(data.resultCode == 1){
	        		message.success('操作成功!');
	        		this.context.router.push('route');
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
      		<Layout title="机场配置" sub_title="航线编辑" route={this.props.route} keys={['6']} menu={['sub2']}  >
	    		<div className="ant-layout-topaside">
	    			<div className="common-top">
	    			<a href={`/#/route`}>
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

			        <FormItem
				          {...formItemLayout}
				          label="起飞城市"
				        >
				          {getFieldDecorator('type', {
				            rules: [
				              { required: true, message: 'Please select your style!' },
				            ],
				          })(
				            <Select   placeholder="Please select a country">
				              <Option value="0">上海</Option>
				              <Option value="10" selected>北京</Option>
				              <Option value="20">新郑 </Option>
				            </Select>
				          )}
				    </FormItem>
			        
			        <FormItem
				          {...formItemLayout}
				          label="降落城市"
				        >
				          {getFieldDecorator('type', {
				            rules: [
				              { required: true, message: 'Please select your style!' },
				            ],
				          })(
				            <Select   placeholder="Please select a country">
				              <Option value="0">上海</Option>
				              <Option value="10" selected>北京</Option>
				              <Option value="20">新郑 </Option>
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

export default EditRoute;
