import { existingUser, createUser, getAllUsers, getSingleUser, updateUser as _updateUser, deleteUser } from "./user.service";

// const { message } = require("./dtos/user.dtos");

export async function createUser(req, res) {
  try {
    const { name, email, phone, description } = req.body;

    // console.log(req.body);
    const existigUser = await existingUser(email);

    if (existigUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }
    const newUser = await createUser({
      name,
      email,
      phone,
      description,
    });

    // console.log(newUser);

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function allStudents(req, res) {
  try {
    const allusers = await getAllUsers();

    console.log("All users:- ", allusers);

    return res.json({
      success: true,
      message: "Users fetched successfully",
      data: allusers,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function getSingleStudent(req, res) {
  try {
    const id = req.params.id;
    const singleUser = await getSingleUser(id);

    return res.json({
      success: true,
      message: "User fetched successfully...",
      data: singleUser,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function updateUser(req, res) {
  try {
    const id = req.params.id;
    const { name, email, phone, description } = req.body;

   

    const updateUser = await _updateUser(id, {
      name,
      email,
      phone,
      description,
      updatedAt: new Date(),
    });

    return res.json({
      success: true,
      message: "User updated successfully",
      data: updateUser,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function deleteUser(req, res) {
  try {
    const id = req.params.id;

    await deleteUser(id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
