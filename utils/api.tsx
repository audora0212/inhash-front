const API_BASE_URL = "http://localhost:8080/api"; // 필요 시 IP/포트를 수정하세요.

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
