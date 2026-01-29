const db = require("../data/db");
const sv = require("../services/tok");

exports.doc = (r, s) => {
  db.d.push(r.body);
  s.json({ ok: 1 });
};

exports.slot = (r, s) => {
  db.s.push(r.body);
  s.json({ ok: 1 });
};

exports.tok = (r, s) => {
  try {
    s.json(sv.addTok(r.body));
  } catch (e) {
    s.status(400).json({ err: e });
  }
};

exports.can = (r, s) => {
  sv.cancel(r.params.id);
  s.json({ cancelled: 1 });
};

exports.ns = (r, s) => {
  sv.noShow(r.params.id);
  s.json({ noshow: 1 });
};

exports.all = (_, s) => {
  s.json({ active: db.t, waiting: db.w });
};
