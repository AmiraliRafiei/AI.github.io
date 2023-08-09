import { Heading } from "@/components/heading";
import { checkSubscribe } from "@/lib/subscription";

import { Settings } from "lucide-react";

const SettingsPage = async () => {
  const a = await checkSubscribe();

  return ( 
    <div>
      <Heading 
        title="Settings"
        description="Mannage account settings."
        icon={Settings}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-muted-foreground text-sm">
          {a[0] ? "You are currently on a pro plan." : "You are currently on a free plan. (Go to store to upgrade)"}
          <br />
          {a[0] ? `${a[1]-1} day left`  : ""}
        </div>
      </div>
    </div>
   );
}
 
export default SettingsPage;