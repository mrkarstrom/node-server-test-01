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


router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const post = posts.find((post) => post.id === id);
  if(!post) {
    return res.status(404).json({ error: "Post not found" });
  }
  res.status(200).json(posts.filter((post) => post.id === id));

});

export default router;