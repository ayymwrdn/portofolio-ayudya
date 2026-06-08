import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import Exp from "./components/Exp";
import Project0 from "./components/Project0";
import Projectt from "./components/Projectt";
import Project4 from "./components/Project4";
import Project5 from "./components/Project5";
import Project6 from "./components/Project6";
import Project7 from "./components/Project7";
import Galery1 from "./components/Galery1";

export default function Home() {
  return (
    <main>
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <section id="profile">
        <Profile />
      </section>
      <section id="exp">
        <Exp />
      </section>
      <section id="project">
        <Project0 />
        <Projectt />
        <Project4 />
        <Project5 />
        <Project6 />
        <Project7 />
      </section>
      <section id="gallery">
        <Galery1 />
      </section>
    </main>
  );
}