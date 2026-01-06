export default function Solutions() {
  return (
    <section id="solutions" className="py-20 bg-zinc-900 text-white">
        <div className="container mx-auto px-6 lg:px-20">
            <h2 className="text-4xl font-bold mb-8 text-center">Our Solutions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Solution 1 */}
                <div className="bg-zinc-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
                    <h3 className="text-2xl font-semibold mb-4">Magic Software</h3>
                    <p className="text-zinc-300">
                        Our proprietary software solutions streamline operations and enhance productivity.
                    </p>
                </div>
                {/* Solution 2 */}
                <div className="bg-zinc-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
                    <h3 className="text-2xl font-semibold mb-4">Actian Zen (PSQL)</h3>
                    <p className="text-zinc-300">
                        A robust database management system designed for high performance and reliability.
                    </p>
                </div>
                {/* Solution 3 */}
                <div className="bg-zinc-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition">
                    <h3 className="text-2xl font-semibold mb-4">Custom Integrations</h3>
                    <p className="text-zinc-300">
                        Tailored integration services to connect disparate systems and improve workflow.
                    </p>
                </div>
            </div>
        </div>
    </section>
  );
}