"use client";
import { useQuery } from "@tanstack/react-query";
import { getUserAction } from "@/app/zsa/user.action";
import CompanyForm from "./_components/CompanyForm";
import CompanyStats from "./_components/CompanyStats";

export default function Company() {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const user = await getUserAction();
      return user[0];
    },
  });

  if (isLoading) return <></>;
  if (isError) return <></>;

  if (data?.vendor_account && data?.vendor_account?.length > 0) {
    return <CompanyStats user={data} />;
  } else {
    return <CompanyForm />;
  }
}
