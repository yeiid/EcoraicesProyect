import Link from "next/link";

import clsx from "clsx";

export default function Page() {
  return (
    <>
      <section>
        <div className="img">
          {/* <img className="imagen" src="/public/350751.jpg" alt="img" /> */}
          <button>
            <Link
              href={"/ui"}
              className={clsx(
                "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
              )}
            >
              Empecemos
            </Link>
          </button>
        </div>
      </section>
    </>
  );
}
