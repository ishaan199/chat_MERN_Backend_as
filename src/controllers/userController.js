const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const genrateToken = require("../../config/genrateToken");
const userModel = require("../modals/userModel");

const loginController = expressAsyncHandler(async (req, res) => {
  try {
    const { name, password } = req.body;
    const checkUserName = await userModel.findOne({ name });
    if (checkUserName && (await checkUserName.matchPassword(password))) {
      // if (checkUserName && (checkUserName.password == password)){
      return res.status(200).send({
        status: true,
        _id: checkUserName._id,
        name: checkUserName.name,
        email: checkUserName.email,
        isAdmin: checkUserName.isAdmin,
        token: genrateToken(checkUserName._id),
      });
    } else {
      return res
        .status(400)
        .send({ status: false, msg: "Check the user name and password" });
    }
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
});

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .send({ status: false, msg: "fields are required" });
    }
    let checkUserEmail = await userModel.findOne({ email });
    if (checkUserEmail) {
      return res
        .status(400)
        .send({ status: false, msg: "This email is already registered" });
    }
    let checkUserName = await userModel.findOne({ name });
    if (checkUserName) {
      return res
        .status(400)
        .send({ status: false, msg: "Try Different UserName" });
    }
    const createUser = await userModel.create({ name, email, password });
    if (createUser) {
      return res.status(200).send({
        status: true,
        _id: createUser._id,
        name: createUser.name,
        email: createUser.email,
        isAdmin: createUser.isAdmin,
        token: genrateToken(createUser._id),
      });
    } else {
      return res
        .status(400)
        .send({ status: false, msg: "Something went wrong" });
    }
  } catch (error) {
    res.status(500).send({ status: false, err: error.message });
  }
};

const fetchAllUserController = expressAsyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const users = await userModel
    .find(keyword)
    .find({ _id: { $ne: req.user._id } });
  res.send(users);
});

module.exports = { loginController, registerController, fetchAllUserController };
