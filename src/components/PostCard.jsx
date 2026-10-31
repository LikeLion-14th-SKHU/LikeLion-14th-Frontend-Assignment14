export default function PostCard({ post, onClick }) {
    return (
      <button
        type="button"
        onClick={() => onClick(post)}
        className="w-full px-6 py-5 text-left transition hover:bg-slate-50"
      >
        <h2 className="text-base font-semibold text-slate-900">
          {post.title}
        </h2>
  
        <p className="mt-2 line-clamp-1 text-sm text-slate-500">
          {post.content}
        </p>
  
        <p className="mt-3 text-xs text-slate-400">
          {post.author || '알 수 없음'}
        </p>
      </button>
    );
  }
  