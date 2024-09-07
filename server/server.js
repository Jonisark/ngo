
// require('dotenv').config();

// const express = require('express');
// const cors = require('cors');
// const app = express();
// const PORT = 5000;
// const router = require('./router/auth.router');
// const connectDb = require('./utils/db');
// const ErrorMiddlewere = require('./middlewere/ErrorMiddlewere')

// const corsOptions = {
//   origin: 'http://localhost:5173',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   Credential: true,
//   optionsSuccessStatus: 204,
// }

// app.use(cors(corsOptions))
// app.use(express.json())
// app.use('/api/auth/',router)
// app.use(ErrorMiddlewere)

// connectDb().then(() => {
//   app.listen(PORT, () => {
//     console.log('server is live on port ' + PORT)
// })  
// });
require('dotenv').config()
const express = require('express');
const router = require('./router/auth.router');
const connectDB = require('./utils/db');
const admin = require('./router/admin-router')
const cors = require('cors');
const app = express()
const PORT = 5000;

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'],
  credentials: true
}));

app.use(express.json())
app.use('/api/auth/',router)
app.use('/api/admin',admin)

connectDB().then(() => {
  app.listen(PORT,() => {
  console.log('the server is on localhost ' + 5000)
});
})







