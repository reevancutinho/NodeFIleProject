import express from "express";
import fs from "fs";
import path from "path";
const app = express();

// process.cwd will return the current directory of the process
const root = process.cwd();

// Port number
const PORT = 3000;


app.get('/', function(request, response) {

  let filedata = "";
  filedata += "<a href=\"/read\">Read Files</a> \n"
  filedata += "<a href=\"/create\">Create Files</a>"
  response.set('Content-Type', 'text/html');
  response.send(filedata);
})

//API endpoints to read the files

app.get('/read', function(request, response){

  fs.readdir(path.join(root, "files/"), "utf-8", (err, data) => {
      if(err){
          console.error(err);
          return;
      }
      response.send(data);
  })

})

//API endpoints to create file
app.get('/create', function (request, response) {
  // Get current time and date
  const today = new Date();
  let current_date = `${today.getDate()}-${today.toLocaleString("en-IN", {
      month: "long",
    })}-${today.getFullYear()}`;
  let current_time = `${today.getHours()}-${today.getMinutes()}`;
    const fileName = current_date+" "+current_time+".txt"

    response.send('File created with the filename -> ' + fileName + '<br> <a href="/">Home page</a>');

    // Create file with current date and time as file name
    fs.writeFile(path.join(root, "files/"+fileName), today.toLocaleString(), (err) => {
        if (err) throw err;
        console.log('File is Created');
    })
})

app.listen(PORT, () => console.log("Server started in "+PORT))