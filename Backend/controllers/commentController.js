const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getComments = async (req, res) => {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(req.params.postId) },
    });

    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error retrieving comments" });
  }
};

exports.createComments = async (req, res) => {
  try {
    const { content, authorId, postId } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    if (!postId) {
      return res.status(400).json({ message: "postId is required" });
    }

    const newComments = await prisma.comment.create({
      data: {
        content: content,
        postId: parseInt(postId),
        authorId: authorId || null,
      },
    });

    res.status(201).json(newComments);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error creating comment", error: error.message });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const commentId = parseInt(req.params.id);

    await prisma.comment.delete({
      where: { id: commentId },
    });

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error deleting Comment" });
  }
};
