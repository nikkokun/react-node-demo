import React, { Component } from 'react';
import '../../app.css';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data
    };
    this.parent = props.parent;
  }

  componentDidMount() {
    const id = (<h1>{this.state.data.id}</h1>);
    this.setState({results: id});
  }

  createRow(key, value) {
    const row = (
      <tr>
        <td>
          {key}
        </td>
        <td>
          {value}
        </td>
      </tr>
    );
    return row;
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-8 mx-auto">
            <div className="text-center">
              {this.state.results}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Results;
