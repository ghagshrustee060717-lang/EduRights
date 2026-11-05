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

// Get a single module using the frontend module ID
export const getModuleById = async (req, res) => {
  try {
    const module = await Module.findOne({
      moduleId: req.params.id
    }).select("-languageVariants");

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

// Create a new learning module
export const createModule = async (req, res) => {
  try {
    const {
      moduleId,
      title,
      topic,
      content,
      order,
      languageVariants
    } = req.body;

    if (!moduleId || !title || !topic || order === undefined) {
      return res.status(400).json({
        message: "Module ID, title, topic and order are required"
      });
    }

    const existingModule = await Module.findOne({
      $or: [
        { moduleId },
        { order }
      ]
    });

    if (existingModule) {
      return res.status(409).json({
        message: "A module with this ID or order already exists"
      });
    }

    const module = await Module.create({
      moduleId,
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

// Update an existing module
export const updateModule = async (req, res) => {
  try {
    const module = await Module.findById(req.params.id);

    if (!module) {
      return res.status(404).json({
        message: "Module not found"
      });
    }

    const { moduleId } = req.body;

    if (!moduleId) {
      return res.status(400).json({
        message: "Module ID is required"
      });
    }

    const existingModule = await Module.findOne({
      moduleId,
      _id: { $ne: module._id }
    });

    if (existingModule) {
      return res.status(409).json({
        message: "This module ID is already in use"
      });
    }

    module.moduleId = moduleId;

    await module.save();

    return res.status(200).json({
      message: "Module updated successfully",
      module
    });
  } catch (error) {
    console.error("Update module error:", error);

    return res.status(500).json({
      message: "Server error while updating module"
    });
  }
};

export default {
  getModules,
  getModuleById,
  createModule,
  updateModule
};