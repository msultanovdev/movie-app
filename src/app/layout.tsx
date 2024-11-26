import { Metadata } from "next";
import "../index.css";

export const metadata: Metadata = {
  title: "Movie App",
  description: "You can find your fav movies here. Welcome",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
