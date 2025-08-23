import { CoursesInfo } from "./(components)/(common)/data";
import Navbar from "./(components)/(navbar)/navbar";
import Brands from "./(sections)/(brands)/brands";
import Empowerment from "./(sections)/(empowerment)/empowerment";
import Courses from "./(sections)/courses/courses";
import Hero from "./(sections)/home/Hero";
import styles from "./page.module.css";

function Home() {
  return (
    <>
      {/* NavBar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      <Brands />

      <section className={styles.programsBody}>
        <h2>
          <span>Some</span> Programs
        </h2>
        <p>
          Empowering growth through AI innovation and global industry
          transformation
        </p>
        <div className={styles.courses}>
          {CoursesInfo.map((courses) => (
            <Courses
              src={courses.src}
              title={courses.title}
              key={courses.title}
            />
          ))}
        </div>
      </section>
      <Empowerment />
    </>
  );
}

export default Home;
