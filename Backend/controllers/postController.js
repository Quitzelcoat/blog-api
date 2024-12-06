const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving posts" });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        author: true,
      },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving posts" });
  }
};

exports.getPostsByUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const userPosts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });

    res.status(200).json(userPosts);
  } catch (error) {
    console.error("Error retrieving user posts:", error);
    res.status(500).json({ message: "Error retrieving user posts" });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const authorId = req.user.userId;
    console.log(authorId);

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Error creating the post" });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const updatePost = await prisma.post.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.status(200).json(updatePost);
  } catch (error) {
    res.status(500).json({ message: "Error updating posts" });
  }
};

exports.patchPost = async (req, res) => {
  try {
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Error partially updating the post" });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await prisma.post.delete({ where: { id: parseInt(req.params.id) } });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting the post" });
  }
};
