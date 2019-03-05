import React from 'react'
import {Button} from 'react-bootstrap'
import AuthService from './AuthService';
import {Link} from 'react-router-dom'

class reviewForm extends React.Component {

    constructor(props) {
        super()
        this.state = {}
        this.handleSubmit = this.handleSubmit.bind(this)
        this.Auth = new AuthService()
    }
    

    handleSubmit(event) {
        event.preventDefault()

        var passedForm = this.props.location.alafForm

        var postForm = {
                description: passedForm.description,                    // VARCHAR
                cough: passedForm.cough,                                // BOOL
                cough_days: passedForm.coughDays,                        // INT
                diarrhoea: passedForm.diarrhoea,                        // BOOL
                diarrhoea_days: passedForm.diarrhoeaDays,                // INT
                blood_in_stool: passedForm.bloodInStool,                  // VARCHAR
                fever: passedForm.fever,                                // INT
                fever_days: passedForm.feverDays,                        // INT
                convulsions: passedForm.convulsions,                    // VARCHAR
                difficult_to_eat_drink: passedForm.difficultToEatDrink,    // BOOL
                cannot_eat_drink: passedForm.cannotEatDrink,              // BOOL
                vomiting: passedForm.vomiting,                          // BOOL
                vomits_everything: passedForm.vomitsEverything,          // BOOL
                red_eyes: passedForm.redEyes,                            // BOOL
                red_eyes_days: passedForm.redEyesDays,                    // INT
                difficulties_to_see: passedForm.difficultiesToSee,        // BOOL
                difficulties_to_see_days: passedForm.difficultiesToSeeDays,// INT
                chest_indraw: passedForm.chestIndraw,                    // VARCHAR
                breathing_freq: passedForm.breathingFreq,                // INT
                sleepy: passedForm.sleepy,                              // VARCHAR
                unconscious: passedForm.unconscious,                    // VARCHAR
                palmar_palor: passedForm.palmarPalor,                    // VARCHAR
                muac: passedForm.muac,                                  // VARCHAR
                swollen_feet: passedForm.swollenFeet,                    // VARCHAR

                submittedForm: false
        }

        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; // Be careful! January is 0.
        var yyyy = today.getFullYear();
        var hh = today.getHours()
        var mi = today.getMinutes()

        if(dd<10) {
            dd = '0'+dd
        } 

        if(mm<10) {
            mm = '0'+mm
        } 

        today = yyyy + '/' + mm + '/' + dd + " " + hh + ":" + mi;

        let visit = {
            symptoms_sheet: postForm,
            patient_id: this.props.location.patient.ID,
            timestamp: today,
            login_id: this.Auth.getUsername()
        }

        this.Auth.fetch('http://localhost:3000/evaluate/', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(visit)
        }).then(response => {
            this.props.history.push(`/visit/${response.id}`);
        })
        

        // TODO: Implement check for errors here.
        
        // TODO: Implemented redirect to view the visit:
        //this.props.history.push(`/patient/${this.props.location.patient.ID}`);
    }

    render() {
        return (
            <div class="container">
            
                <h1>Review entries</h1>

                <h4>Patient</h4>
                <p>{this.props.location.patient.name}</p>

                <h5>Description</h5>
                <p>{this.props.location.alafForm.description}</p>

                <h5>Is the patient coughing?</h5>
                <p>{this.props.location.alafForm.cough  ? 'Yes' : 'No'}</p>

                <h5>For how many days has the patient been coughing?</h5>
                <p>{this.props.location.alafForm.coughDays}</p>

                <h5>Does the patient have diarrhoea?</h5>
                <p>{this.props.location.alafForm.diarrhoea  ? 'Yes' : 'No'}</p>

                <h5>How many days has the patient had diarrhoea?</h5>
                <p>{this.props.location.alafForm.diarrhoeaDays}</p>

                <h5>Does the patient have blood in stool?</h5>
                <p>{this.props.location.alafForm.bloodInStool}</p>

                <h5>What body temperature does the patient have?</h5>
                <p>{this.props.location.alafForm.fever}</p>

                <h5>If the patient has fever, how many days has the patient had a fever?</h5>
                <p>{this.props.location.alafForm.feverDays}</p>

                <h5>Does the patient have convulsions?</h5>
                <p>{this.props.location.alafForm.convulsions}</p>

                <h5>Does the patient have difficulties eating or drinking?</h5>
                <p>{this.props.location.alafForm.difficultToEatDrink  ? 'Yes' : 'No'}</p>

                <h5>Is the patient unable to eat and/or drink?</h5>
                <p>{this.props.location.alafForm.cannotEatDrink ? 'Yes' : 'No'}</p>

                <h5>Does the patient vomit?</h5>
                <p>{this.props.location.alafForm.vomiting  ? 'Yes' : 'No'}</p>

                <h5>Does the patient vomit everything?</h5>
                <p>{this.props.location.alafForm.vomitsEverything  ? 'Yes' : 'No'}</p>

                <h5>Does the patient have red eyes?</h5>
                <p>{this.props.location.alafForm.redEyes  ? 'Yes' : 'No'}</p>

                <h5>If the patient has red eyes, how many days has the patient had red eyes for?</h5>
                <p>{this.props.location.alafForm.redEyesDays}</p>

                <h5>Does the patient have difficulties to see?</h5>
                <p>{this.props.location.alafForm.difficultiesToSee  ? 'Yes' : 'No'}</p>

                <h5>If the patient has difficulties seeing, how many days has the patient had difficulties seeing?</h5>
                <p>{this.props.location.alafForm.difficultiesToSeeDays}</p>

                <h5>Is the patient's chest indrawn?</h5>
                <p>{this.props.location.alafForm.chestIndraw}</p>

                <h5>What is the patient breathing frequency?</h5>
                <p>{this.props.location.alafForm.breathingFreq}</p>

                <h5>Is the patient sleepy?</h5>
                <p>{this.props.location.alafForm.sleepy}</p>

                <h5>Is the patient unconscious?</h5>
                <p>{this.props.location.alafForm.unconscious}</p>

                <h5>Does the patient have Palmar Pallor?</h5>
                <p>{this.props.location.alafForm.palmarPalor}</p>

                <h5>What is the patient middle upper arm circumference?</h5>
                <p>{this.props.location.alafForm.muac}</p>

                <h5>Does the patient have swollen feet?</h5>
                <p>{this.props.location.alafForm.swollenFeet}</p>

                <Link to={{ pathname:'/alaf/', state: { patient: this.props.location.patient, alafForm: this.props.location.alafForm } }}>
                    <Button className="float-left" variant="secondary">
                        Back to edit form
                    </Button>
                </Link>

                <Button className="float-right" variant="primary" type="submit" onClick={this.handleSubmit}>
                        Submit form
                </Button>

            </div>
        )
    }

}

export default reviewForm