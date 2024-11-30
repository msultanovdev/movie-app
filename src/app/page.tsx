import Search from "../components/Search/Search";
import PageWrapper from "./PageWrapper";

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <PageWrapper searchParams={searchParams}>
      <Search />
    </PageWrapper>
  );
}
