import { SearchTable } from "@/components/SearchTable";
import { ThemeSwitch } from "@/components/ThemeSwitch";
import { Layout } from "@/layouts/Layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="absolute top-10 right-20">
        <ThemeSwitch />
      </div>
      <section className="flex justify-center">
        <h1 className="pt-16 text-2xl">Hacker News Search</h1>
      </section>
      <section className="w-full">
        <div className="absolute w-full -translate-x-1/2 top-36 left-1/2 h-3/4 md:w-3/4 lg:w-1/2">
          <SearchTable />
        </div>
      </section>
    </Layout>
  );
};

export default Home;
