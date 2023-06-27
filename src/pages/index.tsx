import { SearchTable } from "@/components/SearchTable";
import { Layout } from "@/layouts/Layout";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout>
      <SearchTable />
    </Layout>
  );
};

export default Home;
