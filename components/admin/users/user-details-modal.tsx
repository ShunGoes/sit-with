"use client";

import React from "react";
import { AdminUser } from "@/lib/api/services/users/users.services";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/components/store/use-modal-store";
import { Calendar, Mail, User, ShieldCheck, ShieldAlert, ShoppingBag, Tent, Headphones } from "lucide-react";
import { formatAppDate } from "@/lib/utils";

interface UserDetailsModalProps {
  user: AdminUser;
}

export default function UserDetailsModal({ user }: UserDetailsModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);

  const formattedDate = formatAppDate(user.createdAt, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-[12px] p-6 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold text-primary-text mb-1">
            User Details
          </h2>
          <p className="text-secondary-text text-sm">
            Detailed information about {user.firstName} {user.lastName}
          </p>
        </div>
        <Badge variant={user.isEmailVerified ? "success" : "warning"}>
          {user.isEmailVerified ? "Verified" : "Unverified"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-semibold text-secondary-text uppercase tracking-wider mb-4">
              Basic Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <User size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-secondary-text">Full Name</p>
                  <p className="text-sm font-medium text-primary-text">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-secondary-text">Email Address</p>
                  <p className="text-sm font-medium text-primary-text">
                    {user.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-secondary-text">Joined Date</p>
                  <p className="text-sm font-medium text-primary-text">
                    {formattedDate}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  {user.isEmailVerified ? <ShieldCheck size={16} className="text-green-500" /> : <ShieldAlert size={16} className="text-amber-500" />}
                </div>
                <div>
                  <p className="text-[10px] text-secondary-text">Verification Status</p>
                  <p className="text-sm font-medium text-primary-text">
                    {user.isEmailVerified ? "Email Verified" : "Email Not Verified"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-semibold text-secondary-text uppercase tracking-wider mb-4">
              Platform Activity
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-brand-green">
                    <ShoppingBag size={20} />
                  </div>
                  <span className="text-sm font-medium text-primary-text">Purchases</span>
                </div>
                <span className="text-lg font-bold text-primary-text">{user._count.purchases}</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-brand-green">
                    <Tent size={20} />
                  </div>
                  <span className="text-sm font-medium text-primary-text">Camp Registrations</span>
                </div>
                <span className="text-lg font-bold text-primary-text">{user._count.campRegistrations}</span>
              </div>

              <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-brand-green">
                    <Headphones size={20} />
                  </div>
                  <span className="text-sm font-medium text-primary-text">Consultations</span>
                </div>
                <span className="text-lg font-bold text-primary-text">{user._count.consultations}</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <div className="flex justify-end pt-4 border-t border-slate-100">
        <Button
          variant="outline"
          onClick={() => closeModal(`user-details-${user.id}`)}
          className="text-regular-button border border-regular-button"
        >
          Close
        </Button>
      </div>
    </div>
  );
}
