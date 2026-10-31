import usePosts from './hooks/usePosts.js';
import PostCard from './components/PostCard.jsx';
import PostDetail from './components/PostDetail.jsx';
import PostForm from './components/PostForm.jsx';

export default function App() {
  const {
    posts,
    selectedPost,
    editor,
    loading,
    busy,
    error,
    savePost,
    removePost,
    selectPost,
    backToList,
    openCreate,
    openEdit,
    closeEditor,
  } = usePosts();

  return (
    <main className="min-h-screen bg-slate-50 px-5 py-12">
      <div className="mx-auto max-w-3xl">

        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">
            게시판
          </h1>

          <button
            type="button"
            onClick={openCreate}
            disabled={busy}
            className="rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            글쓰기
          </button>
        </div>

        {error && (
          <p role="alert" className="mb-5 rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {error}
          </p>
        )}

        {editor !== null ? (
          <PostForm
            key={editor.id ?? 'new'}
            initialValues={editor}
            busy={busy}
            onSave={savePost}
            onCancel={closeEditor}
          />

        ) : selectedPost ? (
          <PostDetail
            post={selectedPost}
            onBack={backToList}
            onEdit={openEdit}
            onDelete={removePost}
            busy={busy}
          />

        ) : loading ? (
          <p className="py-16 text-center text-slate-500">
            게시글을 불러오는 중...
          </p>
        ) : posts.length === 0 ? (
          error && (
            <p className="py-16 text-center text-slate-500">
              게시글을 불러오지 못했습니다.
            </p>
          )
        ) : (
          <div className="divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white">
            {posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onClick={selectPost}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
