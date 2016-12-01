import React from 'react';

const Detail = React.createClass({
  render() {
    return (
      <div>
      	<h1>Detail</h1>
      	{this.props.params.ttid}
      </div>
    );
  },
});

export default Detail;
