import config from "@config/config.json";
import { sortByDate } from "@lib/utils/sortFunctions";
import Link from "next/link";

const { blog_folder } = config.settings;

const InnerPagination = ({ posts, date }) => {
  const orderedPosts = sortByDate(posts);
  const lastIndex = orderedPosts.length - 1;
  const postIndex = orderedPosts.findIndex(
    (post) => post.frontmatter.date == date
  );
  const next = postIndex == 0 ? undefined : orderedPosts[postIndex - 1].slug;
  const prev =
    postIndex == lastIndex ? undefined : orderedPosts[postIndex + 1].slug;
  const prevButton = prev && (
    <Link
      href={`/${blog_folder}/${prev}`}
      className={"btn btn-primary"}
    >
      Sebelumnya
    </Link>
  );
  const nextButton = next && (
    <Link
      href={`/${blog_folder}/${next}`}
      className={"btn btn-primary"}
    >
      Berikutnya
    </Link>
  );

  return (
    <div className="row">
      <span className="col">{prevButton}</span>
      <span className="col-8" />
      <span className="col">{nextButton}</span>
    </div>
  );
};

export default InnerPagination;
