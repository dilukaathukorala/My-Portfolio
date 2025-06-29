import { Geist, Geist_Mono } from "next/font/google";
import styles from '../styles/Home.module.css';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <section className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
      <img src="/images/Portfolio.jpg" alt="Portfolio Logo" className={styles.logo} />
    </section>
  );
}
