import Module from "../models/Module.js";

// Get all learning modules
export const getModules = async (req, res) => {
  try {
    const modules = await Module.find()
      .sort({ order: 1 })
      .select("-languageVariants");

    return res.status(200).json({
      modules
    });
  } catch (error) {
    console.error("Get modules error:", error);

    return res.status(500).json({
      message: "Server error while fetching modules"
    });
  }
};

// Get a single module by ID
export const getModuleById = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);

    if (!module) {
      return res.status(404).json({
        message: "Module not found"
      });
    }

    return res.status(200).json({
      module
    });
  } catch (error) {
    console.error("Get module error:", error);

    return res.status(500).json({
      message: "Server error while fetching module"
    });
  }
};

// Create a new module
export const createModule = async (req, res) => {
  try {
    const { title, topic, content, order, languageVariants } = req.body;

    if (!title || !topic || order === undefined) {
      return res.status(400).json({
        message: "Title, topic and order are required"
      });
    }

    const existingModule = await Module.findOne({ order });

    if (existingModule) {
      return res.status(409).json({
        message: "A module with this order already exists"
      });
    }

    const module = await Module.create({
      title,
      topic,
      content: Array.isArray(content) ? content : [],
      order,
      languageVariants: languageVariants || {}
    });

    return res.status(201).json({
      message: "Module created successfully",
      module
    });
  } catch (error) {
    console.error("Create module error:", error);

    return res.status(500).json({
      message: "Server error while creating module"
    });
  }
};