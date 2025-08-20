import Navbar from "./components/(navbar)/navbar";
import Hero from "./home/Hero";

function Home() {
  return (
    <main>
      {/* NavBar */}
      <Navbar />

      {/* Hero Section */} 
      <Hero/> 
    </main>
  );
}

export default Home;
