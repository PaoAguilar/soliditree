import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import Head from "next/head";
import About from "../src/components/About/About";
import Footer from "../src/components/Footer/Footer";
import Hero from "../src/components/Hero/Hero";
import { Navbar } from "../src/components/Navbar/Navbar";
import Steps from "../src/components/Steps/Steps";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Steps />
        <Footer />
      </main>
    </div>
  );
};

export default Home;
