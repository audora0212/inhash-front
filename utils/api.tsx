const API_BASE_URL = "http://localhost:8080/api"; // 필요 시 IP/포트를 수정하세요.

export async function login(username: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return res.json();
}

export async function register(user: { email: string; username: string; password: string }) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return res.json();
}

export async function fetchSwNotices() {
  const res = await fetch(`${API_BASE_URL}/sw-notices`);
  if (!res.ok) {
    throw new Error("Failed to fetch SW notices");
  }
  return res.json();
}

export async function fetchItContestSites() {
  const res = await fetch(`${API_BASE_URL}/it-contest-sites`);
  if (!res.ok) {
    throw new Error("Failed to fetch IT contest sites");
  }
  return res.json();
}

export async function fetchInternshipInfos() {
  const res = await fetch(`${API_BASE_URL}/internship-infos`);
  if (!res.ok) {
    throw new Error("Failed to fetch internship infos");
  }
  return res.json();
}

export async function fetchPosts() {
  const res = await fetch(`${API_BASE_URL}/posts`);
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  return res.json();
}

export async function fetchJobPostings() {
  const res = await fetch(`${API_BASE_URL}/job-postings`);
  if (!res.ok) {
    throw new Error("Failed to fetch job postings");
  }
  return res.json();
}

export async function fetchPostById(postId: string) {
  const res = await fetch(`${API_BASE_URL}/posts/${postId}`);
  if (!res.ok) {
    throw new Error("Failed to fetch post details");
  }
  return res.json();
}

export async function likePost(postId: string, token: string) {
  const res = await fetch(`${API_BASE_URL}/posts/${postId}/like`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to like post");
  }
  return res.json();
}

export async function addComment(
  postId: string,
  comment: { content: string; authorId: number }, 
  token: string
) {
  const res = await fetch(`${API_BASE_URL}/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(comment),
  });
  if (!res.ok) {
    throw new Error("Failed to add comment");
  }
  return res.json();
}

export async function createPost(
  post: { title: string; content: string; category: string },
  token: string
) {
  const res = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  });
  if (!res.ok) {
    const errorMessage = await res.text();
    throw new Error(errorMessage);
  }
  return res.json();
}

function authHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
}

export async function fetchUserById(id: string) {
  const res = await fetch(`${API_BASE_URL}/users/${id}`, {
    headers: authHeaders()
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}

export async function fetchUserPosts(id: string) {
  const res = await fetch(`${API_BASE_URL}/users/${id}/posts`, {
    headers: authHeaders()
  });
  if (!res.ok) throw new Error("Failed to fetch user posts");
  return res.json();
}

export async function fetchUserComments(id: string) {
  const res = await fetch(`${API_BASE_URL}/users/${id}/comments`, {
    headers: authHeaders()
  });
  if (!res.ok) throw new Error("Failed to fetch user comments");
  return res.json();
}