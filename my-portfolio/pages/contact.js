import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Contact() {
  return (
    <>
      <Navbar />
      <main className="max-w-3xl mx-auto p-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
        <p className="text-gray-700">You can reach me at:</p>
        <p className="mt-2 text-blue-600 font-semibold">leo@example.com</p>
        <p className="mt-1 text-gray-600">Or connect on LinkedIn / GitHub (add links here later)</p>
      </main>
      <Footer />
    </>
  );
}
