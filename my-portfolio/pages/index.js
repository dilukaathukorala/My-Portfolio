import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Hi, I'm Leo 👋</h1>
        <p className="text-lg max-w-xl text-gray-600">
          A robotics & cybersecurity enthusiast. I build smart systems and digital experiences.
        </p>
        <img src="/profile.jpg" alt="Leo" className="w-40 h-40 rounded-full mt-6 shadow-lg" />
      </main>
      <Footer />
    </>
  );
}
