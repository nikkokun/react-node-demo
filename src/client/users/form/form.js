import React, { Component } from 'react';
import '../../app.css';

export default class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      isButtonDisabled: false
    };
    this.parent = props.parent;
  }

  query() {
    this.setState({ isButtonDisabled: true });
    this.parent.queryUser(this.state.userId);
  }

  updateInputValue(event) {
    this.setState({userId: event.target.value});
  }

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-4 mx-auto">
            <div className="text-center">
              <div className='input-group pb-4'>
                <div>
                </div>
                <input className='form-control mx-2 text-lg' onChange={this.updateInputValue.bind(this)} placeholder={'user id'}/>
                <button
                  onClick={this.query.bind(this)}
                  className="btn btn-primary btn-dark"
                  disabled={this.state.isButtonDisabled}
                >
                  QUERY
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
