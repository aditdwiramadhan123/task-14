const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const home = require("./src/controllers/homeControler")
const contact = require ("./src/controllers/contactControler")
const project = require ("./src/controllers/projectControler")
const testimoni = require ("./src/controllers/testimoniControler")




// setting
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

// setting middleware
app.use("/assets", express.static(path.join(__dirname, "./assets")));
app.use(express.urlencoded({ extended: false }));


// route
app.get("/", home);
app.get("/contactMe", contact);
app.get("/project", project.get);

app.post("/addProject", project.add.post);
app.get("/addProject", project.add.get);

app.get("/project/:id", project.view.viewProjectGet);

app.post("/delete/:id", project.del.post);

app.get("/edit/:id",project.edit.get)
app.post("/edit/:id", project.edit.post);

app.get("/testimoni", testimoni);

app.listen(port, () => {
  console.log(`server runing in port ${port}`);
});
