import { useState } from "react";

export default function AuthorCheckModal({
    post,
    action,
    onConfirm,
    onClose,
}) {
    const [name, setName] = useState("");
    const [error, setError] = useState("");

    const handleCheck = (event) => {
        event.preventDefault();

        if (name.trim() !== post.author) {
            setError("작성자 이름이 일치하지 않습니다.");
            return;
        }

        onConfirm();
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className="author-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="author-modal-title"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    type="button"
                    className="modal-close"
                    onClick={onClose}
                    aria-label="닫기"
                >
                    ×
                </button>

                <div className="modal-icon">✉</div>

                <h2 id="author-modal-title">작성자 확인</h2>

                <p>
                    편지를 {action === "edit" ? "수정" : "삭제"}하려면
                    <br />
                    작성할 때 입력한 이름을 알려주세요.
                </p>

                <form onSubmit={handleCheck}>
                    <input
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                            setError("");
                        }}
                        placeholder="작성자 이름"
                        maxLength={20}
                        autoFocus
                        required
                    />

                    {error && <p className="form-error">{error}</p>}

                    <div className="modal-actions">
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={onClose}
                        >
                            취소
                        </button>

                        <button type="submit" className="btn-primary">
                            확인
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
