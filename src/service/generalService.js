const { Sequelize, QueryTypes } = require("sequelize");
const config = require("../../config/config.json");
const sequelize = new Sequelize(config.development);

// get one from tb myproject
async function getOneProject(id) {
  let query = `SELECT * FROM "MyProjects" WHERE id=${id}`;
  const getOne = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  return getOne;
}

// get all from tb myproject
async function getAllProject() {
  let query = 'SELECT * FROM "MyProjects"';
  const getAll = await sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  return getAll;
}

// post data to tb myproject
async function postProject(payload) {
  let query = `INSERT INTO "MyProjects" (name, start_date, end_date, description, technologies, image)  VALUES  ('${
    payload.projectName
  }', '${payload.startDate}', '${payload.endDate}', '${
    payload.description
  }', '${payload.technologies.join(",")}', '${payload.image}')`;
  const insertDB = await sequelize.query(query, {
    type: QueryTypes.INSERT,
  });

  return insertDB;
}

// delete data from tb myproject
async function deleteProject(id) {
  let query = `DELETE FROM "MyProjects" WHERE id = ${id};`;
  const delProject = await sequelize.query(query, {
    type: QueryTypes.DELETE,
  });

  return delProject;
}

// update data from tb myproject
async function updateProject(id,payload) {
  let query = `UPDATE "MyProjects" SET name ='${
    payload.projectName
  }', start_date='${payload.startDate}', end_date ='${
    payload.endDate
  }',description= '${
    payload.description
  }', technologies = '${payload.technologies.join(",")}' WHERE id=${id}`;
  const updateProject = await sequelize.query(query,{
    type:QueryTypes.UPDATE
  })
}

module.exports = {
  postProject,
  getAllProject,
  getOneProject,
  updateProject,
  deleteProject
};
