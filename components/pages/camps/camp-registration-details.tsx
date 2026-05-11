"use client";

import { useState } from "react";
import { useGetMyCampRegistration } from "@/lib/api/hooks/camps/camps.hooks";
import { useCreatePayment } from "@/lib/api/hooks/payments/payments.hooks";
import { useAuthStore } from "@/store/use-auth-store";
import { formatCurrency, formatAppDate } from "@/lib/utils";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  User,
  Users,
  Phone,
  ShieldAlert,
  CreditCard,
  Calendar,
  Utensils,
  Home,
  Clock,
  StickyNote,
  Loader2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ExternalLink,
} from "lucide-react";

interface CampRegistrationDetailsProps {
  campId: string;
}

const statusConfig: Record<
  string,
  { label: string; variant: "warning" | "success" | "destructive" | "secondary"; icon: React.ElementType }
> = {
  PENDING_PAYMENT: { label: "Pending Payment", variant: "warning", icon: Clock },
  CONFIRMED: { label: "Confirmed", variant: "success", icon: CheckCircle },
  PAID: { label: "Paid", variant: "success", icon: CheckCircle },
  CANCELLED: { label: "Cancelled", variant: "destructive", icon: XCircle },
  EXPIRED: { label: "Expired", variant: "secondary", icon: AlertTriangle },
};

