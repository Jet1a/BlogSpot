import Navbar from "@/app/components/ui/Navbar";
import { UserSessionProvider } from "@/app/context/useUserSession";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="container mx-auto">
      <main className="px-4">
        <UserSessionProvider>
          <Navbar />
          {children}
        </UserSessionProvider>
      </main>
    </section>
  );
};

export default layout;
