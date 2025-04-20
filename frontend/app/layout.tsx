import { AppBar } from "./components/AppBar";
import "./globals.css";
import { Providers } from "./providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
        <AppBar/>
        {children}
        </Providers>
      </body>
    </html>
  );
}
