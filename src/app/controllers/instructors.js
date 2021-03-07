const Instructor = require("../models/instructor");
const { age, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    Instructor.all((instructors) => {
      return res.render("instructors/index", { instructors });
    });
  },
  create(req, res) {
    return res.render("instructors/create");
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all the fields!");
      }
    }

    //função com instructoR(singular), porque crio apenas um
    Instructor.create(req.body, (instructor) => {
      return res.redirect(`/instructors`);
    });
  },
  show(req, res) {
    Instructor.find(req.params.id, (instructor) => {
      if (!instructor) return res.send("Instructor not found!");

      instructor.age = age(instructor.birth);
      instructor.services = instructor.services.split(",");

      instructor.created_at = date(instructor.created_at).format;

      return res.render("instructors/show", { instructor });
    });

    return;
  },
  edit(req, res) {
    return;
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all the fields!");
      }
    }

    return;
  },
  delete(req, res) {
    return;
  },
};