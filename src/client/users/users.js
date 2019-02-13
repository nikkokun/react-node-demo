import React, { Component } from 'react';
import Form from './form/form';
import '../app.css';
import Results from './result/results';

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
    };
  }

  componentDidMount() {
    let formReference = React.createRef();
    const userId = parseInt(this.props.match.params.id);

    this.setState({
      form: <Form
        parent={this}
        ref={formReference}
      />,
      formRef: formReference,
      userId: userId
    });

    if (userId > -1) {
      this.executeQuery(userId);
    }
  }

  executeQuery(userId) {
    console.log(userId);
    this.setState({ results: null });
    console.log('ran');
    fetch(`/demo/api/users/${userId}`, {
      mode: 'cors',
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(response => response.json())
      .then((data) => {
        this.state.formRef.current.setState({ isButtonDisabled: false });
        console.log(data);
        this.setState({
          results: <Results data={data.results} parent={this} />,
        });
      });
  }

  queryUser(userId) {
    this.props.history.push(`/users/${userId}`);
    location.reload();
  }

  render() {
    return (
      <body>
        <h1><a href="/demo/users/">Users</a></h1>
        {this.state.form}
        {this.state.results}
      </body>
    );
  }
}
