const Client = require("../models/client.model");
const Photographer = require("../models/photographer.model");

const photographerSignUp = async (req, res, next) => {
  const { email, phone_Number } = req.body;

  try {
    const emailExists = await Client.findOne({ email });
    if (emailExists) throw new Error("Email already exists");

    const phoneExists = await Client.findOne({ phone_Number });
    if (phoneExists) throw new Error("Phone number is taken");

    const photographer = await Photographer.create({
      ...req.body,
    });
    const token = photographer.createJWT();
    res
      .status(201)
      .json({ photographer, token, message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const clientSignUp = async (req, res, next) => {
  const { email, phone_Number } = req.body;
  try {
    const emailExists = await Photographer.findOne({ email });
    if (emailExists) throw new Error("Email already exists");

    const phoneExists = await Photographer.findOne({ phone_Number });
    if (phoneExists) throw new Error("Phone number is taken");

    const client = await Client.create({
      ...req.body,
    });
    const token = client.createJWT();
    res
      .status(201)
      .json({ client, token, message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw new Error("Enter email and password");

    const photographer = await Photographer.findOne({ email });

    if (!photographer) {
      const client = await Client.findOne({ email });
      if (!client)
        return res.status(403).json({ message: "Invalid credentials" });

      const passwordCheck = await client.comparePassword(password);

      if (!passwordCheck) {
        return res.status(401).json({ message: "invalid credentials" });
      }
      const token = client.createJWT();
      return res
        .status(200)
        .json({ client, token, message: "Login successfully" });
    }
    const passwordCheck = await photographer.comparePassword(password);

    if (!passwordCheck) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    const token = photographer.createJWT();
    res
      .status(200)
      .json({ photographer, token, message: "Login successfully" });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    if (req.client.clientId) {
      const clientId = req.client.clientId;
      const user = await Client.findById(clientId).select(
        "last_Name first_Name email role"
      );
      if (!user) throw new Error("Unauthorized");
      const token = user.createJWT();

      return res.status(200).json({ user, token, message: "successfully" });
    }
    if (req.photographer.photographerId) {
      const photographerId = req.photographer.photographerId;
      const user = await Photographer.findById(photographerId).select(
        "-password -photos"
        // "last_Name first_Name email role"
      );
      if (!user) throw new Error("Unauthorized");
      const token = user.createJWT();

      res.status(200).json({ user, token, message: "successfully" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { photographerSignUp, clientSignUp, login, getUserProfile };
