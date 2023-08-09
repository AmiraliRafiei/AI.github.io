import { auth } from "@clerk/nextjs";

import prismadb from "./prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscribe = async () => {
  const { userId } = auth();

  if (!userId) {
    return [false, 0];
  }

  const userSubscription = await prismadb.userSubsription.findUnique({
    where: {
      userId
    },
    select: {
      stripeSubscriptionId: true,
      stripeCurrentPeriodEnd: true,
      stripeCustomerId: true,
      stripePriceId: true,
    }
  });

  if (!userSubscription) {
    return false;
  }

  const isValid = 
    userSubscription.stripePriceId &&
    userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

  const endDate = userSubscription.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS;
  const currentDate = Date.now();
  const timeDifference = endDate - currentDate;
  
  const daysRemaining = Math.ceil(timeDifference / DAY_IN_MS);
  return [!!isValid, daysRemaining];
}