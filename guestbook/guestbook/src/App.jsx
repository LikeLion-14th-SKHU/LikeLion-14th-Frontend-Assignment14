import usePosts from "./hooks/usePosts";

export default function App() {
  const {
    posts, showForm, setShowForm, editingId, loading,
    title, setTitle, content, setContent, author, setAuthor,
    loadPosts, openNew, openEdit, handleSubmit, handleDelete,
  } = usePosts();

  return (
    <main>
      <header>
        <h1>나의 방명록</h1>
        <p className="sub">다녀간 흔적을 남겨주세요</p>
      </header>

      <div className="toolbar">
        <button className="post" onClick={openNew} disabled={loading}>방명록 남기기</button>
        <button className="get" onClick={loadPosts} disabled={loading}>새로고침</button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>{editingId === null ? "새 방명록" : "방명록 수정"}</legend>

            <label>한 줄 인사</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} placeholder="안녕하세요!" required />

            <label>남길 말</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} maxLength={1000} rows={4} required />

            {editingId === null && (
              <>
                <label>이름</label>
                <input value={author} onChange={(e) => setAuthor(e.target.value)} maxLength={20} placeholder="본인 이름" required />
              </>
            )}

            <button className={editingId === null ? "post" : "patch"} type="submit" disabled={loading}>
              {editingId === null ? "남기기" : "수정 저장"}
            </button>
            <button type="button" onClick={() => setShowForm(false)}>취소</button>
          </fieldset>
        </form>
      )}

      {posts.length === 0 && !loading && <p className="empty">아직 방명록이 없어요. 첫 번째로 남겨보세요!</p>}

      <ul>
        {posts.map((post) => (
          <li key={post.id} className="card">
            <div className="card-head">
              <strong>{post.title}</strong>
              <span className="author">— {post.author}</span>
            </div>
            <p>{post.content}</p>
            <div className="card-actions">
              <button className="patch" onClick={() => openEdit(post)} disabled={loading}>수정</button>
              <button className="delete" onClick={() => handleDelete(post)} disabled={loading}>삭제</button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
