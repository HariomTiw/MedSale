import { Award, Users } from 'lucide-react';

// Poster Section
const PosterSection = () => {
  return (
    <section className="w-full py-16 md:py-24 bg-gradient-to-r from-teal-500 to-indigo-500">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-6">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-white">
            Committed to Your Health & Wellness
          </h2>
          <p className="mx-auto max-w-[700px] text-teal-50 md:text-lg">
            Every product we deliver is backed by rigorous quality testing, expert pharmaceutical knowledge, and our unwavering commitment to healthcare excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
              <Award className="w-5 h-5 mr-2" />
              Our Certifications
            </button>
            <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-teal-600 transition-all duration-300">
              <Users className="w-5 h-5 mr-2" />
              Meet Our Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


export default PosterSection;
