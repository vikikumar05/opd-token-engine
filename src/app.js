const e = require("express");
const a = e();
a.use(e.json());
a.use("/api", require("./routes/rt"));
a.listen(3000, () => console.log("OPD running"));
