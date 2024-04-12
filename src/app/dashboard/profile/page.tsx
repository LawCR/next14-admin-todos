"use client";

import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session } = useSession();
  return (
    <div>
      <h1 className="text-2xl font-semibold mb-5">Perfil</h1>
      <div className="flex flex-col">
        <span>{session?.user?.name ?? 'No Name'}</span>
        <span>{session?.user?.email ?? 'No Email'}</span>
        <span>{session?.user?.image ?? 'No Image'}</span>
        <span className="capitalize">{session?.user?.roles?.join(',') ?? ['no-roles'].join(',')}</span>
      </div>
    </div>
  );
}
