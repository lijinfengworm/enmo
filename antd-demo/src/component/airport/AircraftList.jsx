import React from 'react';
import { Link } from 'react-router';
import { Menu, Breadcrumb, Icon } from 'antd';
import { Table } from 'antd';

import Layout from '../common/layout';

var deleteUser = function(key, index){
	//删除用户操作
	console.log(key);
}
const data = [];

const pagination = {
  total: data.length,
  current: 1,
  pageSize: 5,
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
	{title: '当前航线编号',dataIndex: 'route_id'},
	{title: '当前航班',dataIndex: 'airLine'},
	{title: '现处位置经度',dataIndex: 'nowLong'},
	{title: '现处位置纬度',dataIndex: 'nowLat'},
	{title: '制造商',dataIndex: 'manufacturer '},
	{title: '标签',dataIndex: 'marks'},
	{title: '备注',dataIndex: 'notes'},
	{
	  title: '操作',
	  dataIndex: 'edit',
	  render: function (text, record, index) {
	    return (
	    	<div>
	    		<a onClick={() => deleteUser(record.id, index)} >删除</a>&nbsp;&nbsp;&nbsp;&nbsp;
		    	<a href={`#/airport/edit/${record.id}`}>编辑</a>
	    	</div>
	    );
	    
	  }
	}
];

const AircraftList = React.createClass({
    componentDidMount: function () {
        this.fetchData();
    },

    fetchData: function () {
        var self = this;
        var url = 'http://114.55.128.237/sshinfo/aircraft/list.aspx';
        $.getJSON(url, function (dataObj) {
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
      		<Layout title="机场配置" sub_title="飞机列表" route={this.props.route} keys={['8']} menu={['sub2']} >
    		<div className="ant-layout-topaside">
    			<Table columns={columns} dataSource={data}  />
    		</div>
		  	</Layout>
	  </div>
    );
  },
});

export default AircraftList;
