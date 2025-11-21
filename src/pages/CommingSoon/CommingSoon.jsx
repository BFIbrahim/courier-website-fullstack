import { Link } from "react-router";


const ComingSoon = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="text-center bg-white p-10 rounded-2xl shadow-lg border border-gray-200">
        <h1 className="text-5xl font-bold text-secondary mb-4">
          Coming Soon
        </h1>

        <p className="text-accent text-lg mb-8 max-w-md mx-auto">
          This page is currently under development. We’re working hard to bring it to you soon!
        </p>

        <Link
          to="/"
          className="btn bg-primary border-none text-gray-900 font-semibold px-6"
        >
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default ComingSoon;
