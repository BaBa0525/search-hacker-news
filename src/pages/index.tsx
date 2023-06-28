import { SearchTable } from "@/components/SearchTable";
import { Layout } from "@/layouts/Layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="w-full">
        <div className="fixed w-1/2 -translate-x-1/2 top-32 left-1/2 h-3/4">
          <SearchTable />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
