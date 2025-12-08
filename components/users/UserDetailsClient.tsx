"use client";
import Image from "next/image";
import { UserType } from "@/types/user";

export default function UserDetailsClient({ user }: { user: UserType }) {
  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow p-6 font-nunito">
      <div className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6">
        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-brand-blue">
          <img
            src={user.avatar ?? "https://i.pravatar.cc/150"}
            alt={user.name}
            width={120}
            height={120}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h1 className="text-2xl font-bold text-brand-blue">
            {user.name}
          </h1>
          <p className="text-gray-500">{user.email}</p>

          <span className="inline-block mt-2 px-3 py-1 text-xs rounded-full bg-blue-100 text-brand-blue font-semibold">
            {user.role}
          </span>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-6 text-sm">
        <Info label="Joined" value={user.createdAt} />
        <Info label="Last seen" value={user.lastSeen} />
        <Info label="Category" value={user.category} />
      </div>

      <div className="mt-6">
        <h3 className="font-semibold mb-2 text-brand-blue">
          Highlighted Tags
        </h3>

        <div className="flex flex-wrap gap-2">
          {user.tags.map((tag) => (
            <span
              key={tag}
              className="bg-brand-yellow text-brand-blue text-xs font-semibold px-3 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-bold text-brand-blue mb-4">
          Testimonials
        </h3>

        <div className="grid gap-4">
          {user.testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-brand-gray rounded-xl p-4 shadow-sm"
            >
              <p className="font-medium text-sm text-gray-700">
                “{t.text}”
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Created on {t.createdAt}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between bg-brand-gray px-4 py-2 rounded-lg">
      <span className="text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value}</span>
    </div>
  );
}