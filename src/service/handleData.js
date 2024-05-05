const countDuration = require("./CountTimeDuration");

const validateData = (data) => {
  let projectName = data.projectName;
  let startDate = data.startDate;
  let endDate = data.endDate;
  let description = data.description;
  let technologies = [];

  try {
    technologies.push(data.nodeJs);
  } catch (error) {
    console.log("node js unchecked");
  }

  try {
    technologies.push(data.reactJs);
  } catch (error) {
    console.log("react js unchecked");
  }

  try {
    technologies.push(data.nextJs);
  } catch (error) {
    console.log("next js unchecked");
  }

  try {
    technologies.push(data.typeScript);
  } catch (error) {
    console.log("typeScript: unchecked");
  }

  let image =
    "https://cdn.photographylife.com/wp-content/uploads/2014/09/Nikon-D750-Image-Samples-2.jpg";

  let payload = {}

  if (
    projectName !== undefined &&
    startDate !== "" &&
    endDate !== "" &&
    endDate >= startDate &&
    description !== ""
  ) {
    payload = {
      projectName,
      startDate,
      endDate,
      description,
      technologies,
      image,
    };

    return { data:payload, valid: true };

  } else {
    return { data:payload, valid: false };
  }
};

const getViewData = (dataDb) => {
  let viewData = [];
  dataDb.forEach((data) => {
    let projectName = data.name;
    let id = data.id;

    let countTime = countDuration(data.start_date, data.end_date);
    let startDate = countTime.startDate;
    let endDate = countTime.endDate;
    let timeDuration = countTime.timeDuration;

    let description = data.description;
    let technologies = data.technologies;

    let technologyIcon = [];
    let detailTechnology = [];

    let arrayTechnologies = technologies.split(",");
    let image = data.image;

    arrayTechnologies.forEach((item) => {
      if (item == "node Js") {
        technologyIcon.push(`<i class="fa-brands fa-node-js"></i>`);
        detailTechnology.push(
          `<span><i class="fa-brands fa-node-js"></i><p>Node Js</p></span>`
        );
      } else if (item == "react Js") {
        technologyIcon.push(`<i class="fa-brands fa-react"></i>`);
        detailTechnology.push(
          `<span><i class="fa-brands fa-react"></i><p>react js</p></span>`
        );
      } else if (item == "next Js") {
        technologyIcon.push(
          `<img src="assets/icon/next-js_1.svg" style="height: 25px; width: 25px;"></img>`
        );
        detailTechnology.push(`<span>
        <img src="../assets/icon/next-js_1.svg" style="height: 25px; width: 25px;"></img>
        <p>Next Js</p>
      </span>`);
      } else if (item == "typeScript") {
        technologyIcon.push(
          `<img src="assets/icon/icons8-typescript-500.svg" style="height: 25px; width: 25px;"></img>`
        );
        detailTechnology.push(`<span>
        <img src="../assets/icon/icons8-typescript-500.svg" style="height: 20px; width: 20px;"></img>
        <p>typeScript</p>
      </span>`);
      }
    });

    let elementDetilIcon = detailTechnology.join("");
    let elementCardIcon = technologyIcon.join("");

    let datum = {
      id,
      projectName,
      startDate,
      endDate,
      description,
      timeDuration,
      elementCardIcon,
      elementDetilIcon,
      image,
    };

    viewData.push(datum);
  });

  return viewData.reverse();
};

module.exports = {
  validateData,
  getViewData,
};
