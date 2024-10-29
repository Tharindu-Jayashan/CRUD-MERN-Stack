import React, { useEffect, useState } from 'react';
import './App.css';
import Axios from 'axios';

function App() {

  const [name,setName]=useState('');
  const [age,setAge]=useState('');
  const [country,setCountry]=useState('');
  const [position,setPosition]=useState('');
  const [wage,setWage]=useState('');

  const [employeeList,setemployeeList]=useState([]);

  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);

  useEffect(() => {
    getEmployees();  // Fetch data when the component loads
  }, [])

  const addEmployee =()=> {
    Axios.post('http://localhost:3002/create',{
      name:name,
      age:age,
      country:country,
      position:position,
      wage:wage
    }).then(()=>{
      getEmployees();
    })
  }

  const getEmployees =()=>{
    Axios.get('http://localhost:3002/employees').then((response)=>{
      console.log(response);
      setemployeeList(response.data);
    })
  }

  const updateEmployee = (id) => {

    if (selectedEmployeeId) {
      Axios.put(`http://localhost:3002/update`, {
        id: selectedEmployeeId, // Use the selected employee ID,
        name: name,
        age: age,
        country: country,
        position: position,
        wage: wage
      }).then(() => {
        getEmployees();
      });
    }else{
      console.log("No employee selected for update.");
    }
    
  };

  const selectEmployee = (employee) => {
    // Set the form fields with the selected employee's data
    console.log("Selected Employee:", employee); 
    setName(employee.name);
    setAge(employee.age);
    setCountry(employee.country);
    setPosition(employee.position);
    setWage(employee.wage);
    
    setSelectedEmployeeId(employee.id); // Save the selected employee ID
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3002/delete/${id}`).then(() => {
      getEmployees();
    });
  };

  return (
    <div className="App">
      <div className='form-header'>
        <h2>User Form</h2>
      </div>

    <div className='form'>
       
      <div>
      <label >Name : </label>
      <input type="text" value={name} onChange={(e)=>{setName(e.target.value)}}/>
      </div>
      
      <div>
        <label>Age : </label>
        <input type="text" value={age} onChange={(e)=>{setAge(e.target.value)}}/>
      </div>

      <div>
        <label>Country : </label>
        <input type="text" value={country} onChange={(e)=>{setCountry(e.target.value)}}/>
      </div>

      <div>
        <label>Position : </label>
        <input type="text" value={position} onChange={(e)=>{setPosition(e.target.value)}}/>
      </div>

      <div>
        <label>Wage : </label>
        <input type="number" value={wage} onChange={(e)=>{setWage(e.target.value)}}/>
      </div>

      <div>
        <button onClick={()=>{addEmployee()}}>Submit</button>
      </div>

    </div>

    {/* <button className='button' onClick={()=>{updateEmployee()}}>Update</button>
    <br/><br/>
    <button className='button' onClick={()=>{deleteEmployee(selectedEmployeeId)}}>Delete</button> */}

    <br/><br/><hr/>

    <div className='employee'>
    <button>Show Employee</button>

    <div className='table-show'>
    <table border="">
      <thead>
      <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Country</th>
          <th>Position</th>
          <th>Wage</th>
        </tr>
      </thead>

      <tbody>
      {employeeList.map((val, index)=>{
       return(
        <tr key={index} onClick={()=>{selectEmployee(val);}}>
          <td>{val.name}</td>
          <td>{val.age}</td>
          <td>{val.country}</td>
          <td>{val.position}</td>
          <td>{val.wage}</td>
          <td><button className='button' onClick={()=>{updateEmployee()}}>Update</button></td>
          <td><button className='button' onClick={()=>{deleteEmployee(selectedEmployeeId)}}>Delete</button></td>
        </tr>
       )
    })}
      </tbody>
    </table>
    </div>
    
    </div>
    
    </div>
  );
}

export default App;

