import React from 'react'
import {Form, Button, Alert} from 'react-bootstrap'
import AuthService from './AuthService';

class Login extends React.Component {

    constructor() {
        super()
        this.state = {
            login_id: '',
            password: '',
            validated: false,
            loginMessage: null
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)

        this.Auth = new AuthService();
    }

    handleChange(event) {
        const target = event.target
        const value = target.type === 'checkbox' ? target.checked : target.value
        const name = target.name

        this.setState({
            [name]: value
        })  
    }

    handleSubmit(event) {
        
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        this.setState({ validated: true });

        console.log(
            JSON.stringify({
                "username": this.state.login_id,
                "password": this.state.password
            })
        )

        // Fetch JWT token.
        fetch('http://localhost:3000/login', {
            method: 'POST',
            body: JSON.stringify({
                "username": this.state.login_id,
                "password": this.state.password
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            if (res.status === 200) {
              this.props.history.push('/');
            } else {
              const error = new Error(res.error);
              throw error;
            }
          })
          .catch(err => {
            console.error(err);
            alert('Error logging in please try again');
          });
      }

      handleClick() {
        // Make sure loginMessage is removed before attempting to login:
        this.setState({loginMessage: null})

          // Fetch JWT token.
         this.Auth.login(this.state.login_id, this.state.password)
         .then(res =>{
            this.props.history.replace('/');
         })
         .catch(err =>{
             console.log(err);
             this.setState({loginMessage: 'Could not log you in. Make sure you enter a correct username and password.'})
         })
        
}


    render() {
        const { validated } = this.state;
        return (
            <div class="container">
            <h1>Log in</h1>
                <Form 
                    noValidate
                    validated={validated}
                    onSubmit={e => this.handleSubmit(e)}
                >
            <Form.Label>Login ID</Form.Label>
                <Form.Control
                    required
                    name="login_id"
                    onChange={this.handleChange}
                    value={this.state.login_id}
                    type="text"
                    placeholder="Enter login ID"
                />
                <Form.Label>Password</Form.Label>
                <Form.Control
                    required
                    name="password"
                    onChange={this.handleChange}
                    value={this.state.password}
                    type="password"
                    placeholder="Enter password"
                />
                <br />
                <Button variant="primary" onClick={this.handleClick}>
                        Login
                </Button>
            
      </Form>

      <br />
      {this.state.loginMessage != undefined ?
        <Alert dismissible variant="danger">
        <Alert.Heading>Error</Alert.Heading>
        <p>{this.state.loginMessage}</p>
        </Alert> : ''}

      </div>
        )
    }
    
}

export default Login