import prisma from '../lib/prisma.js';

export async function getAllPosts(req, res) {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posts' });
  }
}

export async function getPostById(req, res) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        author: true,
      },
    });

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving posts' });
  }
}

export async function getPostsByUser(req, res) {
  try {
    const userId = req.user.userId;

    const userPosts = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });

    res.status(200).json(userPosts);
  } catch (error) {
    console.error('Error retrieving user posts:', error);
    res.status(500).json({ message: 'Error retrieving user posts' });
  }
}

export async function createPost(req, res) {
  try {
    const { title, content } = req.body;
    const authorId = req.user.userId;

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Error creating the post' });
  }
}

export async function updatePost(req, res) {
  try {
    const updatePost = await prisma.post.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.status(200).json(updatePost);
  } catch (error) {
    res.status(500).json({ message: 'Error updating posts' });
  }
}

export async function patchPost(req, res) {
  try {
    const updatedPost = await prisma.post.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Error partially updating the post' });
  }
}

export async function deletePost(req, res) {
  try {
    await prisma.post.delete({ where: { id: parseInt(req.params.id) } });
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting the post' });
  }
}
