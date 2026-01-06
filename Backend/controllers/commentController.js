import prisma from '../lib/prisma.js';

export async function getComments(req, res) {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: parseInt(req.params.postId) },
      include: {
        User: {
          select: {
            username: true,
          },
        },
      },
    });

    const commentsWithUsername = comments.map((comment) => ({
      ...comment,
      username: comment.User ? comment.User.username : null,
    }));

    res.status(200).json(commentsWithUsername);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error retrieving comments' });
  }
}

export async function createComments(req, res) {
  try {
    const { content } = req.body;
    const postId = req.params.postId;

    const authorId = req.user?.userId;

    const newComments = await prisma.comment.create({
      data: {
        content: content,
        postId: parseInt(postId),
        authorId: authorId,
      },
    });

    const commentWithUsername = await prisma.comment.findUnique({
      where: { id: newComments.id },
      include: {
        User: {
          select: { username: true },
        },
      },
    });

    res.status(201).json({
      ...commentWithUsername,
      username: commentWithUsername.User?.username || 'Anonymous', // Fallback if no user is found
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: 'Error creating comment', error: error.message });
  }
}

export async function updateComment(req, res) {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const commentWithUsername = await prisma.comment.findUnique({
      where: { id: updatedComment.id },
      include: {
        User: {
          select: { username: true },
        },
      },
    });

    res.status(200).json({
      ...commentWithUsername,
      username: commentWithUsername.User?.username || 'Anonymous',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error updating comment' });
  }
}

export async function deleteComment(req, res) {
  try {
    const commentId = parseInt(req.params.id);

    await prisma.comment.delete({
      where: { id: commentId },
    });

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting Comment' });
  }
}
