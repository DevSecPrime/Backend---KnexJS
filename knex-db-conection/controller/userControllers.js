const connection = require("../config/database");

exports.createUser = async (req,res) => {
  try {
    const { name, email, no, description } = req.body;

    const [result] = await connection.query(
      "INSERT INTO students (name,email,no,description) VALUES (?,?,?,?)",
      [name,email,no,description]
    );

    return res.status(201).json({
        success:true,
        message:"New user created successfully",
        data: [result]
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
      error: "error in create user...",
    });
  }
};
