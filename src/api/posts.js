import { BASE_URL } from './config.js';

async function request(path, options = {}) {
  let response;

  try {
    response = await fetch(`${BASE_URL}${path}`, options);
  } catch {
    throw new Error('서버에 연결하지 못했습니다. 네트워크 또는 CORS 설정을 확인해 주세요.');
  }

  const text = await response.text();
  let data = null;

  if (text) {
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
  }

  if (!response.ok) {
    const message =
      typeof data === 'object' && data !== null
        ? data.message || data.error
        : null;

    throw new Error(
      message || `요청에 실패했습니다. (HTTP ${response.status})`
    );
  }

  return response.status === 204 ? null : data;
}

export function getPosts() {
  return request('/posts');
}

export function createPost({ title, content, author }) {
  return request('/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, author }),
  });
}

export function updatePost(postId, { title, content }) {
  return request(`/posts/${postId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content }),
  });
}

export function deletePost(postId) {
  return request(`/posts/${postId}`, {
    method: 'DELETE',
  });
}
