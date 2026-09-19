import dns from "dns";

dns.setServers(["8.8.8.8", "1.1.1.1"]);

import dotenv from "dotenv";
import mongoose from "mongoose";

import Module from "../models/Module.js";
import Article from "../models/Article.js";

dotenv.config();

const modules = [
  {
    moduleId: "m1",
    title: "What Are Rights?",
    topic: "Basics",
    content: [
      "Rights are things every child is entitled to, no matter who they are or where they live.",
      "Some examples: the right to education, the right to be safe, and the right to be heard."
    ],
    order: 1
  },
  {
    moduleId: "m2",
    title: "The Right to Education",
    topic: "Education",
    content: [
      "Every child has the right to go to school and learn.",
      "This means schools should be safe, free from discrimination, and accessible to everyone."
    ],
    order: 2
  },
  {
    moduleId: "m3",
    title: "The Right to Be Heard",
    topic: "Participation",
    content: [
      "Children have the right to share their opinions on things that affect them.",
      "Adults should listen and take children's views seriously, even if they don't always agree."
    ],
    order: 3
  }
];

const articles = [
  {
    title: "What is my Right to Education?",
    body: "Every child has the right to go to school and learn. Schools should be safe, free from discrimination, and accessible to everyone.",
    category: "FAQ",
    tags: ["f1"]
  },
  {
    title: "What is my Right to Be Heard?",
    body: "You can share your opinion on things that affect you, and adults should listen and take your views seriously.",
    category: "FAQ",
    tags: ["f2"]
  },
  {
    title: "What is my Right to Safety?",
    body: "Every child has the right to be protected from harm - at home, at school, and online.",
    category: "FAQ",
    tags: ["f3"]
  },
  {
    title: "What is my Right to Privacy?",
    body: "You have the right to keep personal information, messages, and belongings private, unless someone needs to protect your safety.",
    category: "FAQ",
    tags: ["f4"]
  },
  {
    title: "What is my Right to Play?",
    body: "Every child has the right to rest, relax, play, and take part in activities they enjoy.",
    category: "FAQ",
    tags: ["f5"]
  },
  {
    title: "What should I do if my rights are not respected?",
    body: "Talk to a trusted adult - a parent, teacher, or counselor. You can also reach out to child helplines in your area for support.",
    category: "FAQ",
    tags: ["f6"]
  },
  {
    title: "The Classroom That Listened",
    body: "When a group of students felt unheard about a new rule, their teacher opened a class discussion. Their feedback changed the policy - showing how the Right to Be Heard works in real life.",
    category: "Case Story",
    tags: ["#School", "#Participation", "s1"]
  },
  {
    title: "A Safer Login",
    body: "After a student's photos were shared without permission, the school introduced digital safety lessons. It became a turning point for how the class understood online privacy.",
    category: "Case Story",
    tags: ["#Privacy", "#Safety", "s2"]
  },
  {
    title: "Back to School",
    body: "A family that couldn't afford school fees learned about free education programs in their area. Within weeks, their child was back in a classroom, learning alongside friends.",
    category: "Case Story",
    tags: ["#Education", "#Equality", "s3"]
  },
  {
    title: "Speaking Up at Home",
    body: "A child who felt unsafe at home confided in a trusted teacher, who connected the family with local support services - a reminder that speaking up can be the first step to help.",
    category: "Case Story",
    tags: ["#Safety", "#Participation", "s4"]
  }
];

const seedContent = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected.");

    for (const moduleData of modules) {
      await Module.findOneAndUpdate(
        { moduleId: moduleData.moduleId },
        moduleData,
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true
        }
      );
    }

    console.log("Modules seeded successfully.");

    for (const articleData of articles) {
      const existingArticle = await Article.findOne({
        category: articleData.category,
        tags: articleData.tags
      });

      if (!existingArticle) {
        await Article.create(articleData);
      }
    }

    console.log("Articles seeded successfully.");
    console.log("EduRights content seeding complete.");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Content seed error:", error);

    try {
      await mongoose.disconnect();
    } catch {}

    process.exit(1);
  }
};

seedContent();