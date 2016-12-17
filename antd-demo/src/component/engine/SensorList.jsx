import React from 'react';
import { Link, browserHistory } from 'react-router';
import { Menu, Breadcrumb, Icon, Popconfirm, message, Button, Row, Col } from 'antd';
import { Table } from 'antd';

import Layout from '../common/layout';
import EditableTable from '../common/editTable';

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
	{title: '传感器ID',dataIndex: 'engine_id'},
	{title: '传感器组',dataIndex: 'groupid'},
	{title: '传感器制造商',dataIndex: 'manufacturer'},
	{title: '经纬海',dataIndex: 'xyz'},
	{title: '标签',dataIndex: 'marks'},
	{title: '备注',dataIndex: 'notes'},
	
];

const SensorList = React.createClass({
	
    componentDidMount: function () {
        this.fetchData();
    },
    fetchData: function () {
        var self = this;
        var url = 'http://114.55.128.237/sshinfo/sensorinfo/list.aspx';
        $.getJSON(url, function (dataObj) {
          data = [];
        	$.each(dataObj.list, function(i, item) {
            item['edit'] = "sensor_edit";
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
      	<Layout title="机场配置" sub_title="传感器列表" route={this.props.route} keys={['10']} menu={['sub3']} >
    		<div className="ant-layout-topaside">
          <div className="common-top">
            <Row type="flex" justify="end">
              <Col span={10}></Col>
              <Col span={2}><a href={`#/sensor_edit/0`}><Button className="editable-add-btn" type="primary" >&nbsp;Add&nbsp;&nbsp;</Button></a></Col>
            </Row>
            
          </div>
    			<EditableTable parent_columns={columns} parent_dataSource={data} parent_del_url="http://114.55.128.237/sshinfo/sensorinfo/del.aspx"  />
    		</div>
		  	</Layout>
	  </div>
    );
  },
});

export default SensorList;
