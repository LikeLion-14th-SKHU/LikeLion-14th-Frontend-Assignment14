import { useState } from 'react';

export default function PostForm({
  initialValues,
  busy,
  onSave,
  onCancel,
}) {
  const isEditing = initialValues?.id != null;

  const [title, setTitle] = useState(initialValues?.title ?? '');
  const [content, setContent] = useState(initialValues?.content ?? '');
  const [author, setAuthor] = useState(initialValues?.author ?? '');

  function handleSubmit(event) {
    event.preventDefault();

    const values = {
      title: title.trim(),
      content: content.trim(),
    };

    if (!values.title || !values.content) return;

    if (!isEditing) {
      values.author = author.trim();
      if (!values.author) return;
    }

    onSave(values);
  }

  const inputStyle =
    'mt-2 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 disabled:opacity-60';

  return (
    <section className="mb-7 rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold">
            {isEditing ? '게시글 수정' : '새 글 작성'}
          </h2>

        </div>

        <button
          type="button"
          onClick={onCancel}
          disabled={busy}
          aria-label="닫기"
          className="p-2 text-slate-400 hover:text-slate-700"
        >
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block text-sm font-semibold text-slate-700">
          제목
          <input
            className={inputStyle}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
            required
            maxLength={100}
            disabled={busy}
          />
        </label>

        <label className="block text-sm font-semibold text-slate-700">
          내용
          <textarea
            className={`${inputStyle} min-h-36 resize-y`}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해 주세요"
            required
            rows={5}
            disabled={busy}
          />
        </label>

        {!isEditing && (
          <label className="block text-sm font-semibold text-slate-700">
            작성자
            <input
              className={inputStyle}
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="이름을 입력해 주세요"
              required
              maxLength={40}
              disabled={busy}
            />
          </label>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            취소
          </button>

          <button
            type="submit"
            disabled={busy}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
          >
            {busy
              ? '저장 중...'
              : isEditing
                ? '수정 완료'
                : '게시글 등록'}
          </button>
        </div>
      </form>
    </section>
  );
}
