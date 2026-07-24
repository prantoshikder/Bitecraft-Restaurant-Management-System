import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center bg-ink px-6 text-center">
      <div>
        <p className="font-script text-5xl text-brand-light">Oops</p>
        <h1 className="mt-2 text-7xl font-extrabold text-white">404</h1>
        <p className="mt-3 max-w-sm text-sm text-white/50">
          The page you are looking for has been moved, deleted, or never existed.
        </p>
        <Link href="/" className="btn btn-primary mt-8">
          <FiArrowLeft className="size-4" /> Back to Home
        </Link>
      </div>
    </div>
  );
}
