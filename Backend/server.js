
const express = require('express');
const databaseConnect = require('./config/db.config');
const authRoute = require('./routes/auth.route');
const taskRouter = require('./routes/task.route');
const adminRoute = require('./routes/admin.action.route');
require('dotenv').config();
 
const app = express();
var cors = require('cors')


app.use(express.json());  

databaseConnect();  //   Data Base Connection function

app.use(cors()); 

// --------------------   Routes  --------------------



app.get('/test', (req, res) => {
    res.json({msg : `I am Test Router`})
});

app.use('/auth', authRoute);  // Authentication Route

app.use('/task', taskRouter); // Task CURD operation

app.use('/admin', adminRoute); // Admin - Super admin route


app.use((req,res) => {
    res.status(404).json({msg : "Page Not Found !"})
})

// --------------------   Routes  --------------------





// --------------------  Server Start  ---------------------

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server start on PORT : ${PORT}`);
    
})