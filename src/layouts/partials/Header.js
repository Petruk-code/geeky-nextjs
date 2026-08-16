"use client";

import Logo from "@components/Logo";
import config from "@config/config.json";
import menu from "@config/menu.json";
import ThemeSwitcher from "@layouts/components/ThemeSwitcher";
import SearchModal from "@partials/SearchModal";
import { humanize } from "@lib/utils/textConverter";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Header = ({ categories = [] }) => {
  // destructuring the main menu and cta from config
  const { main } = menu;
  const { cta } = config.site;

  // states declaration
  const [searchModal, setSearchModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [query, setQuery] = useState("");

  // Pathname
  const pathname = usePathname();
  const router = useRouter();

  // stop scrolling when nav is open
  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [showMenu]);

  // inject dynamic "Topik" dropdown after the About link
  const navItems = [];
  main.forEach((item) => {
    navItems.push(item);
    if (item.url === "/about") {
      navItems.push({
        name: "Topik",
        hasChildren: true,
        children: categories.map((category) => ({
          name: category.title || humanize(category),
          url: `/categories/${category.slug || category}`,
        })),
      });
    }
  });

  const submitSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?key=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <header className="header sticky top-0">
      <nav className="navbar container">
        <div className="order-0">
          <Logo />
        </div>
        <div className="flex items-center gap-x-3 xl:gap-x-5">
          <div
            className={`collapse-menu ${
              !showMenu && "translate-x-full"
            } lg:flex lg:translate-x-0`}
          >
            <button
              className="absolute right-4 top-4 lg:hidden"
              onClick={() => setShowMenu(false)}
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <title>Tutup Menu</title>
                <polygon
                  points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                  transform="rotate(45 10 10)"
                />
              </svg>
            </button>
            <ul
              id="nav-menu"
              className="navbar-nav w-full md:w-auto md:space-x-1 lg:flex xl:gap-x-1 xl:space-x-0"
            >
              {navItems.map((item, i) => (
                <React.Fragment key={`menu-${i}`}>
                  {item.hasChildren ? (
                    <li className="nav-item nav-dropdown group relative">
                      <span
                        className={`nav-link ${
                          item.children
                            .map((c) => c.url)
                            .includes(pathname) && "active"
                        } inline-flex items-center`}
                      >
                        {item.name}
                        <svg
                          className="h-4 w-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </span>
                      <ul className="nav-dropdown-list">
                        {item.children.map((child, i) => (
                          <li
                            className="nav-dropdown-item"
                            key={`children-${i}`}
                          >
                            <Link
                              href={child.url}
                              onClick={() => setShowMenu(false)}
                              className={`nav-dropdown-link block ${
                                pathname === child.url && "active"
                              }`}
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <Link
                        href={item.url}
                        onClick={() => setShowMenu(false)}
                        className={`nav-link block ${
                          pathname === item.url && "active"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </div>

          {/* desktop search */}
          <form onSubmit={submitSearch} className="relative hidden md:block">
            <IoSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-light dark:text-darkmode-text" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cari tutorial..."
              aria-label="Cari"
              className="h-9 w-36 rounded-full border border-border bg-light/60 pl-9 pr-3 text-sm text-text-dark outline-none transition focus:border-primary focus:bg-body dark:border-darkmode-border dark:bg-darkmode-dark/40 dark:text-darkmode-text-light dark:focus:bg-darkmode-body xl:w-52"
            />
          </form>

          <ThemeSwitcher />

          {/* mobile search icon */}
          <div
            className="search-icon md:hidden"
            onClick={() => setSearchModal(true)}
          >
            <IoSearch />
          </div>

          {/* CTA button */}
          {cta?.enable && (
            <Link
              href={cta.link}
              className="hidden items-center rounded-full bg-primary px-4 py-2 text-sm font-bold text-white transition hover:opacity-90 md:inline-flex"
            >
              {cta.label}
            </Link>
          )}

          <button
            onClick={() => setShowMenu(!showMenu)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-white lg:hidden"
            aria-label="Buka/Tutup Menu"
          >
            {showMenu ? (
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <title>Tutup Menu</title>
                <polygon
                  points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                  transform="rotate(45 10 10)"
                />
              </svg>
            ) : (
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <title>Buka Menu</title>
                <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
              </svg>
            )}
          </button>
        </div>

        <SearchModal
          searchModal={searchModal}
          setSearchModal={setSearchModal}
        />
      </nav>
      {showMenu && (
        <div className="header-backdrop absolute top-0 left-0 h-screen w-full bg-black/50 lg:hidden"></div>
      )}
    </header>
  );
};

export default Header;
