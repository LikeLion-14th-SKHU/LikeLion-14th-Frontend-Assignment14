import { useState } from "react";
import usePosts from "./hooks/usePosts";

import MailboxPage from "./pages/MailboxPage";
import LetterPage from "./pages/LetterPage";
import LetterEditorPage from "./pages/LetterEditorPage";
import AuthorCheckModal from "./components/AuthorCheckModal";

export default function App() {
  const board = usePosts();

  const [selectedId, setSelectedId] = useState(null);
  const [verifyAction, setVerifyAction] = useState(null);

  const active = board.posts.find(
    (post) => post.id === selectedId
  );

  const goHome = () => {
    board.setShowForm(false);
    setSelectedId(null);
    setVerifyAction(null);
    board.loadPosts();
  };

  const beginNew = () => {
    board.openNew();
    setSelectedId(null);
  };

  const submit = async (event) => {
    const succeeded = await board.handleSubmit(event);

    if (succeeded) {
      goHome();
    }
  };

  const confirmAuthor = async () => {
    if (!active) return;

    if (verifyAction === "edit") {
      board.openEdit(active);
    } else if (verifyAction === "delete") {
      const deleted = await board.handleDelete(active);

      if (deleted) {
        goHome();
      }
    }

    setVerifyAction(null);
  };

  return (
    <main className="site">
      <header className="masthead">
        <button className="brand" onClick={goHome}>
          dear, someone
        </button>
      </header>

      {board.showForm ? (
        <LetterEditorPage
          board={board}
          onBack={goHome}
          onSubmit={submit}
        />
      ) : active ? (
        <LetterPage
          post={active}
          onBack={goHome}
          onEdit={() => setVerifyAction("edit")}
          onDelete={() => setVerifyAction("delete")}
        />
      ) : (
        <MailboxPage
          posts={board.posts}
          onNew={beginNew}
          onOpen={setSelectedId}
        />
      )}

      {verifyAction && active && (
        <AuthorCheckModal
          post={active}
          action={verifyAction}
          onConfirm={confirmAuthor}
          onClose={() => setVerifyAction(null)}
        />
      )}
    </main>
  );
}
