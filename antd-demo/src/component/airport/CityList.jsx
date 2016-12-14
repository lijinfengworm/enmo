import React from 'react';
import { Link } from 'react-router';
import { Menu, Breadcrumb, Icon, Popconfirm, message, Button, Row, Col } from 'antd';
import { Table } from 'antd';

import Layout from '../common/layout';


let data = [];

const pagination = {
  total: data.length,
  current: 1,
  pageSize: 20,
  showSizeChanger: true,
  onShowSizeChange: function (current, pageSize) {
    console.log('Current: ', current, '; PageSize: ', pageSize);
  },
  onChange: function (current) {
    console.log('Current: ', current);
  }
};
const columns = [
	{title: '编号', dataIndex: 'id'}, 
	{title: '名称',dataIndex: 'name'},
	{title: '位置经度',dataIndex: 'longitude'},
	{title: '位置纬度',dataIndex: 'latitude'},
	{
	  title: '操作',
	  dataIndex: 'edit',
	  render: function (text, record, index) {
	    return (
	    	<div>
          <Popconfirm title="确定要删除此纪录?" onConfirm={() => deleteUser(record.id, index)} onCancel={cancel} okText="Yes" cancelText="No"><a href="#">Delete</a></Popconfirm>
	    		&nbsp;&nbsp;&nbsp;&nbsp;
		    	<a href={`#/city_edit/${record.id}`}>编辑</a>
	    	</div>
	    );
	    
	  }
	}
];
function deleteUser(key, index){
  //删除用户操作
  var del = {'id': key};
  var url = 'http://114.55.128.237/sshinfo/city/del.aspx?data='+JSON.stringify(del);
  $.ajax({
    url: decodeURIComponent(url),
      dataType: 'json',
      success: function(data) {
        if(data.resultCode == 1){
          message.success('删除成功!');
        }else{
          message.info('删除失败');
        }
     }.bind(this)
  });
}
function cancel() {
  
}
const CityList = React.createClass({
    componentDidMount: function () {
        this.fetchData();
    },

    fetchData: function () {
        var self = this;
        var url = 'http://114.55.128.237/sshinfo/city/list.aspx';
        $.getJSON(url, function (dataObj) {
        	data = [];
        	$.each(dataObj, function(i, item) {
        		console.log(item);
        		data.push(item);
        	});
            self.setState({
                data: data
            });
        });
    },
    

  render() {
    return (
      <div>
      	<Layout title="机场配置" sub_title="城市列表" route={this.props.route} keys={['5']} menu={['sub2']} >
    		<div className="ant-layout-topaside">
          <div className="common-top">
            <Row type="flex" justify="end">
              <Col span={10}></Col>
              <Col span={2}><a href={`#/city_edit/0`}><Button className="editable-add-btn" type="primary" >&nbsp;Add&nbsp;&nbsp;</Button></a></Col>
            </Row>
            
          </div>
    			<Table columns={columns} dataSource={data}  />
    		</div>
		  	</Layout>
	  </div>
    );
  },
});

export default CityList;
