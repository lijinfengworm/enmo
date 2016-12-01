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
	{
	  title: '姓名',
	  dataIndex: 'name',
	  render: function (text, record, index) {
	    return <Link to={`/detail/${record.key}`}>{text}</Link>;
	  }
	}, 
	{
	  title: '年龄',
	  dataIndex: 'age'
	}, 
	{
	  title: '住址',
	  dataIndex: 'address'
	},
	{
	  title: '项目组',
	  dataIndex: 'project'
	},
	{
	  title: '电话',
	  dataIndex: 'tel'
	},
	{
	  title: '操作',
	  dataIndex: 'edit',
	  render: function (text, record, index) {
	    return (
	    	<div>
	    		<a onClick={() => deleteUser(record.key, index)} >删除</a>&nbsp;&nbsp;&nbsp;&nbsp;
		    	<a >{record.edit[1]}</a>
	    	</div>
	    );
	    
	  }
	}
];

const UserList = React.createClass({
    componentDidMount: function () {
        this.fetchData();
    },

    fetchData: function () {
        var self = this;
        var url = './test_data/data.json';
        $.getJSON(url, function (dataObj) {
        	$.each(dataObj, function(i, item) {
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
      		<Layout title="用户中心" sub_title="用户列表" route={this.props.route} keys={['1']} menu={['sub1']} >
    		<div className="ant-layout-topaside">
    			<Table columns={columns} dataSource={data}  />
    		</div>
		  	</Layout>
	  </div>
    );
  },
});

export default UserList;
