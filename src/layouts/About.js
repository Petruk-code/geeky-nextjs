import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import MDXContent from "./partials/MDXContent";

const About = ({ data }) => {
  const { frontmatter, content } = data;
  const { title, image, education, experience } = frontmatter;

  return (
    <section className="section">
      <div className="container text-center">
        {image && (
          <div className="mb-4">
            <Image
              src={image}
              width={1298}
              height={616}
              alt={title}
              className="rounded-lg"
              priority={true}
            />
          </div>
        )}
        {markdownify(title, "h1", "h1 text-left mt-6 lg:text-[48px]")}

        <div className="content text-left">
          <MDXContent content={content} />
        </div>

        <div className="row mt-12 text-left lg:flex-nowrap">
          <div className="lg:col-6 ">
            <div className="rounded border border-border p-5 dark:border-darkmode-border ">
              {markdownify(education.title, "h2", "section-title")}
              <div className="row">
                {education.degrees.map((degree, index) => (
                  <div className="mb-5 md:col-6" key={"degree-" + index}>
                    <h4 className="text-base lg:text-[20px]">
                      {degree.university}
                    </h4>
                    <p className="mt-2">{degree.content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="experience mt-8 lg:mt-0 lg:col-6">
            <div className="rounded border border-border p-5 dark:border-darkmode-border ">
              {markdownify(experience.title, "h2", "section-title")}
              <ul className="row">
                {experience?.list?.map((item, index) => (
                  <li
                    className="mb-3 text-base font-bold text-text-dark dark:text-darkmode-text-light lg:col-6"
                    key={"experience-" + index}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
