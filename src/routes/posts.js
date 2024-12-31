import e from "express";

const router = e.Router();
let posts = [
    {
        id: 1,
        title: "Post 1",
        content: "This is the first post",
    },
    {
        id: 2,
        title: "Post 2",
        content: "This is the second post",
    },
    {
        id: 3,
        title: "Post 3",
        content: "This is the third post",
    },
]

router.get("/", (req, res) => {
    const limit = parseInt(req.query.limit) || 2;
    if(!isNaN(limit) && limit > 0) {
        const limitedPosts = posts.slice(0, limit);
        const links = limitedPosts.map((post) => 
            `<a href="/api/posts/${post.id}">${post.title}</a>`
        );

    return res.status(200).send(`<h1>Posts</h1>
                <ul>${links.map((link) => `<li>${link}</li>`).join('')}</ul>
                <p>Click on a post to view</p>`);
    }
    res.status(200).json(posts);
}); 

router.get("/titles", (req, res) => {
    const links = posts.map((post) => 
        `<a href="/api/posts/${post.id}">${post.title}</a>`
    );
    res
      .status(200)
      .send(`
        <h1>Posts</h1>
        <ul>${links.map((link) => `<li>${link}</li>`).join('')}</ul>
        <p>Click on a post to view</p>
        `);
}); 



router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if(!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.status(200).send(`
    <h1>${post.title}</h1>
    <p>${post.content}</p>
    <a href="/api/posts">Back</a>
    `);
});

export default router;