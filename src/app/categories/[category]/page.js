import config from "@config/config.json";
import SeoMeta from "@layouts/partials/SeoMeta";
import Sidebar from "@layouts/partials/Sidebar";
import ImageFallback from "@layouts/components/ImageFallback";
import { getSinglePage } from "@lib/contentParser";
import { getCategoryMeta, getTaxonomy } from "@lib/taxonomyParser";
import dateFormat from "@lib/utils/dateFormat";
import { slugify } from "@lib/utils/textConverter";
import { sortByDate } from "@lib/utils/sortFunctions";
import Post from "@partials/Post";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";

const { blog_folder } = config.settings;

export const generateStaticParams = async () => {
  const allCategories = getTaxonomy(`src/content/${blog_folder}`, "categories");
  return allCategories.map((category) => ({
    category: category,
  }));
};

const Category = async ({ params }) => {
  const { category } = await params;
  const posts = getSinglePage(`src/content/${blog_folder}`);
  const filterPosts = sortByDate(
    posts.filter((post) =>
      post.frontmatter.categories.find((cat) => slugify(cat).includes(category))
    )
  );
  const categories = getTaxonomy(`src/content/${blog_folder}`, "categories");
  const meta = getCategoryMeta().find((item) => item.slug === category);
  const allCategoryMeta = getCategoryMeta();

  const categoriesWithPostsCount = categories.map((cat) => {
    const filteredPosts = posts.filter((post) =>
      post.frontmatter.categories.map((e) => slugify(e)).includes(cat)
    );
    const metaItem = allCategoryMeta.find((item) => item.slug === cat);
    return {
      name: cat,
      title: metaItem?.title || cat,
      posts: filteredPosts.length,
    };
  });

  const latestPosts = filterPosts.slice(0, 2);
  const restPosts = filterPosts.slice(2);

  return (
    <>
      <SeoMeta
        pathname={`/categories/${category}`}
        title={meta?.title || category}
        description={meta?.description}
      />
      <section className="section">
        <div className="container">
          {/* breadcrumb */}
          <nav
            aria-label="Jejak Navigasi"
            className="mb-4 text-sm text-text-light dark:text-darkmode-text"
          >
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="transition hover:text-primary">
                  Beranda
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/categories"
                  className="transition hover:text-primary"
                >
                  Kategori
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li
                aria-current="page"
                className="capitalize font-bold text-primary"
              >
                {meta?.title || category.replace("-", " ")}
              </li>
            </ol>
          </nav>

          {/* header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="h2 capitalize">
                {meta?.title || category.replace("-", " ")}
              </h1>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
                {filterPosts.length} artikel
              </span>
            </div>
            {meta?.description && (
              <p className="mt-2 max-w-2xl text-text-light dark:text-darkmode-text">
                {meta.description}
              </p>
            )}
          </div>

          <div className="row">
            <div className="lg:col-8">
              {/* latest posts */}
              {latestPosts.length > 0 && (
                <>
                  <h2 className="section-title text-lg">Postingan Terbaru</h2>
                  <div className="row">
                    {latestPosts.map((post) => (
                      <div className="mt-4 sm:col-6" key={post.slug}>
                        <Link
                          href={`/${blog_folder}/${post.slug}`}
                          className="group block"
                        >
                          <div className="relative overflow-hidden rounded-lg">
                            {post.frontmatter.image && (
                              <ImageFallback
                                className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                src={post.frontmatter.image}
                                alt={post.frontmatter.title}
                                width={400}
                                height={280}
                              />
                            )}
                          </div>
                          <h3 className="mt-3 line-clamp-2 text-base font-bold hover:text-primary">
                            {post.frontmatter.title}
                          </h3>
                          <p className="mt-1 inline-flex items-center font-secondary text-xs">
                            <FaRegCalendar className="mr-1.5" />
                            {dateFormat(post.frontmatter.date)}
                          </p>
                        </Link>
                      </div>
                    ))}
                  </div>
                </>
              )}

              {/* all posts */}
              {restPosts.length > 0 && (
                <>
                  <h2 className="section-title mt-8 text-lg">Semua Postingan</h2>
                  <div className="row">
                    {restPosts.map((post, i) => (
                      <div key={`key-${i}`} className="mt-4 sm:col-6">
                        <Post post={post} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            <Sidebar posts={posts} categories={categoriesWithPostsCount} />
          </div>
        </div>
      </section>
    </>
  );
};

export default Category;
