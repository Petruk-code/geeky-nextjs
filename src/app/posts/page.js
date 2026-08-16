import config from "@config/config.json";
import Pagination from "@layouts/components/Pagination";
import SeoMeta from "@layouts/partials/SeoMeta";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Post from "@partials/Post";

const { blog_folder } = config.settings;

const PostsPage = async () => {
  const { pagination } = config.settings;
  const posts = getSinglePage(`src/content/${blog_folder}`);
  const postIndex = await getListPage(`src/content/${blog_folder}/_index.md`);

  const currentPage = 1;
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const orderedPosts = sortByDate(posts);
  const currentPosts = orderedPosts.slice(indexOfFirstPost, indexOfLastPost);
  const { frontmatter } = postIndex;
  const { title } = frontmatter;
  const totalPages = Math.ceil(posts.length / pagination);

  return (
    <>
      <SeoMeta pathname="/posts" title={title} />
      <section className="section">
        <div className="container">
          {markdownify(title, "h1", "h2 mb-6 text-center")}
          <div className="row mb-8">
            {currentPosts.map((post, i) => (
              <div className="mt-8 lg:col-6" key={post.slug}>
                <Post post={post} />
              </div>
            ))}
          </div>
          <Pagination totalPages={totalPages} currentPage={currentPage} />
        </div>
      </section>
    </>
  );
};

export default PostsPage;
