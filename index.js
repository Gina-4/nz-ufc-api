import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

// Connect to MongoDB Atlas
const uri = "mongodb+srv://georginariri4:1ziQIMmCKy3t4HkL@cluster0.u1qlb9u.mongodb.net/nz_ufc_test?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri);

// Define Student schema
const studentSchema = new mongoose.Schema({
  name: (String),
  nickname: (String),
  weightClass: (String),
  wins: (Number),
  losses: (Number),
  isActive: (Boolean, true),
  hometown: (String),
  fightingStyles: (Array)
  }
);

const Student = mongoose.model('Student', studentSchema);

// API Endpoints
app.get('/fighters', async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

app.post('/fighters', async (req, res) => {
  const student = new Student(req.body);
  await student.save();
  res.json(student);
});

app.get('/fighters/:id', async (req, res) => {
  const student = await Student.findById(req.params.id);
  res.json(student);
});
app.get('/fighters/weightclass/:weightClass', async (req, res) => {
  const student = await Student.findById(req.params.weightClass);
  res.json(student);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});