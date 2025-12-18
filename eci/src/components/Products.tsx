import Base from "./Base";

export default function Products() {
  return (
     <Base>
    <section
      id="products"
      className="relative bg-zinc-900 text-white overflow-hidden"
    >
     {/* gradient background */}
      <div className="pointer-events-none absolute inset-0">
        {/* Large gradient orbs */}
        <div className="absolute top-0 left-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-cyan-500/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-blue-600/20 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-blue-600/10 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-transparent to-zinc-900" />
      </div>
     
        <div id="products" className="h-screen">
            <h1>products</h1>
        </div>
     
    </section>
     </Base>
  );
}
