const Member = require("../models/member");
const { blood, date } = require("../../lib/utils");

module.exports = {
  index(req, res) {
    const { filter } = req.query;

    if (filter) {
      Member.findBy(filter, (members) => {
        return res.render("members/index", { members });
      });
    } else {
      Member.all((members) => {
        return res.render("members/index", { members });
      });
    }
  },
  create(req, res) {
    Member.instructorsSelectOptions((options) => {
      return res.render("members/create", { instructorOptions: options });
    });
  },
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all the fields!");
      }
    }

    //função com instructoR(singular), porque crio apenas um
    Member.create(req.body, (member) => {
      return res.redirect(`/members`);
    });
  },
  show(req, res) {
    Member.find(req.params.id, (member) => {
      if (!member) return res.send("Member not found!");

      member.birth = date(member.birth).birthDay;
      member.blood = blood(member.blood);

      return res.render("members/show", { member });
    });
  },
  edit(req, res) {
    Member.find(req.params.id, (member) => {
      if (!member) return res.send("Member not found!");

      member.birth = date(member.birth).iso;

      Member.instructorsSelectOptions((options) => {
        return res.render("members/edit", {
          member,
          instructorOptions: options,
        });
      });
    });
  },
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all the fields!");
      }
    }

    Member.update(req.body, () => {
      return res.redirect(`/members/${req.body.id}`);
    });
  },
  delete(req, res) {
    Member.delete(req.body.id, () => {
      return res.redirect(`/members`);
    });
  },
};
