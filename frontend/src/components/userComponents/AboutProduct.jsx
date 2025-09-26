// import React, { useState } from 'react';
import { Heart, CheckCircle } from "lucide-react";
const AboutProduct = () => {
  return (
    <section className="relative w-full py-16 md:py-24 overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-indigo-500/10"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-teal-500 to-indigo-500 px-4 py-2 text-sm font-medium text-white shadow-lg mb-6">
            <Heart className="w-4 h-4 mr-2" />
            About Our Company
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl text-slate-900 mb-4">
            Your Trusted Healthcare Partner
          </h1>
          <p className="mx-auto max-w-[700px] text-slate-600 md:text-lg leading-relaxed">
            Since 1995, Vijaya Pharmaceuticals has been committed to delivering
            premium quality medicines and healthcare solutions to communities
            across India.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Pharmaceutical Laboratory"
              className="rounded-3xl shadow-2xl w-full h-96 object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600">25+</div>
                <div className="text-sm text-slate-600">
                  Years of Excellence
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-slate-900">
              Leading Innovation in Healthcare
            </h2>
            <p className="text-slate-600 leading-relaxed">
              We specialize in providing high-quality pharmaceutical products
              that meet international standards. Our commitment to excellence
              has made us a trusted name in the healthcare industry.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl shadow-md">
                <div className="text-xl font-bold text-indigo-600">10,000+</div>
                <div className="text-sm text-slate-600">Happy Customers</div>
              </div>
              <div className="bg-white p-4 rounded-2xl shadow-md">
                <div className="text-xl font-bold text-violet-600">500+</div>
                <div className="text-sm text-slate-600">Quality Products</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
              <span className="text-slate-600">
                FDA Approved & ISO Certified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProduct;
