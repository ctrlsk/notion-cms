import Link from "next/link";

const NOTION_BLOG_ID =
  process.env.NOTION_BLOG_ID || "e96723d2a2614b6d9bdf0507436361d9";

export type Post = { id: string; slug: string; title: string; date: string };

export const getAllPosts = async (): Promise<Post[]> => {
  return await fetch(
    `https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`
  ).then((res) => res.json());
};

export async function getStaticProps() {
  const posts = await getAllPosts();
  return {
    props: {
      posts,
    },
  };
}

function HomePage({ posts }: { posts: Post[] }) {
  return (
    <div className="content">
      <div className="header">
        <h1>
          <a href="#">
            <span>shashank.work</span>
          </a>
        </h1>

        <ul className="nav">
          <li><a href="">About</a></li>
          <li><a href="">Work</a></li>
          <li><a href="">Design</a></li>
          <li><a href="">Photos</a></li>
        </ul>
      </div>
      
      <div className="aboutme">
        <div className="abouttext">
          <h2>Hi, I'm Shashank Kumar</h2>
          <p>
          A journalist-turned-marketing professional based in Gurugram. I write and edit, research and analyse, and design amazing things. I pride myself on lucid communication and being an easy to work with, friendly guy.
          </p>
        </div>
        <div className="aboutimage">
        </div>
        
      </div>
      <h1>Posts</h1>
      <div>
        {posts.map((post) => (
          <Link href="/blog/[slug]" as={`/blog/${post.slug}`}>
            <a>
              <b>{post.title}</b>
              <div className="sub">{post.description}</div>
              <div className="sub">posted on {post.date}</div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
