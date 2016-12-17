import React from 'react';
import { Link } from 'react-router';
import { Table, Input, Icon, Button, Popconfirm, message } from 'antd';

class EditableCell extends React.Component {
  state = {
    value: this.props.value,
    editable: false,
  }
  handleChange = (e) => {
    const value = e.target.value;
    this.setState({ value });
  }
  check = () => {
    this.setState({ editable: false });
    if (this.props.onChange) {
      this.props.onChange(this.state.value);
    }
  }
  edit = () => {
    this.setState({ editable: true });
  }
  render() {
    const { value, editable } = this.state;
    return (<div className="editable-cell">
      {
        editable ?
        <div className="editable-cell-input-wrapper">
          <Input
            value={value}
            onChange={this.handleChange}
            onPressEnter={this.check}
          />
          <Icon
            type="check"
            className="editable-cell-icon-check"
            onClick={this.check}
          />
        </div>
        :
        <div className="editable-cell-text-wrapper">
          {value || ' '}
          <Icon
            type="edit"
            className="editable-cell-icon"
            onClick={this.edit}
          />
        </div>
      }
    </div>);
  }
}

class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.props.parent_columns[this.props.parent_columns.length-1] = {};
    this.props.parent_columns[this.props.parent_columns.length] = {
    	title: 'operation',
	    dataIndex: 'operation',
	    render: (text, record, index) => {
	        return (<div>
	            <Popconfirm title="Sure to delete?" onConfirm={this.onDelete(index, `${record.id}`)}>
	              <a href="#">Delete</a>
	            </Popconfirm>&nbsp;&nbsp;&nbsp;&nbsp;
	            <a href={`#/${record.edit}/${record.id}`}>编辑</a>
	        </div>)
      }
    }
    for(var i = 0; i < this.props.parent_columns.length; i++){
      if(this.props.parent_columns[i].dataIndex == null){
        this.props.parent_columns.splice(i,1);
      }
    }
    this.columns = this.props.parent_columns;

    this.state = {
      dataSource: this.props.parent_dataSource,
    };
  }
  onCellChange = (index, key) => {
    return (value) => {
      const dataSource = [...this.state.dataSource];
      dataSource[index][key] = value;
      this.setState({ dataSource });
    };
  }
  onDelete = (index, id) => {
    return () => {
      const dataSource = this.props.parent_dataSource;
      var del = {'id': id};
	  var url = this.props.parent_del_url+'?data='+JSON.stringify(del);
	  $.ajax({
	    url: decodeURIComponent(url),
	      dataType: 'json',
	      success: function(data) {
	        if(data.resultCode == 1){
	          dataSource.splice(index, 1);
      		  this.setState({ dataSource: dataSource });
	          message.success('删除成功!');
	        }else{
	          message.info('删除失败');
	        }
	     }.bind(this)
	  });
      
    };
  }
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`,
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1,
    });
  }
  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (<div>
      <Table bordered dataSource={this.props.parent_dataSource} columns={columns} />
    </div>);
  }
}
export default EditableTable;