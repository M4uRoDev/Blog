export default async function handler(req, res) {
    const token = process.env.GITHUB_TOKEN; // Variable de entorno segura
    const apiUrl = "https://api.github.com/repos/M4uRoDev/Blog/commits";
  
    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "X-Github-Api-Version": "2022-11-28",
      },
    });
  
    if (!response.ok) {
      return res.status(response.status).json({ error: response.statusText });
    }
  
    const data = await response.json();
    res.status(200).json(data);
  }
  