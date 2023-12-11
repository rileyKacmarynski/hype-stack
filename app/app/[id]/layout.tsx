import { getList } from "@/app/app/queries";
import React from "react";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: number };
}) {
  const list = await getList(params.id);

  return (
    <>
      <header>
        {list.name}
        <div className="px-4 py-1 h-8 flex border-b border-b-stone-200 dark:border-b-stone-800 text-stone-800 dark:text-stone-300 items-center text-sm"></div>
      </header>
      <main className="flex-1 py-6 px-4">{children}</main>
    </>
  );
}
