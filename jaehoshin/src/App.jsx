import usePosts from "./hooks/usePosts";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "short" });

export default function App() {
  const {
    posts, showForm, setShowForm, editingId,
    title, setTitle, content, setContent, author, setAuthor,
    loadPosts, openNew, openEdit, handleSubmit, handleDelete,
  } = usePosts();

  return (
    <main>
      <header>
        <h1>일기 보관함</h1>
        <p>{formatDate(new Date())}</p>
      </header>

      <button className="post" onClick={openNew}>일기 쓰기</button>
      <button className="get" onClick={loadPosts}>목록 새로고침</button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>{editingId === null ? "새 일기" : "일기 수정"}</legend>

            <label>제목</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} required />

            <label>내용</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} maxLength={1000} rows={8} required />

            {editingId === null && (
              <>
                <label>작성자</label>
                <input value={author} onChange={(e) => setAuthor(e.target.value)} maxLength={20} placeholder="본인 이름" required />
              </>
            )}

            <button className={editingId === null ? "post" : "patch"} type="submit">
              {editingId === null ? "저장" : "수정 저장"}
            </button>
            <button type="button" onClick={() => setShowForm(false)}>취소</button>
          </fieldset>
        </form>
      )}

      {!showForm && (
        <>
          {posts.length === 0 && <p className="empty">아직 불러온 일기가 없어요.</p>}

          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <span className="date">{post.createdAt ? formatDate(post.createdAt) : `${post.id}번째 일기`}</span>
                <strong>{post.title}</strong>
                <button className="patch" onClick={() => openEdit(post)}>수정</button>
                <button className="delete" onClick={() => handleDelete(post)}>삭제</button>
                <p>{post.content}</p>
                <p className="author">{post.author}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}