import Link from "next/link";

export default function NotFound() {
  return (
  <section className="bg-white dark:bg-gray-900 flex items-center justify-center min-h-screen">
    <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
    <div className="mx-auto max-w-screen-sm text-center">
      <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
      404
      </h1>
      <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl dark:text-white">
      Something's missing.
      </p>
      <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
      Sorry, we can't find that page. You'll find lots to explore on the
      home page.{" "}
      </p>

      <Link href="/dashboard">
      <button
      className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
        Go back home
      </button>
      </Link>

    </div>
    </div>
  </section>
  );
}
