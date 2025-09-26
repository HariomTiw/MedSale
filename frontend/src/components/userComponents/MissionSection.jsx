import { Heart, Star } from 'lucide-react';

// Mission Section
const MissionSection = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-slate-900 mb-6">
              Our Mission & Vision
            </h2>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full flex items-center justify-center mr-3">
                    <Heart className="w-4 h-4 text-white" />
                  </div>
                  Mission
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  To provide accessible, high-quality pharmaceutical products that improve lives and support healthcare professionals in delivering exceptional patient care across communities.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full flex items-center justify-center mr-3">
                    <Star className="w-4 h-4 text-white" />
                  </div>
                  Vision
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  To become India&apos;s most trusted pharmaceutical partner, known for innovation, quality, and our commitment to advancing healthcare for all.
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Healthcare Mission"
              className="rounded-3xl shadow-xl w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-indigo-500/20 rounded-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
