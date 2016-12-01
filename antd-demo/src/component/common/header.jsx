import React from 'react';
import { Route, Link } from 'react-router';
import { Menu, Icon } from 'antd';

const Header = React.createClass({
  getInitialState() {
  	console.log(this.props);
    return {
      current: 'home'
    };
  },
  handleClick(e) {
    this.setState({
      current: e.key
    });
  },
  render() {
    return (
	      <Menu onClick={this.handleClick}
	      selectedKeys={[this.state.current]}
	      theme={this.state.theme}
	      mode="horizontal">
	        <Menu.Item key="home">
	          <Link to="/"><Icon type="home" />普通表单</Link>
	        </Menu.Item>
	        <Menu.Item key="list">
	          <Link to="/list"><Icon type="bars" />列表翻页</Link>
	        </Menu.Item>
	        <Menu.Item key="about">
	          <Link to="/about"><Icon type="user" />关于</Link>
	        </Menu.Item>
	        <Menu.Item key="me">
	          <Link to="/me"><Icon type="github" />我</Link>
	        </Menu.Item>
	      </Menu>
    );
  },
});

export default Header;
