import Link from "next/link";

import { getServerAuthSession } from "@/server/auth";
import { HydrateClient, api } from "@/trpc/server";

export default async function Home() {
  const session = await getServerAuthSession();

  void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center bg-slate-600 text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            TODO APP
          </h1>

          <Link
            className="flex max-w-xs w-full flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            href={session ? "/todo" : "/api/auth/signin"}
          >
            <h3 className="text-2xl font-bold">{"Your Todo List →"}</h3>
            <div className="text-lg">
              {"Manage your todos with this simple todo list application."}
            </div>
          </Link>

          <Link
            href={"/other"}
            className="flex w-full max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
          >
            <h3 className="text-2xl font-bold">{"Our Todo List →"}</h3>
            <div className="text-lg">
              {"See other's todo list"}
            </div>
          </Link>

        </div>
      </main>
    </HydrateClient>
  );
}
