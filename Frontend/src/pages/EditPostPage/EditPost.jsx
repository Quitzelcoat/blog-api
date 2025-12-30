/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchPosts, updatePost } from '../../services/postsApi';
import Navbar from '../../components/Navbar/Navbar';
import styles from './EditPost.module.css';

function EditPost({ token }) {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const editorRef = useRef(null);

  useEffect(() => {
    async function getPost() {
      const posts = await fetchPosts();
      const post = posts.find((p) => p.id === parseInt(id));
      if (post) {
        setTitle(post.title);
        setContent(post.content);
      }
    }
    getPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = { title, content };
    await updatePost(id, updatedPost, token);
    window.location.href = '/posts';
  };

  const formatText = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  return (
    <div className={styles.page}>
      <Navbar token={token} />

      <main className={styles.main}>
        <header className={styles.header}>
          <Link to="/posts" className={styles.backButton}>
            ← Your posts
          </Link>
        </header>

        <form id="postForm" onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.editorContainer}>
            {/* Title */}
            <div className={styles.field}>
              <label className={styles.label}>Title</label>
              <input
                type="text"
                className={styles.titleInput}
                placeholder="Write your post title here..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Toolbar */}
            <div className={styles.toolbar}>
              <div className={styles.toolbarGroup}>
                <button
                  type="button"
                  onClick={() => formatText('bold')}
                  className={styles.toolbarBtn}
                  title="Bold (⌘+B)"
                >
                  <strong>B</strong>
                </button>
                <button
                  type="button"
                  onClick={() => formatText('italic')}
                  className={styles.toolbarBtn}
                  title="Italic (⌘+I)"
                >
                  <em>I</em>
                </button>
                <button
                  type="button"
                  onClick={() => formatText('underline')}
                  className={styles.toolbarBtn}
                  title="Underline (⌘+U)"
                >
                  U
                </button>
              </div>
              <div className={styles.toolbarGroup}>
                <button
                  type="button"
                  onClick={() => formatText('insertUnorderedList')}
                  className={styles.toolbarBtn}
                  title="Bullet list"
                >
                  •
                </button>
                <button
                  type="button"
                  onClick={() => formatText('insertOrderedList')}
                  className={styles.toolbarBtn}
                  title="Numbered list"
                >
                  1.
                </button>
              </div>
              <div className={styles.toolbarGroup}>
                <select
                  onChange={(e) => formatText('formatBlock', e.target.value)}
                  defaultValue=""
                  className={styles.toolbarSelect}
                >
                  <option value="">Format</option>
                  <option value="h2">Heading</option>
                  <option value="p">Paragraph</option>
                </select>
              </div>
            </div>

            {/* Content Editor */}
            <div className={styles.field}>
              <label className={styles.label}>Content</label>
              <div
                className={styles.editor}
                contentEditable
                ref={editorRef}
                onInput={(e) => setContent(e.currentTarget.innerHTML)}
                suppressContentEditableWarning={true}
                dangerouslySetInnerHTML={{ __html: content }}
              />
            </div>

            {/* Submit Button */}
            <div className={styles.submitGroup}>
              <button type="submit" className={styles.submitButton}>
                Update post
              </button>
              <p className={styles.helperText}>
                Changes will be saved automatically. Publish status managed from
                posts page.
              </p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default EditPost;
