import React from 'react';

const ProductLoadingSkeleton = () => {
  return (
    <main className="min-h-[100dvh] p-4">
      <section className="max-lg:flex flex-col lg:grid lg:grid-cols-12 gap-x-8">
        <div className="w-full md:col-span-9">
          <div className="md:grid md:grid-cols-2 gap-5 flex flex-col">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="w-full h-96 bg-gray-200 rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
        <div className="w-full md:col-span-3 p-2 space-y-5 max-md:mt-10">
          <div className="space-y-2">
            <div className="h-8 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded w-1/4 animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse" />
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
          <div className="flex space-x-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="h-8 w-20 bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
          </div>
          <div className="h-40 bg-gray-200 rounded w-full animate-pulse" />
        </div>
      </section>
    </main>
  );
};

export default ProductLoadingSkeleton;