import "@/styles/globals.scss";
import "@/styles/editor.scss";

export const metadata = {
  title: "ADEX SOFT",
  description: "ADEX SOFT - Blockchain Development Company",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
