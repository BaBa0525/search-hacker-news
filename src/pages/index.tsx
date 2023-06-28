import { SearchTable } from "@/components/SearchTable";
import { Layout } from "@/layouts/Layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="w-full">
        <div className="fixed w-full -translate-x-1/2 top-32 left-1/2 h-3/4 md:w-3/4 lg:w-1/2">
          <SearchTable />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
