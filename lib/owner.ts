export const useIsOwner = (userId?: string | null) => {
  return userId === process.env.NEXT_PUBLIC_OWNER_ID;
}