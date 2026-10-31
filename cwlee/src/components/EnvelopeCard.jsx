export default function EnvelopeCard({
    title,
    isNew = false,
    onClick,
}) {
    return (
        <button
            type="button"
            className={`envelope-card ${isNew ? "envelope-new" : ""}`}
            onClick={onClick}
        >
            <span className="envelope-body">
                <span className="envelope-flap" />
                <span className="envelope-fold-left" />
                <span className="envelope-fold-right" />
                <span className="envelope-fold-bottom" />

                {!isNew && <span className="envelope-seal">✦</span>}

                {isNew && <span className="envelope-plus">+</span>}
            </span>

            <span className="envelope-title">
                {isNew ? "새 편지 쓰기" : title}
            </span>
        </button>
    );
}
