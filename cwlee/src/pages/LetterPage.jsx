export default function LetterPage({
    post,
    onBack,
    onEdit,
    onDelete,
}) {
    return (
        <section className="reading">
            <button className="back" onClick={onBack}>
                ← 편지함으로 돌아가기
            </button>

            <article className="paper">
                <div className="paper-top">
                    <span>DEAR, SOMEONE</span>
                </div>

                <h2>{post.title}</h2>

                <div className="letter-body">{post.content}</div>

                <p className="signature">from. anonymous</p>

                <div className="actions">
                    <button className="secondary" onClick={onEdit}>
                        수정하기
                    </button>

                    <button
                        className="secondary danger"
                        onClick={onDelete}
                    >
                        삭제하기
                    </button>
                </div>
            </article>
        </section>
    );
}
