import React from 'react';
import { Table } from 'antd';
import { Link } from 'react-router';

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  render: function (text, record, index) {
    return <Link to={`/detail/${record.key}`}>{text}</Link>;
  }
}, {
  title: '年龄',
  dataIndex: 'age'
}, {
  title: '住址',
  dataIndex: 'address'
}];

const data = [];
for (let i = 0; i < 38; i++) {
  data.push({
    key: i,
    name: 'Arena_' + i,
    age: parseInt(20 + (i / 5)),
    address: '虹口足球场' + i + '号'
  });
}

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

const List = React.createClass({
  render() {
    return (
      <div>
      	<h1>List</h1>
      	<Table columns={columns} dataSource={data} pagination={pagination} />
      </div>
    );
  },
});

export default List;
