import { Heart, Shield, Award, Users } from 'lucide-react';

// Branding Section
const BrandingSection = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-slate-900 mb-4">
            Our Core Values
          </h2>
          <p className="mx-auto max-w-[600px] text-slate-600 md:text-lg">
            The principles that guide everything we do at Vijaya Pharmaceuticals.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="group text-center p-6 rounded-3xl bg-gradient-to-br from-teal-50 to-teal-100 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Care</h3>
            <p className="text-slate-600">Putting patient health and wellbeing at the center of everything we do.</p>
          </div>

          <div className="group text-center p-6 rounded-3xl bg-gradient-to-br from-indigo-50 to-indigo-100 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Quality</h3>
            <p className="text-slate-600">Maintaining the highest standards in every product and service we provide.</p>
          </div>

          <div className="group text-center p-6 rounded-3xl bg-gradient-to-br from-violet-50 to-violet-100 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Excellence</h3>
            <p className="text-slate-600">Continuously improving and innovating to exceed expectations.</p>
          </div>

          <div className="group text-center p-6 rounded-3xl bg-gradient-to-br from-emerald-50 to-emerald-100 hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Trust</h3>
            <p className="text-slate-600">Building lasting relationships through transparency and reliability.</p>
          </div>
        </div>
      </div>
    </section>
  );
};


export default BrandingSection;
