import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import CreatePatient from './CreatePatient'
import ScreeningForm from './ScreeningForm'
import { Route, Switch, Redirect } from 'react-router-dom'
import AuthService from './AuthService';

class PatientFind extends React.Component {

    constructor(props) {
        super()
        this.state = {
            nationalID: '',
            createPatient: false,
            foundPatient: null
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleStudyIDChange = this.handleStudyIDChange.bind(this)

        this.Auth = new AuthService();
    }

    handleSubmit(event) {

        // Gretchen, stop trying to make fetch happen! It's not going to happen!
        this.Auth.fetch(`http://localhost:3000/patient/nationalid/${this.state.nationalID}`)
        .then(
          (result) => {
              console.log(result)
              this.setState({
              //isLoaded: true,
              foundPatient: result
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
              console.log(error)
            this.setState({
              //isLoaded: true,
              createPatient: true,
              error
            });
          })
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })  
    }

    handleStudyIDChange(event) {
        this.handleChange(event)
        this.setState({createPatient: false})
    }

    render() {
        return (
            <div class="container">
            {
              this.Auth.loggedIn() ? '' : <Redirect to='/login' />
            }
                <h1>Patient search</h1>

                <Form>
                    <Form.Group controlId="formNationalID">
                        <Form.Label>Find patient via National ID</Form.Label>
                        <Form.Control 
                            name="nationalID" 
                            value={this.state.nationalID} 
                            onChange={this.handleStudyIDChange} 
                            type="number"
                            placeholder="Enter national ID"
                        />
                    </Form.Group>

                    <Button variant="primary" type="button" onClick={this.handleSubmit}>Search</Button>
                </Form>


                {
                   this.state.foundPatient === null ? '' : <Redirect to={{
                    pathname: `/patient/${this.state.nationalID}`
                    }}
                    />
                }

                

                <CreatePatient 
                    createPatient={this.state.createPatient}
                    nationalID={this.state.nationalID}
                />

                
            </div>
        )
    }
}

export default PatientFind