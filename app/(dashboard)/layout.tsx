import Navbar from "@/components/Navbar";
import { SideBarContainer } from "@/components/SideBarContainer";
import StoreInitializer from "@/components/StoreInitializer";
import { getApiLimitCount } from "@/lib/api-limit";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const apiLimitCount = await getApiLimitCount();

  return (
    <div className="h-full relative">
      <StoreInitializer
        freeCounterStore={{ apiLimitCount }}
        proModalStore={{}}
      />
      {/* sidebar */}
      <div className="hidden h-full md:flex md:flex-col md:w-72 md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <SideBarContainer />
      </div>
      <main className="md:pl-72">
        <Navbar />
        {children}
      </main>
    </div>
  );
}
