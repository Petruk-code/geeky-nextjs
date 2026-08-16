import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { BsArrowRightShort } from "react-icons/bs";
import { FaEnvelope, FaMapMarkerAlt, FaUserAlt } from "react-icons/fa";
import ImageFallback from "./components/ImageFallback";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, form_action, phone, mail, location } = frontmatter;

  return (
    <section className="section lg:mt-4">
      <div className="container">
        <div className="row relative pb-8">
          <ImageFallback
            className="-z-[1] object-cover object-top"
            src={"/images/map.svg"}
            fill="true"
            alt="map bg"
            priority={true}
          />
          <div className="lg:col-6">
            {markdownify(
              title,
              "h1",
              "my-4 text-center lg:text-left lg:text-[48px]"
            )}
          </div>
          <div className="contact-form-wrapper rounded border border-border p-5 dark:border-darkmode-border lg:col-6">
            <h2>
              Kirim Pesan
              <span className="ml-1.5 inline-flex items-center text-primary">
                Untuk Kami
                <BsArrowRightShort />
              </span>
            </h2>
            <form
              className="contact-form mt-6"
              method="POST"
              action={form_action}
            >
              <div className="mb-4">
                <label className="mb-1 block font-secondary" htmlFor="name">
                  Nama Lengkap
                  <small className="font-secondary text-sm text-primary">
                    *
                  </small>
                </label>
                <input
                  className="form-input w-full"
                  name="name"
                  type="text"
                  placeholder="Nama Kamu"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block font-secondary" htmlFor="email">
                  Alamat Email
                  <small className="font-secondary text-sm text-primary">
                    *
                  </small>
                </label>
                <input
                  className="form-input w-full"
                  name="email"
                  type="email"
                  placeholder="nama@gmail.com"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block font-secondary" htmlFor="subject">
                  Subjek
                  <small className="font-secondary text-sm text-primary">
                    *
                  </small>
                </label>
                <input
                  className="form-input w-full"
                  name="subject"
                  type="text"
                  placeholder="Kerja sama iklan"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="mb-1 block font-secondary" htmlFor="message">
                  Pesan Kamu
                  <small className="font-secondary text-sm text-primary">
                    *
                  </small>
                </label>
                <textarea
                  className="form-textarea w-full"
                  name="message"
                  placeholder="Halo, saya ingin menanyakan sesuatu..."
                  rows="7"
                />
              </div>
              <input
                className="btn btn-primary"
                type="submit"
                value="Kirim Sekarang"
              />
            </form>
          </div>
        </div>
        <div className="row">
          {phone && (
            <div className="md:col-6 lg:col-4">
              <Link
                href={`tel:${phone}`}
                className="my-4 flex h-[100px] items-center justify-center
             rounded border border-border p-4 text-primary dark:border-darkmode-border"
              >
                <FaUserAlt />
                <p className="ml-1.5 text-lg font-bold text-text-dark dark:text-darkmode-text-light">
                  {phone}
                </p>
              </Link>
            </div>
          )}
          {mail && (
            <div className="md:col-6 lg:col-4">
              <Link
                href={`mailto:${mail}`}
                className="my-4 flex h-[100px] items-center justify-center
             rounded border border-border p-4 text-primary dark:border-darkmode-border"
              >
                <FaEnvelope />
                <p className="ml-1.5 text-lg font-bold text-text-dark dark:text-darkmode-text-light">
                  {mail}
                </p>
              </Link>
            </div>
          )}
          {location && (
            <div className="md:col-6 lg:col-4">
              <span
                className="my-4 flex h-[100px] items-center justify-center
             rounded border border-border p-4 text-primary dark:border-darkmode-border"
              >
                <FaMapMarkerAlt />
                <p className="ml-1.5 text-lg font-bold text-text-dark dark:text-darkmode-text-light">
                  {location}
                </p>
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
