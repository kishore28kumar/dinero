import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

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
              <Button className="font-bold uppercase">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
