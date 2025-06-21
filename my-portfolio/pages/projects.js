import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Projects() {
  const sampleProjects = [
    { title: 'EMG Robotic Arm', description: 'Prosthetic arm controlled by muscle signals.' },
    { title: 'Blockchain Voting System', description: 'A decentralized voting system built in Rust.' },
    { title: 'AI Medical Assistant', description: 'Suggests doctors based on symptoms and location.' }
  ];

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Projects</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {sampleProjects.map((project, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-md hover:shadow-lg transition">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-gray-600 mt-2">{project.description}</p>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
