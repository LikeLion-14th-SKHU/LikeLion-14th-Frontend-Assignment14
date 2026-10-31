import usePosts from "./hooks/usePosts";

export default function App() {
  const {
    posts, showForm, setShowForm, editingId,
    title, setTitle, content, setContent, author, setAuthor,
    loadPosts, openNew, openEdit, handleSubmit, handleDelete,
  } = usePosts();

  return (
    <main>
      <h1 c>일기장</h1>
      <button className="post" onClick={openNew}>일기 쓰기</button>
      <button className="get" onClick={loadPosts}>새로고침</button>

      {showForm && (
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>{editingId === null ? "오늘의 일기" : "일기 수정"}</legend>

            <label>제목</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} placeholder="예: 10월 31일, 맑음" required />

            <label>내용</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} maxLength={1000} rows={5} placeholder="오늘 있었던 일을 적어보세요" required />

            {editingId === null && (
              <>
                <label>작성자</label>
                <input value={author} onChange={(e) => setAuthor(e.target.value)} maxLength={20} placeholder="본인 이름" required />
              </>
            )}

            <button className={editingId === null ? "post" : "patch"} type="submit">
              {editingId === null ? "등록" : "수정 저장"}
            </button>
            <button type="button" onClick={() => setShowForm(false)}>취소</button>
          </fieldset>
        </form>
      )}

      {!showForm && (
        <>
          {posts.length === 0 && <p>아직 일기 없음.</p>}
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <strong>{post.title}</strong>
                <button className="patch" onClick={() => openEdit(post)}>수정</button>
                <button className="delete" onClick={() => handleDelete(post)}>삭제</button>
                <p>{post.content}</p>
                <p>작성자: {post.author}</p>
              </li>
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
