
export default function LetterEditorPage({
    board,
    onBack,
    onSubmit,
}) {
    const isNew = board.editingId === null;

    return (
        <section className="reading">
            <button className="back" onClick={onBack}>
                ← 편지함으로 돌아가기
            </button>

            <div className="paper">
                <div className="paper-top">
                    <span>{isNew ? "새 편지 작성" : "편지 수정"}</span>
                </div>

                <form className="letter-form" onSubmit={onSubmit}>
                    <input
                        className="title-input"
                        placeholder="편지 제목을 적어주세요"
                        aria-label="편지 제목"
                        value={board.title}
                        onChange={(e) => board.setTitle(e.target.value)}
                        maxLength={100}
                        required
                    />

                    <textarea
                        className="body-input"
                        placeholder="마음을 담아 편지를 써주세요"
                        aria-label="편지 내용"
                        value={board.content}
                        onChange={(e) => board.setContent(e.target.value)}
                        maxLength={1000}
                        rows={10}
                        required
                    />

                    {isNew && (
                        <div className="author-field">
                            <label htmlFor="author">
                                작성자 이름
                                <small>
                                    게시판에 공개되지 않으며,
                                    수정·삭제할 때 필요해요.
                                </small>
                            </label>

                            <input
                                id="author"
                                value={board.author}
                                onChange={(e) => board.setAuthor(e.target.value)}
                                maxLength={20}
                                placeholder="작성자 이름"
                                required
                            />
                        </div>
                    )}

                    <div className="actions">
                        <button
                            type="button"
                            className="secondary"
                            onClick={onBack}
                        >
                            취소
                        </button>

                        <button type="submit" className="primary">
                            {isNew ? "편지 보내기" : "수정 완료"}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}
