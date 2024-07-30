const { Schema, model } = require("mongoose");

// Define el esquema para la Cohorte
const userSchema = new Schema({
  username: String,
});
// module.exports = model("Student", studentSchema);

module.exports = model("User", userSchema);
