import usePosts from "./hooks/usePosts";

const inputClass =
  "mt-1 block w-full rounded-lg border border-sky-200 bg-white p-2.5 text-slate-800 placeholder:text-slate-400 focus:border-transparent focus:outline-2 focus:outline-sky-400";
const labelClass = "block mt-3 text-sm text-sky-700";
const buttonClass =
  "rounded-lg px-4 py-1.5 text-sm font-medium cursor-pointer transition hover:brightness-95 disabled:cursor-wait disabled:opacity-50";

export default function App() {
  const {
    posts, loading, loadPosts,
    title, setTitle, content, setContent, author, setAuthor, handleCreate,
    editingId, editTitle, setEditTitle, editContent, setEditContent,
    openEdit, cancelEdit, handleUpdate, handleDelete,
  } = usePosts();

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-200 to-sky-50 px-5 py-10 text-slate-800 break-words">
      <main className="mx-auto max-w-2xl">
        <header className="mb-8 text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-sky-600">바아앙명어엉록</p>
          <h1 className="my-2 text-3xl font-bold text-sky-900">멋사 방명록</h1>
          <p className="text-sky-700">다녀간 흔적을 한 줄 남겨 주세요</p>
        </header>

        <form className="mb-8 rounded-2xl bg-white p-5 shadow-md shadow-sky-200" onSubmit={handleCreate}>
          <h2 className="text-lg font-bold text-sky-900">방명록 남기기</h2>
          <div className="grid gap-3 sm:grid-cols-[1fr_2fr]">
            <label className={labelClass}>
              이름
              <input className={inputClass} value={author} onChange={(e) => setAuthor(e.target.value)} maxLength={20} placeholder="본인 이름" required />
            </label>
            <label className={labelClass}>
              한 줄 인사
              <input className={inputClass} value={title} onChange={(e) => setTitle(e.target.value)} maxLength={100} placeholder="예) 놀러 왔어요!" required />
            </label>
          </div>
          <label className={labelClass}>
            남길 말
            <textarea className={`${inputClass} resize-y`} value={content} onChange={(e) => setContent(e.target.value)} maxLength={1000} rows={3} placeholder="하고 싶은 말을 적어 주세요" required />
          </label>
          <div className="mt-3 flex justify-end">
            <button className={`${buttonClass} bg-[#49cc90] text-white`} type="submit">남기기</button>
          </div>
        </form>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-bold text-sky-900">
              방명록 <span className="ml-1 rounded-full bg-sky-600 px-2 text-sm text-white">{posts.length}</span>
            </h2>
            <button className={`${buttonClass} bg-[#61affe] text-white`} onClick={loadPosts} disabled={loading}>
              {loading ? "불러오는 중..." : "새로고침"}
            </button>
          </div>

          {!loading && posts.length === 0 && (
            <p className="rounded-xl border border-dashed border-sky-300 p-8 text-center text-sky-500">
              아직 남겨진 방명록이 없어요. 첫 번째 방문자가 되어 주세요!
            </p>
          )}

          <ul className="grid gap-3">
            {posts.map((post) => (
              <li key={post.id} className="rounded-xl border-l-4 border-sky-400 bg-white/80 px-5 py-4 shadow-sm">
                {editingId === post.id ? (
                  <form onSubmit={handleUpdate}>
                    <label className={labelClass}>
                      한 줄 인사
                      <input className={inputClass} value={editTitle} onChange={(e) => setEditTitle(e.target.value)} maxLength={100} required />
                    </label>
                    <label className={labelClass}>
                      남길 말
                      <textarea className={`${inputClass} resize-y`} value={editContent} onChange={(e) => setEditContent(e.target.value)} maxLength={1000} rows={3} required />
                    </label>
                    <div className="mt-3 flex justify-end gap-2">
                      <button className={`${buttonClass} bg-[#50e3c2] text-slate-900`} type="submit">수정 저장</button>
                      <button className={`${buttonClass} border border-sky-200 bg-white`} type="button" onClick={cancelEdit}>취소</button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="font-bold text-sky-700">{post.author}</span>
                      <span className="text-sky-300">#{post.id}</span>
                    </div>
                    <strong className="mt-1.5 block">{post.title}</strong>
                    <p className="mt-1.5 whitespace-pre-wrap leading-relaxed">{post.content}</p>
                    <div className="mt-3 flex justify-end gap-2">
                      <button className={`${buttonClass} bg-[#50e3c2] text-slate-900`} onClick={() => openEdit(post)}>수정</button>
                      <button className={`${buttonClass} bg-[#f93e3e] text-white`} onClick={() => handleDelete(post)}>삭제</button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}
