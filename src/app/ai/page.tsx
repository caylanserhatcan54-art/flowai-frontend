"use client";

import { Suspense } from "react";
import ChatUI from "./ui";

export default function AIPageWrapper() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Yükleniyor...</div>}>
      <AIPage />
    </Suspense>
  );
}

function AIPage() {
  return <ChatUI />;
}
