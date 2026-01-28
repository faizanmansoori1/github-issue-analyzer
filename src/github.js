import axios from "axios";

export async function fetchOpenIssues(repo) {
  try {
    let page = 1;
    let issues = [];

    while (true) {
      const response = await axios.get(
        `https://api.github.com/repos/${repo}/issues`,
        {
          params: {
            state: "open",
            per_page: 100,
            page,
          },
          headers: {
            "User-Agent": "Issue-Scanner",
            ...(process.env.GITHUB_TOKEN && {
              Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            }),
          },
        },
      );

      if (response.data.length === 0) break;

      const onlyIssues = response.data.filter((issue) => !issue.pull_request);

      issues.push(...onlyIssues);
      page++;
    }

    return issues;
  } catch (error) {
    console.error("❌ GitHub API Error");
    console.error("Status:", error.response?.status);
    console.error("Data:", error.response?.data);

    throw new Error(
      error.response?.data?.message || "Failed to fetch GitHub issues",
    );
  }
}
