export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[60vh] w-full px-4">
      <div className="bg-white rounded-2xl shadow-xl p-10 max-w-2xl w-full text-center border border-gray-100">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Welcome to <span className="text-blue-600">My Product Store</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-2">
          Discover amazing products at great prices.
        </p>
        <p className="text-base text-gray-400">
          Browse, search, and add your own products easily.
        </p>
      </div>
    </div>
  );
}
