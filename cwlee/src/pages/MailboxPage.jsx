
import EnvelopeCard from "../components/EnvelopeCard";

export default function MailboxPage({ posts, onNew, onOpen }) {
    return (
        <section className="mailbox">
            <h1>마음을 담은 편지함</h1>
            <p className="subtitle">
                전하고 싶은 이야기를 익명으로 남겨보세요.
            </p>

            <div className="envelope-grid">
                <EnvelopeCard isNew onClick={onNew} />

                {posts.map((post) => (
                    <EnvelopeCard
                        key={post.id}
                        title={post.title}
                        onClick={() => onOpen(post.id)}
                    />
                ))}
            </div>

            {posts.length === 0 && (
                <p className="empty">
                    아직 도착한 편지가 없어요.
                </p>
            )}
        </section>
    );
}
