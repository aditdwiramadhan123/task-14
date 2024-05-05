const generalService = require("../service/generalService");
const handleData = require("../service/handleData");

let data = [];

// Menampilkan halaman proyek
async function getProjects(req, res) {
  let dataDb = await generalService.getAllProject();
  let data = handleData.getViewData(dataDb);

  res.render("myProject", { data });
}

// Menampilkan halaman penambahan proyek
function addProjectGet(req, res) {
  res.render("addProject");
}

// Menambahkan proyek
async function addProjectPost(req, res) {
  let dataForm = req.body;
  let validateData = handleData.validateData(dataForm);
  if (!validateData.valid) {
    console.log("data tidak valid");
  } else {
    await generalService.postProject(validateData.data);
    res.redirect("/project");
  }
}

// Menampilkan halaman edit proyek
async function editProjectGet(req, res) {
  let id = parseInt(req.params.id);
  let dataDB = await generalService.getOneProject(id);
  let data = handleData.getViewData(dataDB)[0];
  res.render("editProject", { data });
}

// Mengedit proyek
async function editProjectPost(req, res) {
  let dataForm = req.body;
  let id = parseInt(req.params.id);
  let validateData = handleData.validateData(dataForm);
  if (!validateData.valid) {
    console.log("data tidak valid");
  } else {
    await generalService.updateProject(id, validateData.data);
    res.redirect('/project')
  }
}

// Menghapus proyek
async function deleteProjectPost(req, res) {
  let id = parseInt(req.params.id);
  await generalService.deleteProject(id);
  res.redirect("/project");
}

// Menampilkan halaman detail proyek
async function viewProjectGet(req, res) {
  let id = parseInt(req.params.id);
  let dataDB = await generalService.getOneProject(id);
  let data = handleData.getViewData(dataDB)[0];
  console.log(data);
  res.render("detilProject", { data });
}

// Objek untuk mengekspor fungsi-fungsi
const projectController = {
  get: getProjects,
  add: {
    get: addProjectGet,
    post: addProjectPost,
  },
  edit: {
    get: editProjectGet,
    post: editProjectPost,
  },
  del: {
    post: deleteProjectPost,
  },
  view: {
    viewProjectGet: viewProjectGet,
  },
};

module.exports = projectController;
