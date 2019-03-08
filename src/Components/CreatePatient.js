import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'
import CreateCaregiver from './CreateCaregiver'
import AuthService from './AuthService';

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import {Link, Redirect} from 'react-router-dom'

class CreatePatient extends React.Component {

    constructor() {
        super()
        this.state = {
            name: '',                   // VARCHAR
            mobile_no: '',               // INT
            sex: '',                    // VARCHAR
            village_name: '',            // VARCHAR
            date_of_birth: new Date(),     // DATE
            caregivercounter: 1,
            minor: false
        }

        this.Auth = new AuthService();

        this.handleChange = this.handleChange.bind(this)
        this.resetState = this.resetState.bind(this)
        this.handleDateChange = this.handleDateChange.bind(this)
        this.increaseCaregiverCounter = this.increaseCaregiverCounter.bind(this)
        this.decreaseCaregiverCounter = this.decreaseCaregiverCounter.bind(this)
        this.checkBirthdate = this.checkBirthdate.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.componentDidMount = this.componentDidMount.bind(this)
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })  
    }

    handleDateChange(date) {
        
        this.setState({
            date_of_birth: date
        })

        this.checkBirthdate(date)

          
    }

    resetState() {
        this.setState(
            {
                name: '',           // VARCHAR
                mobile_no: '',       // INT
                sex: '',            // VARCHAR
                village_name: '',    // VARCHAR
                date_of_birth: '',     // DATE
                national_id: '',
                caregivercounter: 0,
                redirect: false
            }
        )
    }

    checkBirthdate(date) {
        var today = new Date()
        var dd = today.getDate()
        var mm = today.getMonth() + 1; // Be careful! January is 0.
        var yyyy = today.getFullYear()

        if(yyyy - date.getFullYear()  < 18) {
            this.setState({minor: true})
        } else if (yyyy - date.getFullYear()  === 18) {
            if(date.getMonth() + 1 <= mm ) {
                if(date.getDate()  < dd ) {
                    this.setState({minor: true})
                } else {
                    this.setState({minor: false})
                }
            } else if (date.getMonth() + 1 > mm) {
                this.setState({minor: false})
            }
        } else {
            this.setState({minor: false})
        }

    }
    

    componentDidMount() {

    }

    increaseCaregiverCounter() {
        let caregivercounter = this.state.caregivercounter
        caregivercounter += 1
        this.setState({ caregivercounter: caregivercounter})
    }

    decreaseCaregiverCounter() {
        
        let caregivercounter = this.state.caregivercounter
        if(caregivercounter != 0) {
            caregivercounter -= 1
            this.setState({ caregivercounter: caregivercounter})
        }

    }

    handleSubmit(event) {
        // TODO: Implement validation here.
        event.preventDefault()
        //event.stopPropagation()

        let patient = {
            name:this.state.name,
            national_id:this.props.national_id,
            mobile_no:this.state.mobile_no,
            sex:this.state.sex,
            village_name:this.state.village_name,
            date_of_birth:this.state.date_of_birth
        }

        this.Auth.fetch('http://localhost:3000/patient/', {
                method: 'POST',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(patient)
            }).then(response => {
                this.setState({redirect: true})
                    //this.props.history.push(`/patient/${response.national_id}`);
                })
    }

    render() {
        /*
        let caregiverForms = []
        if(this.state.minor) {
            for(var i=0;i < this.state.caregivercounter;i++){
                caregiverForms.push(
                <CreateCaregiver/>
            )
            if(i === this.state.caregivercounter - 1) {
                caregiverForms.push(<div>
                    <ButtonGroup>
                        <Button variant="success" onClick={this.increaseCaregiverCounter}>Add</Button>
                        <Button variant="danger" disabled={this.state.caregivercounter === 1 ? true : false} onClick={this.decreaseCaregiverCounter}>Remove</Button>
                    </ButtonGroup><hr /></div>)
            }
            }
        } else {
            caregiverForms = []
        }
        */


        return (
        <div style={this.props.createPatient ? {display: ''} : {display: 'none'}}>
            <br />
            <p>Could not find patient with the id {this.props.national_id}.</p>
            <h3>Create the patient?</h3>

            <Form onSubmit={this.handleSubmit}>

                <Form.Group controlId="formStudyID">
                    <Form.Label>National ID</Form.Label>
                    <Form.Control 
                        readOnly 
                        name="national_id" 
                        value={this.props.national_id}
                        onChange={this.handleChange} 
                        type="text" 
                        placeholder={this.props.national_id} 
                    />
                </Form.Group>

                <Button variant="outline-primary" onClick={this.resetState}>Clear form values</Button>

                <br />

                <Form.Group controlId="formName">
                        <Form.Label>Enter patient name</Form.Label>
                        <Form.Control
                            required
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.name}
                            type="description"
                            placeholder="Patient name"
                        /> 
                </Form.Group>

                    <Form.Group controlId="formName">
                        <Form.Label>Enter patient mobile number</Form.Label>
                        <Form.Control
                            required
                            name="mobile_no"
                            onChange={this.handleChange}
                            value={this.state.mobile_no}
                            type="number"
                            placeholder="Patient mobile number"
                        /> 
                    </Form.Group>

                    <fieldset>
                        <Form.Group>
                        <Form.Label>
                            Enter patient sex
                        </Form.Label>
                            <Form.Check
                                required
                                type="radio"
                                label="Male"
                                name="sex"
                                id="formSexMale"
                                value="male"
                                checked={this.state.sex === "male"}
                                onChange={this.handleChange}
                            />
                            <Form.Check
                                type="radio"
                                label="Female"
                                name="sex"
                                id="formSexFemale"
                                value="female"
                                checked={this.state.sex === "female"}
                                onChange={this.handleChange}
                            />
                        </Form.Group>
                    </fieldset>

                    <Form.Group controlId="formName">
                        <Form.Label>Enter patient village name</Form.Label>
                        <Form.Control
                            required
                            name="village_name"
                            onChange={this.handleChange}
                            value={this.state.village_name}
                            type="text"
                            placeholder="Patient village name"
                        /> 
                    </Form.Group>

                    

                    <Form.Group controlId="formDateOfBirth">
                        <Form.Label>Enter patient date of birth</Form.Label>
                        <br></br>
                        <DatePicker
                            selected={this.state.date_of_birth}
                            onChange={this.handleDateChange}
                            name="date_of_birth"
                            type="date"
                            placeholderText="MM/DD/YYYY"
                        />
                    </Form.Group>

                    {/*
                        caregiverForms
                    */}

                    <ButtonToolbar>
                    {
                        this.state.minor ? <Link to={{
                            pathname: '/caregiver',
                            patient: this.state,
                            national_id: this.props.national_id
                        }}>
                            <Button className="float-right" variant="success">
                                Continue
                            </Button>
                        </Link> : <Button variant="primary" type="submit">Create</Button>
                    }
                    
                        
                    </ButtonToolbar>
            </Form>
            {this.state.redirect ? <Redirect
            to={{
              pathname: `patient/${this.props.national_id}`
            }}
        /> : '' }
        </div>
        )
    }
    
}

export default CreatePatient