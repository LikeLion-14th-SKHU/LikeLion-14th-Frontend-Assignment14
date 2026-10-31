import { useEffect, useState } from "react";
import { getPosts, createPost, updatePost, deletePost } from "../api/posts";

export default function usePosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await getPosts();
      setPosts([...data].sort((a, b) => b.id - a.id));
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleCreate = async (event) => {
    event.preventDefault();
    try {
      await createPost({ title, content, author });
      setTitle("");
      setContent("");
      setAuthor("");
      await loadPosts();
    } catch (error) {
      alert(error.message);
    }
  };

  const openEdit = (post) => {
    setEditingId(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  const cancelEdit = () => setEditingId(null);

  const handleUpdate = async (event) => {
    event.preventDefault();
    try {
      await updatePost(editingId, { title: editTitle, content: editContent });
      setEditingId(null);
      await loadPosts();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (post) => {
    if (!confirm(`「${post.title}」 방명록을 삭제할까요?`)) return;
    try {
      await deletePost(post.id);
      await loadPosts();
    } catch (error) {
      alert(error.message);
    }
  };

  return {
    posts, loading, loadPosts,
    title, setTitle, content, setContent, author, setAuthor, handleCreate,
    editingId, editTitle, setEditTitle, editContent, setEditContent,
    openEdit, cancelEdit, handleUpdate, handleDelete,
  };
}
