import { checkSubscribe } from "@/lib/subscription";

const Upgrade = async () => {
  const isPro = await checkSubscribe();
  return (
    <div className="p-4 flex justify-center text-xl font-sans font-medium">
      {isPro ? "You are currently on a pro plan." : "Go to store to Upgrade"}
    </div>
   );
}
 
export default Upgrade;