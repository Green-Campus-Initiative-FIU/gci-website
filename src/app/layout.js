import "@/app/globals.css";
import "@/app/site.css";
import { Barlow_Condensed, DM_Mono, Figtree } from "next/font/google";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import Effects from "@/components/site/Effects";
import { getCurrentUser } from "@/services/auth.server";
import { UserProvider } from "@/context/UserContext";
import { sanitizeUserData } from "@/utils/auth";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-barlow-condensed",
});
const body = Figtree({ subsets: ["latin"], variable: "--font-figtree" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-dm-mono" });

export const metadata = {
  title: "Green Campus Initiative",
  description:
    "Green Campus Initiative is an FIU student organization working to cultivate a culture of sustainability at FIU and beyond.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`} suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col antialiased">
        <UserProvider user={sanitizeUserData(await getCurrentUser())}>
          <Effects />
          <Nav />
          <main className="relative grow overflow-x-clip">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
