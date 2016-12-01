import React from 'react';
import { Link } from 'react-router';
import { Menu, Breadcrumb, Icon } from 'antd';

const SubMenu = Menu.SubMenu;

import Layout from '../common/layout';

const Auth = React.createClass({
  render() {
    return (
      <div>
      		<Layout title="用户中心" sub_title="权限设置" route={this.props.route} keys={['2']} menu={['sub1']} >
	    		<div className="ant-layout-topaside">
	    				这是个权限管理的列表
	    		</div>
		  	</Layout>
	  </div>
    );
  },
});

export default Auth;
