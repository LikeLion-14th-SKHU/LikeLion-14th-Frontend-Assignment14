export default function PostDetail({
    post,
    onBack,
    onEdit,
    onDelete,
    busy,
  }) {
    return (
      <article className="rounded-xl border border-slate-200 bg-white p-6">
        <button
          type="button"
          onClick={onBack}
          className="mb-8 text-sm text-slate-500 hover:text-slate-900"
        >
          ← 목록으로
        </button>
  
        <h2 className="text-2xl font-bold text-slate-900">
          {post.title}
        </h2>
  
        <p className="mt-3 text-sm text-slate-500">
          작성자: {post.author || '알 수 없음'}
        </p>
  
        <div className="my-6 border-t border-slate-200" />
  
        <p className="min-h-48 whitespace-pre-wrap wrap-break-word text-sm leading-7 text-slate-700">
          {post.content}
        </p>
  
        <div className="flex justify-end gap-2 border-t border-slate-200 pt-5">
          <button
            type="button"
            onClick={onEdit}
            disabled={busy}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
          >
            수정
          </button>
  
          <button
            type="button"
            onClick={onDelete}
            disabled={busy}
            className="rounded-lg border border-red-500 px-4 py-2 text-sm text-red-700 hover:bg-red-50 disabled:opacity-50"
          >
            삭제
          </button>
        </div>
      </article>
    );
  }
  