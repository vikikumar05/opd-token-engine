const r = require("express").Router();
const c = require("../controllers/ctrl");

r.post("/doc", c.doc);
r.post("/slot", c.slot);
r.post("/tok", c.tok);
r.put("/cancel/:id", c.can);
r.put("/noshow/:id", c.ns);
r.get("/all", c.all);

module.exports = r;
