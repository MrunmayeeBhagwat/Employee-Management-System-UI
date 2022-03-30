import React, { Component } from 'react';
import EmployeeService from '../services/EmployeeService';


//create classes using rcc- install react snippets
class ListEmployeeComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = {                              //state is a plain javascript object and contains data specific to the component 
            employees : []   //initialise an array
        }
        this.addEmployee = this.addEmployee.bind(this);
        this.editEmployee = this.editEmployee.bind(this);
        this.deleteEmployee = this.deleteEmployee.bind(this);
    }

    editEmployee(id){
       this.props.history.push(`/add-employee/${id}`);
    }

    viewEmployee(id){
        this.props.history.push(`/view-employee/${id}`);
    }

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then((res) => {
            this.setState({employees : this.state.employees.filter(employee => employee.id !== id)});
          });
     }

    componentDidMount(){
        EmployeeService.getEmployees().then((res) => {    //returns a promise
          this.setState({employees : res.data});
        });
    }

    addEmployee(){
        this.props.history.push('/add-employee/_add');
    }

    render() {
        return (
            <div>
              <h2 className="text-center">Employees List</h2>
              {/* <div className= "row"> */}
              <div>
                  <button onClick={this.addEmployee} className= "btn btn-primary"> Add Employee </button>
              </div>
              <br></br>
              <div className= "row">
                  <table className= "table table-striped table-bordered">
                      
                      <thead>
                          <tr>
                          <th>Employee First Name</th>
                          <th>Employee Last Name</th>
                          <th>Employee Email ID</th>
                          <th>Actions</th>
                          </tr>
                          
                      </thead>
                      <tbody>
                          {
                              this.state.employees.map(
                                  employee =>
                                  <tr key = {employee.id}>
                                      <td> {employee.firstName} </td>
                                      <td> {employee.lastName} </td>
                                      <td> {employee.emailId} </td>
                                      <td>
                                          <button onClick = { () => this.editEmployee(employee.id)} className="btn btn-info"> Update </button>
                                          <button style = {{marginLeft: "10px"}} onClick = { () => this.deleteEmployee(employee.id)} className="btn btn-danger"> Delete </button>
                                          <button style = {{marginLeft: "10px"}} onClick = { () => this.viewEmployee(employee.id)} className="btn btn-info"> View </button>
                                      </td>
                                  </tr>
                              )
                          }
                      </tbody>
                  </table>
              </div>
            </div>
        );
    }
}

export default ListEmployeeComponent;
