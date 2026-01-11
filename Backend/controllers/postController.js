// controllers/postController.js
import prisma from '../lib/prisma.js';
import cloudinary from '../middlewares/cloudinary.js';
import { uploadBufferToCloudinary } from '../lib/cloudinaryUpload.js';

// GET /posts
export async function getAllPosts(req, res) {
  try {
    const posts = await prisma.post.findMany();
    res.status(200).json(posts);
  } catch (error) {
    console.error('getAllPosts error:', error);
    res.status(500).json({ message: 'Error retrieving posts' });
  }
}

export async function getPostsByUser(req, res) {
  try {
    const userId = req.user.userId;
    const userPosts = await prisma.post.findMany({
      where: { authorId: userId },
    });
    res.status(200).json(userPosts);
  } catch (error) {
    console.error('Error retrieving user posts:', error);
    res.status(500).json({ message: 'Error retrieving user posts' });
  }
}

export async function getPostById(req, res) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: parseInt(req.params.id) },
      include: { author: true },
    });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    console.error('getPostById error:', error);
    res.status(500).json({ message: 'Error retrieving post' });
  }
}

export async function createPost(req, res) {
  try {
    const { title, content } = req.body;
    const authorId = req.user.userId;

    let imageUrl = null;
    let imagePublicId = null;

    if (req.file && req.file.buffer) {
      const result = await uploadBufferToCloudinary(req.file.buffer, {
        folder: 'blog-api-posts',
        resource_type: 'image',
      });
      imageUrl = result.secure_url ?? result.url;
      imagePublicId = result.public_id;
    }

    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
        imageUrl,
        imagePublicId,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Error creating post:', error);
    res
      .status(500)
      .json({ message: 'Error creating the post', error: error.message });
  }
}

export async function updatePost(req, res) {
  try {
    const postId = parseInt(req.params.id);

    const existing = await prisma.post.findUnique({ where: { id: postId } });
    if (!existing) return res.status(404).json({ message: 'Post not found' });

    let imageUrl = existing.imageUrl ?? null;
    let imagePublicId = existing.imagePublicId ?? null;

    if (req.file && req.file.buffer) {
      const result = await uploadBufferToCloudinary(req.file.buffer, {
        folder: 'blog-api-posts',
        resource_type: 'image',
      });
      imageUrl = result.secure_url ?? result.url;
      const newimagePublicId = result.public_id;

      if (imagePublicId) {
        try {
          await cloudinary.uploader.destroy(imagePublicId);
        } catch (delErr) {
          console.error('Failed to delete old Cloudinary image:', delErr);
        }
      }

      imagePublicId = newimagePublicId;
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        ...req.body,
        imageUrl,
        imagePublicId,
      },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error updating post:', error);
    res
      .status(500)
      .json({ message: 'Error updating post', error: error.message });
  }
}

export async function patchPost(req, res) {
  try {
    const postId = parseInt(req.params.id);

    const existing = await prisma.post.findUnique({ where: { id: postId } });
    if (!existing) return res.status(404).json({ message: 'Post not found' });

    let imageUrl = existing.imageUrl ?? null;
    let imagePublicId = existing.imagePublicId ?? null;

    if (req.file && req.file.buffer) {
      const result = await uploadBufferToCloudinary(req.file.buffer, {
        folder: 'blog-api-posts',
        resource_type: 'image',
      });
      imageUrl = result.secure_url ?? result.url;
      const newimagePublicId = result.public_id;

      if (imagePublicId) {
        try {
          await cloudinary.uploader.destroy(imagePublicId);
        } catch (delErr) {
          console.error('Failed to delete old Cloudinary image:', delErr);
        }
      }
      imagePublicId = newimagePublicId;
    }

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        ...req.body,
        imageUrl,
        imagePublicId,
      },
    });

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error('Error patching post:', error);
    res.status(500).json({
      message: 'Error partially updating the post',
      error: error.message,
    });
  }
}

export async function deletePost(req, res) {
  try {
    const postId = parseInt(req.params.id);

    const existing = await prisma.post.findUnique({ where: { id: postId } });
    if (!existing) return res.status(404).json({ message: 'Post not found' });

    if (existing.imagePublicId) {
      try {
        await cloudinary.uploader.destroy(existing.imagePublicId);
      } catch (delErr) {
        console.error(
          'Failed to delete Cloudinary image on post delete:',
          delErr
        );
      }
    }

    await prisma.post.delete({ where: { id: postId } });

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res
      .status(500)
      .json({ message: 'Error deleting the post', error: error.message });
  }
}
