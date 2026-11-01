import { useEffect, useState } from "react";
import {
    getPosts,
    createPost,
    updatePost,
    deletePost,
} from "../api/posts";

export default function usePosts() {
    const [posts, setPosts] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [author, setAuthor] = useState("");

    const loadPosts = async () => {
        try {
            setPosts(await getPosts());
        } catch (error) {
            alert(error.message);
        }
    };

    useEffect(() => {
        loadPosts();
    }, []);

    const openNew = () => {
        setEditingId(null);
        setTitle("");
        setContent("");
        setAuthor("");
        setShowForm(true);
    };

    const openEdit = (post) => {
        setEditingId(post.id);
        setTitle(post.title);
        setContent(post.content);
        setShowForm(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            if (editingId === null) {
                await createPost({ title, content, author });
            } else {
                await updatePost(editingId, { title, content });
            }

            setShowForm(false);
            await loadPosts();
            return true;
        } catch (error) {
            alert(error.message);
            return false;
        }
    };

    const handleDelete = async (post) => {
        if (!window.confirm(`"${post.title}" 편지를 삭제할까요?`)) {
            return false;
        }

        try {
            await deletePost(post.id);
            await loadPosts();
            return true;
        } catch (error) {
            alert(error.message);
            return false;
        }
    };

    return {
        posts,
        showForm,
        setShowForm,
        editingId,
        title,
        setTitle,
        content,
        setContent,
        author,
        setAuthor,
        loadPosts,
        openNew,
        openEdit,
        handleSubmit,
        handleDelete,
    };
}
