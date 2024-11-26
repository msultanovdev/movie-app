import { ClientOnly } from "./client";
import "../../App.css";
import "../../index.css";

export function generateStaticParams() {
  return [{ slug: [""] }];
}
export default function Page() {
  return <ClientOnly />;
}
