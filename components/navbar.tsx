import { UserButton } from "@clerk/nextjs";

import MobileSidebar from "@/components/mobile-sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscribe } from "@/lib/subscription";

export const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscribe();
  const IsPro = Boolean( isPro[0])

  return ( 
    <div className="flex items-center p-4">
      <MobileSidebar isPro={IsPro} apiLimitCount={apiLimitCount} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  )
}