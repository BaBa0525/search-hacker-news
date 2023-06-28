import { SearchTable } from "@/components/SearchTable";
import { Layout } from "@/layouts/Layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center w-full h-3/4">
        <SearchTable />
      </div>
      {/* <div className="fixed bottom-0 w-full h-10 bg-white/80">Footer</div> */}
    </Layout>
  );
};

export default Home;
