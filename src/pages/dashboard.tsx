import DashboardLayout from "@/components/DashboardLayout";
import FormGrid, { FormRowSkeleton } from "@/components/FormGrid";
import { SearchInput } from "@/components/SearchInput";
import CreateNewFormBtn from "@/modules/Global/CreateNewFormBtn";
import { api, type RouterOutputs } from "@/utils/api";
import { Stack } from "@chakra-ui/react";
import { type GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

export type GetAllForms = RouterOutputs["form"]["getAll"];

function Dashboard() {
  const { data, isLoading } = api.form.getAll.useQuery();
  return (
    <DashboardLayout>
      <section className="container py-10">
        <Stack
          direction={["column", "column", "row", "row"]}
          justify="space-between"
          gap="5"
          mb={5}
        >
          <Stack direction={["column", "column", "row", "row"]} gap="5">
            <h1 className=" text-2xl font-medium capitalize">My Forms</h1>
            <SearchInput />
          </Stack>
          <CreateNewFormBtn />
        </Stack>
        {isLoading ? <FormRowSkeleton amount={5} /> : <FormGrid forms={data} />}
      </section>
    </DashboardLayout>
  );
}

export default Dashboard;

// make server call to redirect to /signin if not authenticated nextauth
export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
}
