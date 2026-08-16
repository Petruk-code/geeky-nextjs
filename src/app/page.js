import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import Pagination from "@layouts/components/Pagination";
import Post from "@layouts/partials/Post";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { getTaxonomy, getCategoryMeta } from "@lib/taxonomyParser";
import dateFormat from "@lib/utils/dateFormat";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";

const { blog_folder, pagination } = config.settings;

const Home = async () => {
  const homepage = await getListPage("src/content/_index.md");
  const { frontmatter } = homepage;
  const {
    banner,
    categories_section,
    featured_posts,
    recent_posts,
    promotion,
    newsletter,
  } = frontmatter;
  const posts = getSinglePage(`src/content/${blog_folder}`);
  const categories = getTaxonomy(`src/content/${blog_folder}`, "categories");
  const categoryMeta = getCategoryMeta();

  const categoriesWithPostsCount = categories.map((category) => {
    const filteredPosts = posts.filter((post) =>
      post.frontmatter.categories.includes(category)
    );
    const metaItem = categoryMeta.find((item) => item.slug === category);
    return {
      name: category,
      title: metaItem?.title || category,
      description: metaItem?.description || "",
      image: metaItem?.image || "",
      posts: filteredPosts.length,
    };
  });

  const sortPostByDate = sortByDate(posts);
  const featuredPosts = sortPostByDate.filter((post) => post.frontmatter.featured);
  const showPosts = pagination;

  return (
    <>
      {/* Banner */}
      <section className="section banner relative pb-0">
        <ImageFallback
          className="absolute bottom-0 left-0 z-[-1] w-full"
          src={"/images/banner-bg-shape.svg"}
          width={1905}
          height={295}
          alt="banner-shape"
          priority
        />

        <div className="container">
          <div className="row flex-wrap-reverse items-center justify-center lg:flex-row">
            <div
              className={
                banner.image_enable
                  ? "mt-8 text-center lg:mt-0 lg:text-left lg:col-6"
                  : "mt-8 text-center lg:mt-0 lg:text-left lg:col-12"
              }
            >
              <div className="banner-title">
                {markdownify(banner.title, "h1")}
                {markdownify(banner.title_small, "span")}
              </div>
              {markdownify(banner.content, "p", "mt-2")}
              {banner.button.enable && (
                <Link
                  className="btn btn-primary mt-4"
                  href={banner.button.link}
                  rel={banner.button.rel}
                >
                  {banner.button.label}
                </Link>
              )}
            </div>
            {banner.image_enable && (
              <div className="col-9 lg:col-6">
                <ImageFallback
                  className="mx-auto object-contain"
                  src={banner.image}
                  width={548}
                  height={443}
                  priority={true}
                  alt="Gambar Banner"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Kategori */}
      {categories_section.enable && (
        <section className="section">
          <div className="container">
            <div className="text-center">
              {markdownify(
                categories_section.title,
                "h2",
                "mb-2 text-center text-2xl font-bold md:text-3xl"
              )}
              {markdownify(
                categories_section.content,
                "p",
                "text-text-light dark:text-darkmode-text"
              )}
            </div>
            <div className="row justify-center">
              {categoriesWithPostsCount.map((category) => (
                <div className="mb-6 md:col-6 lg:col-4" key={category.name}>
                  <Link
                    href={`/categories/${category.name}`}
                    className="group block h-full overflow-hidden rounded-xl border border-border bg-body transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10 dark:border-darkmode-border dark:bg-darkmode-dark"
                  >
                    <div className="relative h-40 overflow-hidden">
                      {category.image && (
                        <ImageFallback
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          src={category.image}
                          alt={category.title}
                          width={400}
                          height={225}
                        />
                      )}
                      <span className="absolute right-3 top-3 rounded-full bg-body/90 px-3 py-1 text-xs font-bold text-primary backdrop-blur dark:bg-darkmode-body/90">
                        {category.posts} artikel
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-bold text-text-dark dark:text-darkmode-text-light">
                        {category.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-text-light dark:text-darkmode-text">
                        {category.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                        Baca Tutorial
                        <span aria-hidden="true">&rarr;</span>
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Postingan unggulan */}
      {featured_posts.enable && (
        <section className="section">
          <div className="container">
            <div className="text-center">
              {markdownify(
                featured_posts.title,
                "h2",
                "mb-2 text-center text-2xl font-bold md:text-3xl"
              )}
            </div>
            <div className="rounded border border-border p-5 dark:border-darkmode-border">
              <div className="row">
                <div className="md:col-6">
                  <Post post={featuredPosts[0]} />
                </div>
                <div className="scrollbar scrollbar-w-2.5 mt-6 max-h-100 overflow-y-auto scrollbar-thin scrollbar-track-gray-100 scrollbar-thumb-border dark:scrollbar-track-gray-800 dark:scrollbar-thumb-darkmode-dark md:mt-0 md:col-6">
                  {featuredPosts
                    .slice(1, featuredPosts.length)
                    .map((post, i, arr) => (
                      <div
                        className={`mb-4 flex items-center pb-4 ${
                          i !== arr.length - 1 &&
                          "border-b border-border dark:border-darkmode-border"
                        }`}
                        key={`key-${i}`}
                      >
                        {post.frontmatter.image && (
                          <ImageFallback
                            className="mr-3 h-16 w-16 shrink-0 rounded object-cover"
                            src={post.frontmatter.image}
                            alt={post.frontmatter.title}
                            width={105}
                            height={85}
                          />
                        )}
                        <div>
                          <h3 className="mb-1 line-clamp-2 text-sm font-bold">
                            <Link
                              href={`/${blog_folder}/${post.slug}`}
                              className="block hover:text-primary"
                            >
                              {post.frontmatter.title}
                            </Link>
                          </h3>
                          <p className="inline-flex items-center text-xs font-bold">
                            <FaRegCalendar className="mr-1.5" />
                            {dateFormat(post.frontmatter.date)}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Promotion */}
      {promotion.enable && (
        <section className="section">
          <div className="container">
            <Link href={promotion.link} className="block">
              <ImageFallback
                className="h-full w-full"
                height="115"
                width="800"
                src={promotion.image}
                alt="promotion"
              />
            </Link>
          </div>
        </section>
      )}

      {/* Postingan terbaru */}
      {recent_posts.enable && (
        <section className="section">
          <div className="container">
            <div className="text-center">
              {markdownify(
                recent_posts.title,
                "h2",
                "mb-2 text-center text-2xl font-bold md:text-3xl"
              )}
            </div>
            <div className="row">
              {sortPostByDate.slice(0, showPosts).map((post) => (
                <div className="mb-6 md:col-6" key={post.slug}>
                  <Post post={post} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Newsletter */}
      {newsletter.enable && (
        <section id="newsletter" className="section">
          <div className="container">
            <div className="mx-auto max-w-2xl rounded-xl border border-border bg-light p-8 text-center dark:border-darkmode-border dark:bg-darkmode-dark">
              <h2 className="text-2xl font-bold text-text-dark dark:text-darkmode-text-light">
                {newsletter.title}
              </h2>
              {markdownify(newsletter.content, "p", "mt-3")}
              <form
                action={newsletter.form_action}
                method="POST"
                className="mt-6 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={newsletter.placeholder}
                  className="w-full rounded-full border border-border bg-body px-5 py-2.5 text-sm outline-none focus:border-primary dark:border-darkmode-border dark:bg-darkmode-body dark:text-darkmode-text-light"
                />
                <button type="submit" className="btn btn-primary shrink-0">
                  {newsletter.button}
                </button>
              </form>
              <p className="mt-3 text-xs text-text-light dark:text-darkmode-text">
                Dengan mendaftar, kamu menyetujui{" "}
                <Link
                  href="/kebijakan-privasi"
                  className="font-semibold text-primary"
                >
                  Kebijakan Privasi
                </Link>
              </p>
            </div>
          </div>
        </section>
      )}

      <Pagination
        totalPages={Math.ceil(posts.length / showPosts)}
        currentPage={1}
      />
    </>
  );
};

export default Home;
