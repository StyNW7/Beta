import Landmark from "../models/landmark.model.js";

export const getAllLandmarks = async (req, res) => {
  try {
    const landmarks = await Landmark.find();

    if (!landmarks || landmarks.length === 0) {
      return res.status(404).json({ message: "No landmarks found" });
    }

    res.status(200).json(landmarks);
  } catch (error) {
    console.error("Error fetching landmarks:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getLandmarkById = async (req, res) => {
  const { id } = req.params;

  try {
    const landmark = await Landmark.findById(id);

    if (!landmark) {
      return res.status(404).json({ message: "Landmark not found" });
    }

    res.status(200).json(landmark);
  } catch (error) {
    console.error(`Error fetching landmark with ID ${id}:`, error);
    res.status(500).json({ message: "Server error" });
  }
};
