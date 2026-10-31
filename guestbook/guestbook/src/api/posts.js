import { BASE_URL } from "./config";

async function readResponse(res) {
  if (!res.ok) {
    const error = await res.json().catch(() => null);
    throw new Error(error?.message || `요청에 실패했습니다. (HTTP ${res.status})`);
  }
  if (res.status === 204) return;
  return res.json();
}

export async function getPosts() {
  const res = await fetch(`${BASE_URL}/posts`);
  return readResponse(res);
}

export async function createPost(post) {
  const res = await fetch(`${BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return readResponse(res);
}

export async function updatePost(postId, post) {
  const res = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post),
  });
  return readResponse(res);
}

export async function deletePost(postId) {
  const res = await fetch(`${BASE_URL}/posts/${postId}`, {
    method: "DELETE",
  });
  await readResponse(res);
}
