const app = require('./app');
const port = process.env.PORT || 9090

app.listen(port, () => console.log(`Example app listening on port ${port}!`))