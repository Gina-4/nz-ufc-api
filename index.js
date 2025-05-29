import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());

// Connect to MongoDB Atlas
const uri = "mongodb+srv://georginariri4:1ziQIMmCKy3t4HkL@cluster0.u1qlb9u.mongodb.net/nz_ufc_test?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri);

// Define Student schema
const fighterSchema = new mongoose.Schema({
  name: String,
  nickname: String,
  weightClass: String,
  wins: Number,
  losses: Number,
  isActive: Boolean,
  hometown: String,
  fightingStyles: Array
  }
);

const Fighter = mongoose.model('Fighter', fighterSchema);

// API Endpoints
app.get('/fighters', async (req, res) => {
  const fighters = await Fighter.find();
  res.json(fighters);
});

app.post('/fighters', async (req, res) => {
  const fighters = new Fighter (req.body);
  await fighters.save();
  res.json(fighters);
});

app.get('/fighters/:id', async (req, res) => {
  const fighters = await Fighter.findById(req.params.id);
  res.json(fighters);
});
app.get('/fighters/active', async (req, res) => {
  const fighters = await Fighter.find({ isActive: true});
  res.json(fighters);
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});