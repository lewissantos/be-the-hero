// express import
const  express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
// allow to limit the requests to specific domain
app.use(cors()); 
// Transform the body request to JSON
app.use(express.json());
app.use(routes);

// port to listen on localhost
// Usually:
// - Node: 3333
// - React: 3000
app.listen(3333);