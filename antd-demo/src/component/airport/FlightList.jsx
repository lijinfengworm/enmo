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

	{title: '航班号', dataIndex: 'id'}, 
	{title: '航线id', dataIndex: 'route_id'}, 
	{title: '航班公司', dataIndex: 'airline_id'}, 
	{title: '起飞时间', dataIndex: 'takeOffTime'}, 
	{title: '到达时间', dataIndex: 'landTime'}, 
	{title: '航班跨天天数', dataIndex: 'across_days'}, 
	{title: '标签', dataIndex: 'marks'}, 
	{title: '备注', dataIndex: 'notes'}, 
	{
	  title: '操作',
	  dataIndex: 'edit',
	  render: function (text, record, index) {
	    return (
	    	<div>
	    		<a onClick={() => deleteUser(record.key, index)} >删除</a>&nbsp;&nbsp;&nbsp;&nbsp;
		    	<a href={`#/airport/edit/${record.key}`}>{record.edit[1]}</a>
	    	</div>
	    );
	    
	  }
	}
];

const FlightList = React.createClass({
    componentDidMount: function () {
        this.fetchData();
    },

    fetchData: function () {
        var self = this;
        var url = './test_data/airport_list.json';
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
      		<Layout title="机场配置" sub_title="航班配置" route={this.props.route} keys={['7']} menu={['sub2']} >
    		<div className="ant-layout-topaside">
    			<Table columns={columns} dataSource={data}  />
    		</div>
		  	</Layout>
	  </div>
    );
  },
});

export default FlightList;