export default function CampRegistrationDetails({ campId }: CampRegistrationDetailsProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();
  const { data, isLoading, isError } = useGetMyCampRegistration(campId, isAuthenticated);
  const { mutate: createPayment, isPending: isCreatingPayment } = useCreatePayment();

  const handlePayNow = () => {
    const paymentTab = window.open("", "_blank");

    createPayment(
      { type: "CAMP" as const, itemId: registration!.id },
      {
        onSuccess: (paymentData: any) => {
          if (paymentTab) {
            paymentTab.location.href = paymentData?.data?.authorizationUrl;
          }
        },
        onError: () => {
          paymentTab?.close();
        },
      },
    );
  };

  // Not authenticated — prompt login
  if (!isAuthenticated) {
    return (
      <div className="bg-white rounded-[16px] p-10 flex flex-col items-center justify-center gap-5 min-h-[300px]">
        <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center">
          <ShieldAlert className="w-8 h-8 text-amber-500" />
        </div>
        <p className="text-primary-text font-medium text-center max-w-sm">
          Log in to view your registration and payment details for this camp.
        </p>
        <Button
          variant="regular"
          onClick={() => router.push(`/login?callbackUrl=/camps/${campId}`)}
        >
          Log In
        </Button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16">
        <div className="text-center flex flex-col items-center gap-4">
          <Spinner size={36} />
          <p className="text-sm text-secondary-text">Loading your registration…</p>
        </div>
      </div>
    );
  }

  // No registration found (error or empty)
  if (isError || !data?.data) {
    return (
      <div className="bg-white rounded-[16px] p-10 flex flex-col items-center justify-center gap-5 min-h-[300px]">
        <div className="relative w-[140px] aspect-square">
          <Image src="/images/empty-state.png" alt="No registration" fill className="object-contain" />
        </div>
        <p className="text-primary-text font-medium text-center max-w-sm">
          You haven&apos;t registered for this camp yet. Choose a tier to get started.
        </p>
      </div>
    );
  }

  const registration = data.data;
  const { applicantDetails, camp, tier, payment } = registration;
  const status = statusConfig[registration.status] || statusConfig.PENDING_PAYMENT;
  const StatusIcon = status.icon;
  const isExpired = new Date(registration.paymentExpiresAt) < new Date();
  const canPay = registration.status === "PENDING_PAYMENT"  && !isExpired;

  const labelClass = "text-secondary-text text-xs font-medium uppercase tracking-wide";
  const valueClass = "text-primary-text text-sm font-medium mt-0.5";

  return (
    <div className="space-y-5">
      {/* Status Banner */}
      <div className="bg-white rounded-[16px] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              status.variant === "warning"
                ? "bg-amber-50"
                : status.variant === "success"
                  ? "bg-green-50"
                  : status.variant === "destructive"
                    ? "bg-red-50"
                    : "bg-gray-100"
            }`}
          >
            <StatusIcon
              className={`w-5 h-5 ${
                status.variant === "warning"
                  ? "text-amber-600"
                  : status.variant === "success"
                    ? "text-regular-button"
                    : status.variant === "destructive"
                      ? "text-brand-red"
                      : "text-gray-500"
              }`}
            />
          </div>
          <div>
            <p className="text-primary-text font-semibold text-base">My Registration</p>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge variant={status.variant}>{status.label}</Badge>
             
            </div>
          </div>
        </div>

        {canPay && (
          <Button variant="regular" onClick={handlePayNow} disabled={isCreatingPayment} className="shrink-0 print:hidden">
            {isCreatingPayment ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Processing…
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Pay Now
              </>
            )}
          </Button>
        )}
      </div>

      {/* Camp & Tier Info */}
      <div className="bg-white rounded-[16px] p-5 space-y-4">
        <h3 className="text-brand-green font-medium text-sm uppercase">Camp & Tier</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className={labelClass}>Camp</p>
            <p className={valueClass}>{camp.title}</p>
          </div>
          <div>
            <p className={labelClass}>Tier</p>
            <p className={valueClass}>{tier.label}</p>
          </div>
          <div>
            <p className={labelClass}>Price</p>
            <p className={valueClass}>
              {tier.price === 0 ? "Free" : formatCurrency(tier.price, camp.currency)}
            </p>
          </div>
          <div>
            <p className={labelClass}>Participants</p>
            <p className={valueClass}>{registration.participantCount} / {tier.seatsPerUnit} seats</p>
          </div>
          <div>
            <p className={labelClass}>Camp Dates</p>
            <p className={valueClass}>
              {formatAppDate(camp.startDate)} — {formatAppDate(camp.endDate)}
            </p>
          </div>
          <div>
            <p className={labelClass}>Location</p>
            <p className={valueClass}>{camp.location}</p>
          </div>
        </div>
      </div>

      {/* Applicant Details */}
      <div className="bg-white rounded-[16px] p-5 space-y-4">
        <h3 className="text-brand-green font-medium text-sm uppercase">Applicant Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-2.5">
            <User className="w-4 h-4 text-brand-green mt-0.5 shrink-0" />
            <div>
              <p className={labelClass}>Full Name</p>
              <p className={valueClass}>{applicantDetails.fullName}</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5">
            <Phone className="w-4 h-4 text-brand-green mt-0.5 shrink-0" />
            <div>
              <p className={labelClass}>Phone</p>
              <p className={valueClass}>{applicantDetails.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Party Members */}
      {applicantDetails.partyMembers && applicantDetails.partyMembers.length > 0 && (
        <div className="bg-white rounded-[16px] p-5 space-y-4">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-brand-green" />
            <h3 className="text-brand-green font-medium text-sm uppercase">Party Members</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {applicantDetails.partyMembers.map((member, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-[#F7F7F7] border border-[#EAECF0]"
              >
                <div className="w-7 h-7 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green text-xs font-bold shrink-0">
                  {idx + 1}
                </div>
                <p className="text-primary-text text-sm font-medium">{member}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Emergency Contact */}
      <div className="bg-white rounded-[16px] p-5 space-y-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-4 h-4 text-brand-green" />
          <h3 className="text-brand-green font-medium text-sm uppercase">Emergency Contact</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <p className={labelClass}>Name</p>
            <p className={valueClass}>{applicantDetails.emergencyContact.name}</p>
          </div>
          <div>
            <p className={labelClass}>Phone</p>
            <p className={valueClass}>{applicantDetails.emergencyContact.phone}</p>
          </div>
          <div>
            <p className={labelClass}>Relationship</p>
            <p className={valueClass}>{applicantDetails.emergencyContact.relationship}</p>
          </div>
        </div>
      </div>

      {/* Preferences */}
      {(applicantDetails.dietaryRestrictions || applicantDetails.accommodationPreference || applicantDetails.notes) && (
        <div className="bg-white rounded-[16px] p-5 space-y-4">
          <h3 className="text-brand-green font-medium text-sm uppercase">Preferences & Notes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {applicantDetails.dietaryRestrictions && (
              <div className="flex items-start gap-2.5">
                <Utensils className="w-4 h-4 text-brand-green mt-0.5 shrink-0" />
                <div>
                  <p className={labelClass}>Dietary Restrictions</p>
                  <p className={valueClass}>{applicantDetails.dietaryRestrictions}</p>
                </div>
              </div>
            )}
            {applicantDetails.accommodationPreference && (
              <div className="flex items-start gap-2.5">
                <Home className="w-4 h-4 text-brand-green mt-0.5 shrink-0" />
                <div>
                  <p className={labelClass}>Accommodation Preference</p>
                  <p className={valueClass}>{applicantDetails.accommodationPreference}</p>
                </div>
              </div>
            )}
            {applicantDetails.notes && (
              <div className="flex items-start gap-2.5 sm:col-span-2">
                <StickyNote className="w-4 h-4 text-brand-green mt-0.5 shrink-0" />
                <div>
                  <p className={labelClass}>Additional Notes</p>
                  <p className={valueClass}>{applicantDetails.notes}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Payment Details */}
      <div className="bg-white rounded-[16px] p-5 space-y-4">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-brand-green" />
          <h3 className="text-brand-green font-medium text-sm uppercase">Payment Details</h3>
        </div>

        {payment ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className={labelClass}>Amount</p>
              <p className={valueClass}>{formatCurrency(payment.amount, camp.currency)}</p>
            </div>
            <div>
              <p className={labelClass}>Status</p>
              <Badge variant={payment.status === "completed" ? "success" : payment.status === "failed" ? "destructive" : "warning"}>
                {payment.status}
              </Badge>
            </div>
            <div>
              <p className={labelClass}>Reference</p>
              <p className={`${valueClass} font-mono text-xs`}>{payment.reference}</p>
            </div>
            <div>
              <p className={labelClass}>Date</p>
              <p className={valueClass}>{formatAppDate(payment.createdAt)}</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-50 border border-amber-200">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <p className="text-amber-800 text-sm font-medium">No payment recorded yet</p>
              {canPay && (
                <p className="text-amber-600 text-xs mt-0.5">
                  Payment expires {formatAppDate(registration.paymentExpiresAt, { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit", hour12: true })}
                </p>
              )}
              {isExpired && registration.status === "PENDING_PAYMENT" && (
                <p className="text-red-600 text-xs mt-0.5">Payment window has expired.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Timestamps */}
      <div className="bg-white rounded-[16px] p-5">
        <div className="flex items-center gap-4 text-xs text-secondary-text">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>Registered: {formatAppDate(registration.createdAt)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Updated: {formatAppDate(registration.updatedAt)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
