import { Metadata } from "next";
import "../index.css";
import "../App.css";

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
        <div id="root" className="main">
          {children}
        </div>
      </body>
    </html>
  );
}
