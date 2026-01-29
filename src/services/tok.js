const db = require("../data/db");

const p = {
  WALKIN: 1,
  ONLINE: 1,
  FOLLOWUP: 2,
  PAID: 3,
  EMERGENCY: 4
};

const mk = (n, ty, pr, d, s) => ({
  id: "T" + Math.floor(Math.random() * 99999),
  n, ty, pr, d, s,
  st: "ACTIVE"
});

const fill = (sid) => {
  const sl = db.s.find(x => x.id === sid);
  if (!sl) return;

  const act = db.t.filter(x => x.s === sid && x.st === "ACTIVE");
  if (act.length >= sl.cap) return;

  const next = db.w
    .filter(x => x.s === sid)
    .sort((a, b) => b.pr - a.pr)[0];

  if (next) {
    next.st = "ACTIVE";
    db.t.push(next);
    db.w = db.w.filter(x => x.id !== next.id);
  }
};

exports.addTok = ({ d, s, n, ty }) => {
  const sl = db.s.find(x => x.id === s && x.d === d);
  if (!sl) throw "slot not found";

  const pr = p[ty];
  const act = db.t.filter(x => x.s === s && x.st === "ACTIVE");

  if (act.length < sl.cap) {
    const tk = mk(n, ty, pr, d, s);
    db.t.push(tk);
    return tk;
  }

  const low = act.reduce((a, b) => a.pr < b.pr ? a : b);

  if (pr > low.pr) {
    low.st = "SHIFTED";
    db.w.push(low);

    const tk = mk(n, ty, pr, d, s);
    db.t.push(tk);
    return tk;
  }

  const wt = mk(n, ty, pr, d, s);
  wt.st = "WAITING";
  db.w.push(wt);
  return { msg: "waiting" };
};

exports.cancel = (id) => {
  const t = db.t.find(x => x.id === id);
  if (!t) throw "token not found";
  t.st = "CANCELLED";
  fill(t.s);
};

exports.noShow = (id) => {
  const t = db.t.find(x => x.id === id);
  if (!t) throw "token not found";
  t.st = "NO_SHOW";
  fill(t.s);
};
