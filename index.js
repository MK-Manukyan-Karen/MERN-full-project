const app = require('./app')
const port = process.env.PORT || 5000

app.listen(port, (err) =>{
 if(err){
   throw Error(err)
 }
 console.log(`Node server has been started on ${port}`)
} )