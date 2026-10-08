import "@/app/globals.css";
import Nav from "@/components/ui/Nav";
import Footer from "@/components/ui/Footer";
import { getCurrentUser } from "@/services/auth.server";
import { UserProvider } from "@/context/UserContext";
import { sanitizeUserData } from "@/utils/auth";

export const metadata = {
  title: "Green Campus Initiative",
  description:
    "Green Campus Initiative is an @fiuhonors organization working to cultivate a culture of sustainability at FIU and beyond.",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-cream flex min-h-dvh flex-col antialiased">
        <UserProvider user={sanitizeUserData(await getCurrentUser())}>
          <Nav />
          <main className="relative grow overflow-hidden">{children}</main>
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}
