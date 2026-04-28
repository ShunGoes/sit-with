import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import {
  User,
  Phone,
  Mail,
  ShieldAlert,
  Utensils,
  Home,
  FileText,
  Users,
} from "lucide-react";

interface ParticipantDetailModalProps {
  participant: any;
}

export default function ParticipantDetailModal({
  participant,
}: ParticipantDetailModalProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!participant) return null;

  const details = participant.applicantDetails || {};
  const user = participant.user || {};
  const tier = participant.tier || {};
  const payment = participant.payment || {};

  const infoSection = (
    title: string,
    icon: React.ReactNode,
    content: React.ReactNode,
  ) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-brand-green border-b border-gray-100 pb-2">
        {icon}
        <h3 className="font-semibold dark:text-regular-button text-base">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{content}</div>
    </div>
  );

  const detailItem = (label: string, value: any) => {
    let displayValue = "N/A";

    if (value !== undefined && value !== null) {
      if (typeof value === "object") {
        // If it's an object (like emergency contact), don't render it directly
        displayValue = JSON.stringify(value);
      } else {
        displayValue = String(value);
      }
    }

    return (
      <div className="space-y-1">
        <p className="text-xs text-secondary-text font-medium uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm text-primary-text font-medium">{displayValue}</p>
      </div>
    );
  };

  return (
    <div className="space-y-8 py-4">
      <header className="flex justify-between items-start border-b pb-3">
        <div className="flex gap-4 items-center">
          <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green">
            <User size={24} className="dark:text-regular-button" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-primary-text">
              {details.fullName ?? "  "}
            </h2>
            <div className="flex gap-2 items-center mt-1">
              <Badge variant="secondary">{tier.label || "Standard Tier"}</Badge>
              <Badge
                variant={
                  payment.status?.toLowerCase() === "success"
                    ? "success"
                    : "warning"
                }
              >
                {payment.status || "Pending"}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="grid gap-8">
        {/* Contact Information */}
        {infoSection(
          "Contact Information",
          <Phone size={18} />,
          <>
            {/* {detailItem("Email Address", user.email)} */}
            {detailItem("Phone Number", details.phone || user.phoneNumber)}
          </>,
        )}

        {/* Emergency Contact */}
        {details.emergencyContact &&
          infoSection(
            "Emergency Contact",
            <ShieldAlert size={18} />,
            <>
              {detailItem(
                "Contact Name",
                details.emergencyContact.name ||
                  details.emergencyContact.fullName,
              )}
              {detailItem(
                "Relationship",
                details.emergencyContact.relationship,
              )}
              {detailItem("Contact Phone", details.emergencyContact.phone)}
            </>,
          )}

        {/* Preferences & Restrictions */}
        {infoSection(
          "Preferences & Restrictions",
          <Utensils size={18} />,
          <>
            {detailItem("Dietary Restrictions", details.dietaryRestrictions)}
            {detailItem("Accommodation", details.accommodationPreference)}
          </>,
        )}

        {/* Party Members */}
        {details.partyMembers &&
          Array.isArray(details.partyMembers) &&
          details.partyMembers.length > 0 &&
          infoSection(
            "Party Members",
            <Users size={18} />,
            <div className="col-span-full">
              <div className="flex flex-col gap-4">
                {details.partyMembers.map((member: any, idx: number) => (
                  <div className="bg-brand-green/10 p-4 space-y-3 ">
                    {detailItem("Full Name", member.fullName)}
                    {detailItem("Relationship", member.relationship)}
                  </div>
                ))}
              </div>
            </div>,
          )}

        {/* Additional Notes */}
        {details.notes &&
          infoSection(
            "Additional Notes",
            <FileText size={18} />,
            <div className="col-span-full">
              <p className="text-sm text-primary-text leading-relaxed bg-gray-50 p-4 rounded-lg italic">
                "{details.notes}"
              </p>
            </div>,
          )}

        {/* Payment Details */}
        {infoSection(
          "Payment Summary",
          <Mail size={18} />,
          <>
            {detailItem("Amount Due", formatCurrency(tier.price || 0, "NGN"))}
            {detailItem("Payment Sstatus", payment.status)}
            {detailItem(
              "Registration Date",
              isMounted && participant.payment?.createdAt
                ? new Date(participant?.payment?.createdAt).toLocaleDateString()
                : "Loading...",
            )}
          </>,
        )}
      </div>
    </div>
  );
}
