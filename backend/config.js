const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


const URI = "mongodb+srv://jayaprakashofficial00:wpx9CJFZmPD3ai7L@cluster0.uxdai.mongodb.net/mydatabase?retryWrites=true&w=majority"; // Add a database name
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});

// Example Route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
