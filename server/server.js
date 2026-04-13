const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/footprintDB')
    .then(() => console.log("Database Connected"))
    .catch(err => console.error(err));

// User Schema 
const User = mongoose.model('User', new mongoose.Schema({
    username: String,
    logs: Array
}));

// Route to get logs
app.get('/api/logs/:username', async (req, res) => {
    const user = await User.findOne({ username: req.params.username });
    res.json(user ? user.logs : []);
});

app.listen(5000, () => console.log("Server active on port 5000"));