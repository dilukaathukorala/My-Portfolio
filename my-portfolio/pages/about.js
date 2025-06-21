import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">About Me</h1>
        <p className="text-gray-700 leading-7">
          I'm a final year engineering undergraduate specializing in Robotics and Cybersecurity.
          I enjoy building intelligent systems, learning new technologies, and solving real-world problems.
        </p>
      </main>
      <Footer />
    </>
  );
}
