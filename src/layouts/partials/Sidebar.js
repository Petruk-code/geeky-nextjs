"use client";

import config from "@config/config.json";
import social from "@config/social.json";
import ImageFallback from "@layouts/components/ImageFallback";
import Logo from "@layouts/components/Logo";
import CustomForm from "@layouts/components/NewsLetterForm";
import Social from "@layouts/components/Social";
import dateFormat from "@lib/utils/dateFormat";
import { sortByDate } from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useState } from "react";
import { FaRegCalendar } from "react-icons/fa";
import MailchimpSubscribe from "react-mailchimp-subscribe";
const { blog_folder } = config.settings;
const { about, featured_posts, newsletter } = config.widgets;

const Sidebar = ({ posts, categories, className }) => {
  const sortPostByDate = sortByDate(posts);
  const featuredPosts = sortPostByDate.filter(
    (post) => post.frontmatter.featured
  );

  const [showRecent, setShowRecent] = useState(true);

  return (
    <aside className={`${className} px-0 lg:px-6 lg:col-4`}>
      {about.enable && (
        <div className="relative rounded border border-border p-5 text-center dark:border-darkmode-border">
          <ImageFallback
            className="-z-[1]"
            src="/images/map.svg"
            fill={true}
            alt="bg-map"
          />
          <Logo />
          {markdownify(about.content, "p", "mt-6")}
          <Social
            className="socials sidebar-socials mt-4 justify-center"
            source={social}
          />
        </div>
      )}

      {/* categories widget */}
      {categories.enable && (
        <div className="mt-5 rounded border border-border p-5 dark:border-darkmode-border">
          <h4 className="section-title text-center">
            {featured_posts.title}
          </h4>
          <ul>
            {categories.map((category, i) => (
              <li
                className={`relative mb-1 flex items-center justify-between pl-6 text-[15px] font-bold capitalize text-text-dark dark:text-darkmode-text-light ${
                  i !== categories.length - 1 &&
                  "border-b border-border  dark:border-darkmode-border"
                }`}
                key={i}
              >
                <svg
                  className="absolute left-0 top-2.5"
                  width="18px"
                  height="18px"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.7318 9.35984C12.0854 8.93556 12.7159 8.87824 13.1402 9.2318C13.5645 9.58537 13.6218 10.2159 13.2682 10.6402L8.26825 16.6402C7.91468 17.0645 7.28412 17.1218 6.85984 16.7682C6.43556 16.4147 6.37824 15.7841 6.7318 15.3598L11.7318 9.35984Z"
                    fill="#2ba283"
                  />
                  <path
                    d="M6.7318 4.64021C6.37824 4.21593 6.43556 3.58537 6.85984 3.2318C7.28412 2.87824 7.91468 2.93556 8.26825 3.35984L13.2682 9.35984C13.6218 9.78412 13.5645 10.4147 13.1402 10.7682C12.7159 11.1218 12.0854 11.0645 11.7318 10.6402L6.7318 4.64021Z"
                    fill="#2ba283"
                  />
                </svg>
                <Link className="py-1.5" href={`/categories/${category.name}`}>
                  {category.title || category.name.replace("-", " ")}
                  <span className="absolute top-1/2 right-0 -translate-y-1/2 text-[10px] text-gray-500">
                    {category.posts}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* featured widget */}
      {featured_posts.enable && (
        <div className="mt-5 rounded border border-border p-5 dark:border-darkmode-border">
          <h4 className="section-title text-center">Unggulan</h4>
          <div className="mb-6 flex items-center justify-center">
            <button
              className={`btn px-4 py-2 ${
                showRecent ? "btn-outline-primary" : "btn-primary"
              }`}
              onClick={() => setShowRecent(false)}
            >
              Unggulan
            </button>
            <button
              className={`btn ml-3  px-4 py-2 ${
                showRecent ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => setShowRecent(true)}
            >
              Terbaru
            </button>
          </div>
          {showRecent
            ? sortPostByDate
                .slice(0, featured_posts.showPost)
                .map((post, i, arr) => (
                  <div
                    className={`flex items-center ${
                      i !== arr.length - 1 &&
                      "mb-4 border-b border-border pb-4 dark:border-darkmode-border"
                    }`}
                    key={`key-${i}`}
                  >
                    {post.frontmatter.image && (
                      <ImageFallback
                        className="mr-3 h-16 w-16 shrink-0 rounded-full object-cover"
                        src={post.frontmatter.image}
                        alt={post.frontmatter.title}
                        width={64}
                        height={64}
                      />
                    )}
                    <div>
                      <h3 className="mb-1 line-clamp-2">
                        <Link
                          href={`/${blog_folder}/${post.slug}`}
                          className="block text-sm font-bold hover:text-primary"
                        >
                          {post.frontmatter.title}
                        </Link>
                      </h3>
                      <p className="inline-flex items-center font-secondary text-xs">
                        <FaRegCalendar className="mr-1.5" />
                        {dateFormat(post.frontmatter.date)}
                      </p>
                    </div>
                  </div>
                ))
            : featuredPosts
                .slice(0, featured_posts.showPost)
                .map((post, i, arr) => (
                  <div
                    className={`flex items-center pb-4 ${
                      i !== arr.length - 1 &&
                      "mb-4 border-b dark:border-b-darkmode-border"
                    }`}
                    key={`key-${i}`}
                  >
                    {post.frontmatter.image && (
                      <ImageFallback
                        className="mr-3 h-16 w-16 shrink-0 rounded-full object-cover"
                        src={post.frontmatter.image}
                        alt={post.frontmatter.title}
                        width={64}
                        height={64}
                      />
                    )}
                    <div>
                      <h3 className="mb-1 line-clamp-2">
                        <Link
                          href={`/${blog_folder}/${post.slug}`}
                          className="block text-sm font-bold hover:text-primary"
                        >
                          {post.frontmatter.title}
                        </Link>
                      </h3>
                      <p className="inline-flex items-center font-secondary text-xs">
                        <FaRegCalendar className="mr-1.5" />
                        {dateFormat(post.frontmatter.date)}
                      </p>
                    </div>
                  </div>
                ))}
        </div>
      )}

      {/* newsletter */}
      {newsletter.enable && (
        <div className="mt-5  rounded border border-border p-5 text-center dark:border-darkmode-border">
          <h4 className="section-title">{newsletter.title}</h4>
          <p className="mt-6 text-xs">{newsletter.content}</p>
          <MailchimpSubscribe
            url={newsletter.malichip_url}
            render={({ subscribe, status, message }) => (
              <CustomForm
                onValidated={(formData) => subscribe(formData)}
                status={status}
                message={message}
              />
            )}
          />
          <p className="text-xs">
            Dengan Mendaftar, Kamu Menyetujui
            <Link
              href={newsletter.privacy_policy_page}
              className="ml-1 text-primary"
            >
              Kebijakan Privasi
            </Link>
          </p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
