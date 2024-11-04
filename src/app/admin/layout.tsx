import { AdminAuthProvider } from '@/providers/admin-auth-provider';
import { AdminAuthLoader } from '@/providers/admin-auth-provider/loader';
import { Suspense } from 'react';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<AdminAuthLoader />}>
      <AdminAuthProvider>{children}</AdminAuthProvider>
    </Suspense>
  );
}
