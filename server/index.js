const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to MongoDB

mongoose.connect('mongodb+srv://admin:0BlCeb1p2bqgbWSm@cluster0.kufjr.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define the Employee Schema and Model
const employeeSchema = new mongoose.Schema({
  name: String,
  age: Number,
  country: String,
  position: String,
  wage: Number,
});

const Employee = mongoose.model('Employee', employeeSchema);

app.listen(3002, () => {
  console.log('Server running at port 3002');
});

// Create an employee
app.post('/create', async (req, res) => {
    try {
      const { name, age, country, position, wage } = req.body;
      const newEmployee = new Employee({ name, age, country, position, wage });
      await newEmployee.save();
      res.send('Employee added successfully');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding employee');
    }
  });
  
  // Read all employees
  app.get('/employees', async (req, res) => {
    try {
      const employees = await Employee.find();
      res.send(employees);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error retrieving employees');
    }
  });
  
  // Update an employee
  app.put('/update', async (req, res) => {
    try {
      const { id, name, age, country, position, wage } = req.body;
      await Employee.findByIdAndUpdate(id, { name, age, country, position, wage });
      res.send('Employee updated');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error updating employee');
    }
  });
  
  // Delete an employee
  app.delete('/delete/:id', async (req, res) => {
    try {
      await Employee.findByIdAndDelete(req.params.id);
      res.send('Employee deleted');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error deleting employee');
    }
  });