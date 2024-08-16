import { Link } from "react-router-dom";

export function Home() {
  return (
    <>
      <main className="grid min-h-screen place-items-center md:px-6 md:py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="text-5xl md:text-9xl lg:text-9xl font-bold text-white">
            Dinero
          </h1>
          <p className="mt-6 text-2xl text-white">
            A personalized personal finance tool.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link to="/sign-in">
              <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 font-bold uppercase">
                  Sign In
                </span>
              </button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
