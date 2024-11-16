import findAlias from "@/lib/findAlias";
import { redirect } from 'next/navigation';

export default async function changePage({ params }: { params: { alias: string } }) {
  const targetUrl = await findAlias(params.alias);

  if (targetUrl === null) {
    redirect('/');
  }

  redirect(targetUrl.url);
}