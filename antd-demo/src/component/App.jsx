import React from 'react';
import { Link } from 'react-router';
import { Form, Icon, Input, Button, Checkbox ,Row, Col, message } from 'antd';
import { browserHistory } from 'react-router'
const FormItem = Form.Item;
import Home from './Home';

const App = Form.create()(React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  render() {
    return (
      <div key="b" className="clearfix" style={{ minHeight:500,paddingTop:20 }}>
          {this.props.children || <Home />}
      </div>
    );
  },
}));

export default App;
