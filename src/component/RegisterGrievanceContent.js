import React from 'react'
import { Fragment } from 'react'
import {Form,Input, Select, Button} from 'element-react'
export default class RegisterGrievanceContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          form: {
            name: '',
            phone: '',
            email: '',
            subject: '',
            issue: ''
          }
        };
      }
      

    onSubmit(e) {
        e.preventDefault();
      }
      
      onChange(key, value) {
        this.state.form[key] = value;
        this.forceUpdate();
      }
      render(){
    return (
     
        <Fragment>
            <div className="about-us-wrapper">
                <div className="inside-wrapper">
                    <h3>Register Grievances / Issues</h3>
                    <div className=" container-grievance">
                        <Form className="en-US" model={this.state.form} labelWidth="120" onSubmit={this.onSubmit.bind(this)}>
                             <div className="row">
                             <div className="col-6">
                             
                                <label>Name</label>
                                <Input value={this.state.form.name} onChange={this.onChange.bind(this, 'name')}></Input>
                             </div>
                                <div className="col-6">
                            <label>Phone</label>
                                <Input value={this.state.form.phone} onChange={this.onChange.bind(this, 'phone')}></Input>
                                </div>
                             </div>
                            <label>Email</label>
                            <Input value={this.state.form.email} onChange={this.onChange.bind(this, 'email')}></Input>
                         
                         
                            <label>Subject</label>
                            <Input value={this.state.form.subject} onChange={this.onChange.bind(this, 'subject')}></Input>
                       
                            
                            <label>Issue / Grievance</label>
                                <Input type="textarea" value={this.state.form.issue} onChange={this.onChange.bind(this, 'issue')}></Input>
                           
                                <label>Upload Document</label>
                                <input type="file" id="fileControl" accept="application/pdf"  >
                                </input>
                                
                                <br/>
                                <Button type="primary" nativeType="submit">Submit</Button>
                                
                            </Form>
                    </div>
                </div>
            </div>
        </Fragment>
    )}
}
