import React from 'react';
import { Link } from 'react-router';
import { Affix, Menu, Breadcrumb, Icon } from 'antd';
import BrowserDemo from '../../../site/theme/template/BrowserDemo';
const SubMenu = Menu.SubMenu;


const Layout = React.createClass({
  getDefaultProps() {
    return {
      keys: ['1'],
      menu: ['sub1']
    };
  },
  getInitialState() {
    const keys = this.props.keys;
    const menu = this.props.menu;
    return {
      defaultOpenKeys: menu,
      defaultSelectedKeys: keys,
    };
  },
  handleClick(e) {
    this.setState({
      current: e.key
    });
  },
  render() {
    return (
	      <BrowserDemo>
	      	<div className="ant-layout-topaside">
		      <div className="ant-layout-header">
		        <div className="ant-layout-wrapper">
		          <div className="ant-layout-logo"></div>
		          <Menu theme="dark" mode="horizontal"
		            defaultSelectedKeys={['top1']} style={{lineHeight: '64px'}}>
		            <Menu.Item key="top1"><Link to="/list">导航一</Link></Menu.Item>
		            <Menu.Item key="top2"><Link to="/">导航二</Link></Menu.Item>
	            	<Menu.Item key="top3"><Link to="/">导航三</Link></Menu.Item>
		          </Menu>
		        </div>
		      </div>
		      
		      <div className="ant-layout-wrapper">
		        <div className="ant-layout-breadcrumb">
		          <Breadcrumb>
		            <Breadcrumb.Item>首页</Breadcrumb.Item>
		            <Breadcrumb.Item>{this.props.title}</Breadcrumb.Item>
		            <Breadcrumb.Item>{this.props.sub_title}</Breadcrumb.Item>
		          </Breadcrumb>
		        </div>
		        <div className="ant-layout-container">
		          <aside className="ant-layout-sider">
		            <Menu mode="inline" defaultSelectedKeys={this.state.defaultSelectedKeys} defaultOpenKeys={this.state.defaultOpenKeys} >
		              <SubMenu key="sub1" title={<span><Icon type="user" />用户中心</span>}>
		                <Menu.Item key="1"><Link to="/user">用户列表</Link></Menu.Item>
		                <Menu.Item key="2"><Link to="/auth">权限设置</Link></Menu.Item>
		              </SubMenu>
		              <SubMenu key="sub2" title={<span><Icon type="laptop" />机场配置</span>}>
		                <Menu.Item key="5"><Link to="city">城市列表</Link></Menu.Item>
		                <Menu.Item key="6"><Link to="route">航线配置</Link></Menu.Item>
		                <Menu.Item key="7"><Link to="flight">航班配置</Link></Menu.Item>
		                <Menu.Item key="8"><Link to="aircraft">飞机配置</Link></Menu.Item>
		              </SubMenu>
		              <SubMenu key="sub3" title={<span><Icon type="notification" />发动机配置</span>}>
		                <Menu.Item key="9">发动机</Menu.Item>
		                <Menu.Item key="10"><Link to="sensor">传感器</Link></Menu.Item>
		                <Menu.Item key="11"><Link to="sensorgroup">传感器组</Link></Menu.Item>
		              </SubMenu>
		            </Menu>
		          </aside>
		          <div className="ant-layout-content">
		            <div>
		              <div style={{clear: 'both'}}>{this.props.children}</div>
		            </div>
		          </div>
		        </div>
		        <div className="ant-layout-footer">
		        Ant Design 版权所有 © 2015 由kworm提供和支持
		        </div>
		      </div>
		    </div>
	      </BrowserDemo>
    );
  },
});

export default Layout;
