// import React from 'react';
import { Award, Shield, Users, Handshake } from "lucide-react";

function CompanySection() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <section className="relative w-full py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-indigo-500/10"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-lg mb-6">
              <Handshake className="w-4 h-4 mr-2" />
              Our Trusted Partners
            </div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl text-slate-900 mb-4">
              Leading Pharmaceutical Companies
            </h2>
            <p className="mx-auto max-w-[700px] text-slate-600 md:text-lg">
              We partner with India&apos;s top pharmaceutical manufacturers to
              bring you the highest quality medicines and healthcare products.
            </p>
          </div>

          {/* Company Logos Grid */}
          <div className="grid grid-cols-2 gap-8 text-slate-400 sm:gap-12 md:grid-cols-3 lg:grid-cols-6 mb-16">
            {/* Sun Pharma */}
            <div className="group flex justify-center items-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">SP</span>
                </div>
                <span className="text-xs font-medium text-slate-600 group-hover:text-orange-600 transition-colors">
                  Sun Pharma
                </span>
              </div>
            </div>

            {/* Cipla */}
            <div className="group flex justify-center items-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">C</span>
                </div>
                <span className="text-xs font-medium text-slate-600 group-hover:text-blue-600 transition-colors">
                  Cipla
                </span>
              </div>
            </div>

            {/* Dr. Reddy's */}
            <div className="group flex justify-center items-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">DR</span>
                </div>
                <span className="text-xs font-medium text-slate-600 group-hover:text-green-600 transition-colors">
                  Dr. Reddy&apos;s
                </span>
              </div>
            </div>

            {/* Lupin */}
            <div className="group flex justify-center items-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="text-xs font-medium text-slate-600 group-hover:text-purple-600 transition-colors">
                  Lupin
                </span>
              </div>
            </div>

            {/* Aurobindo */}
            <div className="group flex justify-center items-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-xs font-medium text-slate-600 group-hover:text-teal-600 transition-colors">
                  Aurobindo
                </span>
              </div>
            </div>

            {/* Torrent */}
            <div className="group flex justify-center items-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
                <span className="text-xs font-medium text-slate-600 group-hover:text-rose-600 transition-colors">
                  Torrent
                </span>
              </div>
            </div>
          </div>

          {/* Partnership Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Quality Assurance
              </h3>
              <p className="text-slate-600">
                All our partner companies maintain international quality
                standards and regulatory compliance.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Certified Products
              </h3>
              <p className="text-slate-600">
                Every product comes with proper certifications and authenticity
                guarantees from manufacturers.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                Reliable Supply
              </h3>
              <p className="text-slate-600">
                Strong partnerships ensure consistent availability and timely
                delivery of medicines.
              </p>
            </div>
          </div>

          {/* Additional Partner Companies - Smaller Grid */}
          {/* <div className="bg-white rounded-3xl p-8 shadow-xl mb-16">
            <h3 className="text-2xl font-bold text-slate-900 text-center mb-8">More Trusted Partners</h3>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-6"> */}
          {/* Additional companies with simpler design  */}
          {/* <div className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">AL</span>
                </div>
                <span className="text-xs text-slate-600">Alkem Labs</span>
              </div>

              <div className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-rose-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">G</span>
                </div>
                <span className="text-xs text-slate-600">Glenmark</span>
              </div>

              <div className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-r from-sky-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">Z</span>
                </div>
                <span className="text-xs text-slate-600">Zydus</span>
              </div>

              <div className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">AB</span>
                </div>
                <span className="text-xs text-slate-600">Abbott</span>
              </div>

              <div className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-xs text-slate-600">Mankind</span>
              </div>

              <div className="text-center group">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <span className="text-xs text-slate-600">Divis Labs</span>
              </div>
            </div>
          </div> */}

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-teal-500 to-indigo-500 rounded-3xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Want to Partner with Us?
            </h3>
            <p className="text-teal-50 mb-6 max-w-2xl mx-auto">
              Join our network of trusted pharmaceutical partners and expand
              your reach with Vijaya Pharmaceuticals&apos; distribution network.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center justify-center px-8 py-4 bg-white text-teal-600 font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                <Handshake className="w-5 h-5 mr-2" />
                Become a Partner
              </button>
              <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-teal-600 transition-all duration-300">
                <Users className="w-5 h-5 mr-2" />
                Contact Partnership Team
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CompanySection;
