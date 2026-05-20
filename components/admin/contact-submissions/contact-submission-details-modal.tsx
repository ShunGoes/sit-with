"use client";

import React from "react";
import { ContactSubmission } from "@/lib/api/services/contact/contact.services";
import { Button } from "@/components/ui/button";
import { useModalStore } from "@/components/store/use-modal-store";
import { Calendar, Mail, User, Phone, Info, MessageSquare } from "lucide-react";
import { formatAppDate } from "@/lib/utils";

interface ContactSubmissionDetailsModalProps {
  submission: ContactSubmission;
}

export default function ContactSubmissionDetailsModal({
  submission,
}: ContactSubmissionDetailsModalProps) {
  const closeModal = useModalStore((state) => state.closeModal);

  const formattedDate = formatAppDate(submission.createdAt, {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="bg-white rounded-[12px] p-6 w-full max-w-2xl mx-auto overflow-hidden">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold text-primary-text mb-1">
            Contact Submission
          </h2>
          <p className="text-secondary-text text-sm">
            Detailed information about the contact request
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-semibold text-secondary-text uppercase tracking-wider mb-4">
              Sender Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <User size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-secondary-text">Full Name</p>
                  <p className="text-sm font-medium text-primary-text">
                    {submission.fullName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <Mail size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-secondary-text">
                    Email Address
                  </p>
                  <p className="text-sm font-medium text-primary-text">
                    {submission.email}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <Phone size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-secondary-text">
                    Phone Number
                  </p>
                  <p className="text-sm font-medium text-primary-text">
                    {submission.phone || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-xs font-semibold text-secondary-text uppercase tracking-wider mb-4">
              Submission Metadata
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <Calendar size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-secondary-text">
                    Submitted On
                  </p>
                  <p className="text-sm font-medium text-primary-text">
                    {formattedDate}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                  <Info size={16} />
                </div>
                <div>
                  <p className="text-[10px] text-secondary-text">Source</p>
                  <p className="text-sm font-medium text-primary-text capitalize">
                    {submission.source?.replace("_", " ")}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <section className="mb-8">
        <h3 className="text-xs font-semibold text-secondary-text uppercase tracking-wider mb-4 flex items-center gap-2">
          <MessageSquare size={14} /> Message Content
        </h3>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
          <p className="text-sm text-primary-text leading-relaxed whitespace-pre-wrap">
            {submission.message}
          </p>
        </div>
      </section>

      <div className="flex justify-end pt-4 border-t border-slate-100">
        <Button
          variant="outline"
          onClick={() => closeModal(`contact-submission-${submission.id}`)}
          className="text-regular-button border border-regular-button px-8"
        >
          Close
        </Button>
      </div>
    </div>
  );
}
