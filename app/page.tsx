import { CoursesInfo } from "./(components)/(common)/data";
import Navbar from "./(components)/(navbar)/navbar";
import Brands from "./(sections)/(brands)/brands";
import Empowerment from "./(sections)/(empowerment)/empowerment";
import Hero from "./(sections)/home/Hero";
import ShapeYourFuture from "./(sections)/shape-your-future/shape_your_future";
import Someprograms from "./(sections)/someprograms/someprograms";

function Home() {
  return (
    <>
      {/* NavBar */}
      <Navbar />

      {/* Hero Section */}
      <Hero />

      <Brands />
      <ShapeYourFuture/>

      
      <Someprograms/>
      <Empowerment />
    </>
  );
}

export default Home;
