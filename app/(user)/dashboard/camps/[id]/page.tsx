"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import DashboardHeaderText from "@/components/dashboard/dashboard-header";
import { useGetDashboardData } from "@/lib/api/hooks/dashboard/dashboard.hooks";
import { Button } from "@/components/ui/button";
import { 
  Download, 
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
  AlertTriangle, 
  CheckCircle, 
  XCircle 
} from "lucide-react";
import { formatCurrency, formatAppDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import CardSkeletons from "@/components/skeletons/card-skeletons";

const statusConfig: Record<
  string,
  { label: string; variant: "warning" | "success" | "destructive" | "secondary"; icon: React.ElementType }
> = {
  PENDING_PAYMENT: { label: "Pending Payment", variant: "warning", icon: Clock },
  CONFIRMED: { label: "Confirmed", variant: "success", icon: CheckCircle },
  PAID: { label: "Paid", variant: "success", icon: CheckCircle },
  SUCCESS: { label: "Paid", variant: "success", icon: CheckCircle },
  CANCELLED: { label: "Cancelled", variant: "destructive", icon: XCircle },
  EXPIRED: { label: "Expired", variant: "secondary", icon: AlertTriangle },
};

export default function CampRegistrationDetailPage() {
  const { id } = useParams();
  const campId = id as string;
  const { data, isLoading } = useGetDashboardData();
  const router = useRouter();

  const handleDownloadPDF = () => {
    window.print();
  };

  if (isLoading) return <CardSkeletons />;

  const registrations = data?.data?.campRegistrations ?? [];
  const registration = registrations.find((r) => r.camp.id === campId);

  if (!registration) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-secondary-text">Registration details not found.</p>
        <Button onClick={() => router.push("/dashboard/camps")}>Back to Camps</Button>
      </div>
    );
  }

  const { applicantDetails, camp, payment, status: regStatus, tier } = registration;
  const status = statusConfig[regStatus] || statusConfig.PENDING_PAYMENT;
  const StatusIcon = status.icon;

  const labelClass = "text-secondary-text text-xs font-medium uppercase tracking-wide";
  const valueClass = "text-primary-text text-sm font-medium mt-0.5";

  return (
    <div className="flex flex-col gap-7 pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <DashboardHeaderText
          header="Camp Registration Details"
          subtext="View comprehensive information about your camp event."
          backLink="/dashboard/camps"
          backLinkText="Back to my camps"
        />
        
        <Button 
          variant="regular" 
          onClick={handleDownloadPDF}
          className="shrink-0 gap-2"
        >
          <Download size={18} />
          Download as PDF
        </Button>
      </div>

      <div className="space-y-5 print:m-0 print:p-0">
        {/* Status Banner */}
        <div className="bg-white dark:bg-dash-secondary-bg rounded-[16px] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-[#EAECF0] dark:border-none">
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
        </div>

        {/* Camp & Event Info */}
        <div className="bg-white dark:bg-dash-secondary-bg rounded-[16px] p-5 space-y-4 border border-[#EAECF0] dark:border-none">
          <h3 className="text-brand-green font-medium text-sm uppercase">Camp & Event Info</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className={labelClass}>Camp Title</p>
              <p className={valueClass}>{camp.title}</p>
            </div>
            <div>
              <p className={labelClass}>Location</p>
              <p className={valueClass}>{camp.location}</p>
            </div>
            <div>
              <p className={labelClass}>Camp Dates</p>
              <p className={valueClass}>
                {formatAppDate(camp.startDate)} — {formatAppDate(camp.endDate)}
              </p>
            </div>
            <div>
              <p className={labelClass}>Participants</p>
              <p className={valueClass}>{registration.participantCount} Person(s)</p>
            </div>
          </div>
        </div>

        {/* Applicant Details */}
        <div className="bg-white dark:bg-dash-secondary-bg rounded-[16px] p-5 space-y-4 border border-[#EAECF0] dark:border-none">
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
                <p className={labelClass}>Phone Number</p>
                <p className={valueClass}>{applicantDetails.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Party Members */}
        {applicantDetails.partyMembers && applicantDetails.partyMembers.length > 0 && (
          <div className="bg-white dark:bg-dash-secondary-bg rounded-[16px] p-5 space-y-4 border border-[#EAECF0] dark:border-none">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-brand-green" />
              <h3 className="text-brand-green font-medium text-sm uppercase">Party Members</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {applicantDetails.partyMembers.map((member: any, idx: number) => (
                <div
                  key={idx}
                  className="flex flex-col gap-1 px-3 py-2.5 rounded-lg bg-[#F7F7F7] dark:bg-transparent border border-[#EAECF0] dark:border-gray-800"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green text-[10px] font-bold shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-primary-text text-sm font-medium">
                      {typeof member === 'string' ? member : member.fullName}
                    </p>
                  </div>
                  {member.relationship && (
                    <p className="text-[10px] text-secondary-text ml-8">
                      {member.relationship} {member.age ? `(${member.age} yrs)` : ''}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Emergency Contact */}
        <div className="bg-white dark:bg-dash-secondary-bg rounded-[16px] p-5 space-y-4 border border-[#EAECF0] dark:border-none">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-brand-green" />
            <h3 className="text-brand-green font-medium text-sm uppercase">Emergency Contact</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className={labelClass}>Contact Name</p>
              <p className={valueClass}>{applicantDetails.emergencyContact.name}</p>
            </div>
            <div>
              <p className={labelClass}>Phone Number</p>
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
          <div className="bg-white dark:bg-dash-secondary-bg rounded-[16px] p-5 space-y-4 border border-[#EAECF0] dark:border-none">
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
        <div className="bg-white dark:bg-dash-secondary-bg rounded-[16px] p-5 space-y-4 border border-[#EAECF0] dark:border-none">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-brand-green" />
            <h3 className="text-brand-green font-medium text-sm uppercase">Payment Details</h3>
          </div>

          {payment ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className={labelClass}>Amount Paid</p>
                <p className={valueClass}>{formatCurrency(payment.amount, camp.currency)}</p>
              </div>
              <div>
                <p className={labelClass}>Payment Status</p>
                <Badge variant={payment.status === "SUCCESS" || payment.status === "completed" ? "success" : "warning"}>
                  {payment.status}
                </Badge>
              </div>
              <div>
                <p className={labelClass}>Payment Date</p>
                <p className={valueClass}>{formatAppDate(payment.createdAt)}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 p-4 rounded-lg bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <p className="text-amber-800 dark:text-amber-400 text-sm font-medium">No payment record found.</p>
            </div>
          )}
        </div>

        {/* Timestamps */}
        <div className="bg-white dark:bg-dash-secondary-bg rounded-[16px] p-5 border border-[#EAECF0] dark:border-none">
          <div className="flex items-center gap-4 text-xs text-secondary-text">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Registered: {formatAppDate(registration.createdAt)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              <span>Last Updated: {formatAppDate(registration.updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
