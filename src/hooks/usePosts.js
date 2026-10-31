import { useCallback, useEffect, useState } from 'react';
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from '../api/posts.js';

export default function usePosts() {
  const [posts, setPosts] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [editor, setEditor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const selectedPost =
    posts.find((post) => post.id === selectedId) ?? null;

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getPosts();
      if (!Array.isArray(data)) {
        throw new Error('게시글 목록 형식이 올바르지 않습니다.');
      }
      setPosts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  async function savePost(form) {
    setBusy(true);
    setError('');

    try {
      if (editor?.id != null) {
        await updatePost(editor.id, form);
      } else {
        await createPost(form);
      }

      const data = await getPosts();
      if (!Array.isArray(data)) {
        throw new Error('게시글 목록 형식이 올바르지 않습니다.');
      }

      setPosts(data);
      setEditor(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  async function removePost() {
    if (!selectedPost) return;

    if (!window.confirm('게시글을 삭제하시겠습니까?')) {
      return;
    }

    setBusy(true);
    setError('');

    try {
      await deletePost(selectedPost.id);

      const data = await getPosts();
      if (!Array.isArray(data)) {
        throw new Error('게시글 목록 형식이 올바르지 않습니다.');
      }

      setPosts(data);
      setSelectedId(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return {
    posts,
    selectedPost,
    editor,
    loading,
    busy,
    error,
    savePost,
    removePost,

    selectPost: (post) => setSelectedId(post.id),

    backToList: () => {
      setSelectedId(null);
      setEditor(null);
      setError('');
    },

    openCreate: () => {
      setSelectedId(null);
      setEditor({});
      setError('');
    },

    openEdit: () => {
      setEditor(selectedPost);
      setError('');
    },

    closeEditor: () => {
      setEditor(null);
      setError('');
    },
  };
}
