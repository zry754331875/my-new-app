import React, { Component } from 'react';
import { connect } from "react-redux";

class EmailList extends Component {
  render() {
    return (
      <div style={{backgroundColor:'red'}}>
      EmailList1111
      </div>
    )
  }
};

export default connect()(EmailList)

