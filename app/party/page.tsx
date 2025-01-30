"use client";

export default function PartyPage() {
  return (
    <main className="min-h-screen pt-20 bg-black">
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-12 grid-rows-2 gap-4 h-[calc(100vh-6rem)]">
          {/* Main large image */}
          <div className="col-span-8 row-span-2 relative overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              alt="Party venue"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute bottom-0 left-0 p-6">
              <h1 className="text-4xl font-bold text-white mb-2">Experience the Night</h1>
              <p className="text-white/90 text-lg">Where memories are made and moments are celebrated</p>
            </div>
          </div>

          {/* Top right image */}
          <div className="col-span-4 relative overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1575444758702-4a6b9222336e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="People celebrating"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* Bottom right image */}
          <div className="col-span-4 relative overflow-hidden rounded-xl">
            <img
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
              alt="Indoor venue"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>

        <div className="mt-8 grid md:grid-cols-3 gap-8 text-white">
          <div>
            <h2 className="text-2xl font-bold mb-4">Ambiance</h2>
            <p className="text-white/80">Immerse yourself in our carefully curated atmosphere, where modern elegance meets vibrant energy.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Experience</h2>
            <p className="text-white/80">From intimate gatherings to grand celebrations, we create unforgettable moments.</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Service</h2>
            <p className="text-white/80">Our dedicated team ensures every detail is perfect, letting you focus on enjoying the celebration.</p>
          </div>
        </div>
      </div>
    </main>
  );
}