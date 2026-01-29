const db = require("../src/data/db");
const sv = require("../src/services/tok");

// doctors
db.d.push(
  { id: "D1", n: "Dr A" },
  { id: "D2", n: "Dr B" },
  { id: "D3", n: "Dr C" }
);

// slots
db.s.push(
  { id: "S1", d: "D1", t: "9-10", cap: 2 },
  { id: "S2", d: "D2", t: "10-11", cap: 2 },
  { id: "S3", d: "D3", t: "11-12", cap: 2 }
);

// normal tokens
sv.addTok({ d: "D1", s: "S1", n: "Amit", ty: "WALKIN" });
sv.addTok({ d: "D1", s: "S1", n: "Ravi", ty: "ONLINE" });

// follow-up
sv.addTok({ d: "D1", s: "S1", n: "Neha", ty: "FOLLOWUP" });

// paid
sv.addTok({ d: "D1", s: "S1", n: "VIP", ty: "PAID" });

// emergency
sv.addTok({ d: "D1", s: "S1", n: "Critical", ty: "EMERGENCY" });

// cancel
const c = db.t.find(x => x.n === "Ravi");
sv.cancel(c.id);

// no-show
const n = db.t.find(x => x.n === "Amit");
sv.noShow(n.id);

console.log("ACTIVE:", db.t);
console.log("WAITING:", db.w);
