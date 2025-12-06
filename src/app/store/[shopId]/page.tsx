import StoreUI from "@/components/StoreUI";

export default function StorePage({ params }: any) {
  const shopId = params.shopId; // ❗ DOĞRU KULLANIM

  return <StoreUI shopId={shopId} />;
}
