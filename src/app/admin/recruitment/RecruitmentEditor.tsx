"use client";

import { useState } from "react";
import { moveItem } from "@/lib/reorder";
import ReorderButtons from "@/components/admin/ReorderButtons";
import ImageUploader from "@/components/admin/ImageUploader";
import { saveRecruitmentPageAction } from "./actions";
import type { RecruitmentSettings, RecruitmentStep, Faq, RushEvent } from "@/data/defaults";

let nextId = 0;
function makeId() {
  nextId += 1;
  return `new-${nextId}`;
}

const inputClass =
  "w-full rounded border border-dtd-purple/20 px-3 py-1.5 text-sm focus:border-dtd-purple focus:outline-none";

type StepEntry = RecruitmentStep & { id: string };
type FaqEntry = Faq & { id: string };
type EventEntry = RushEvent & { id: string };

export default function RecruitmentEditor({
  initialSettings,
  initialSteps,
  initialFaqs,
  initialEvents,
}: {
  initialSettings: RecruitmentSettings;
  initialSteps: RecruitmentStep[];
  initialFaqs: Faq[];
  initialEvents: RushEvent[];
}) {
  const [steps, setSteps] = useState<StepEntry[]>(() => initialSteps.map((s) => ({ ...s, id: makeId() })));
  const [faqs, setFaqs] = useState<FaqEntry[]>(() => initialFaqs.map((f) => ({ ...f, id: makeId() })));
  const [events, setEvents] = useState<EventEntry[]>(() => initialEvents.map((e) => ({ ...e, id: makeId() })));

  return (
    <form action={saveRecruitmentPageAction} className="mt-8 grid gap-10">
      <div className="rounded-xl border border-dtd-purple/10 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-dtd-purple">New Member Photo</h2>
        <p className="mt-1 text-sm text-foreground/70">Shown on the Recruitment page.</p>
        <div className="mt-4 max-w-xs">
          <ImageUploader name="newMemberImageUrl" defaultValue={initialSettings.newMemberImageUrl} aspect="aspect-[4/3]" />
        </div>
      </div>

      <div>
        <h2 className="font-bold text-dtd-purple">&ldquo;How Recruitment Works&rdquo; Steps</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Numbers are automatic based on order — no need to renumber when you reorder or add a step.
        </p>
        <div className="mt-4 grid gap-3">
          {steps.map((step, i) => (
            <div key={step.id} className="rounded-xl border border-dtd-purple/10 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="mt-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-dtd-gold text-sm font-bold text-dtd-purple-dark">
                  {i + 1}
                </span>
                <div className="flex-1 space-y-2">
                  <input name="stepTitle" defaultValue={step.title} placeholder="Title" className={inputClass} />
                  <textarea
                    name="stepDescription"
                    defaultValue={step.description}
                    placeholder="Description"
                    rows={2}
                    className={inputClass}
                  />
                </div>
                <ReorderButtons
                  onMoveUp={() => setSteps((prev) => moveItem(prev, i, -1))}
                  onMoveDown={() => setSteps((prev) => moveItem(prev, i, 1))}
                  disableUp={i === 0}
                  disableDown={i === steps.length - 1}
                />
                <button
                  type="button"
                  onClick={() => setSteps((prev) => prev.filter((s) => s.id !== step.id))}
                  className="shrink-0 rounded-full border border-red-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600 transition hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setSteps((prev) => [...prev, { title: "", description: "", id: makeId() }])}
          className="mt-3 rounded-full border-2 border-dtd-purple px-5 py-1.5 text-xs font-bold uppercase tracking-wide text-dtd-purple transition hover:bg-dtd-purple hover:text-white"
        >
          + Add Step
        </button>
      </div>

      <div>
        <h2 className="font-bold text-dtd-purple">Frequently Asked Questions</h2>
        <p className="mt-1 text-sm text-foreground/70">
          Tip: write <code className="rounded bg-dtd-cream px-1">[link text](/some-path)</code> in an
          answer to add a clickable link, e.g. linking to the cost breakdown page.
        </p>
        <div className="mt-4 grid gap-3">
          {faqs.map((faq, i) => (
            <div key={faq.id} className="rounded-xl border border-dtd-purple/10 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="flex-1 space-y-2">
                  <input name="faqQuestion" defaultValue={faq.question} placeholder="Question" className={inputClass} />
                  <textarea
                    name="faqAnswer"
                    defaultValue={faq.answer}
                    placeholder="Answer"
                    rows={3}
                    className={inputClass}
                  />
                </div>
                <ReorderButtons
                  onMoveUp={() => setFaqs((prev) => moveItem(prev, i, -1))}
                  onMoveDown={() => setFaqs((prev) => moveItem(prev, i, 1))}
                  disableUp={i === 0}
                  disableDown={i === faqs.length - 1}
                />
                <button
                  type="button"
                  onClick={() => setFaqs((prev) => prev.filter((f) => f.id !== faq.id))}
                  className="shrink-0 rounded-full border border-red-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600 transition hover:bg-red-50"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setFaqs((prev) => [...prev, { question: "", answer: "", id: makeId() }])}
          className="mt-3 rounded-full border-2 border-dtd-purple px-5 py-1.5 text-xs font-bold uppercase tracking-wide text-dtd-purple transition hover:bg-dtd-purple hover:text-white"
        >
          + Add Question
        </button>
      </div>

      <div>
        <h2 className="font-bold text-dtd-purple">Rush Events</h2>
        <p className="mt-1 text-sm text-foreground/70">Upcoming recruitment events shown on the Recruitment page.</p>
        <div className="mt-4 overflow-hidden rounded-xl border border-dtd-purple/10 bg-white shadow-sm">
          <table className="w-full text-sm">
            <thead className="bg-dtd-purple text-dtd-white">
              <tr>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Event Name</th>
                <th className="px-4 py-3 text-left">Location</th>
                <th className="w-1 px-4 py-3" />
              </tr>
            </thead>
            <tbody>
              {events.map((event, i) => (
                <tr key={event.id} className={i % 2 === 0 ? "bg-white" : "bg-dtd-cream"}>
                  <td className="px-4 py-2">
                    <input name="eventDate" defaultValue={event.date} placeholder="e.g. Aug 25" className={inputClass} />
                  </td>
                  <td className="px-4 py-2">
                    <input name="eventName" defaultValue={event.name} placeholder="Event name" className={inputClass} />
                  </td>
                  <td className="px-4 py-2">
                    <input name="eventLocation" defaultValue={event.location} placeholder="Location" className={inputClass} />
                  </td>
                  <td className="px-2 py-2">
                    <div className="flex items-center gap-2">
                      <ReorderButtons
                        onMoveUp={() => setEvents((prev) => moveItem(prev, i, -1))}
                        onMoveDown={() => setEvents((prev) => moveItem(prev, i, 1))}
                        disableUp={i === 0}
                        disableDown={i === events.length - 1}
                      />
                      <button
                        type="button"
                        onClick={() => setEvents((prev) => prev.filter((e) => e.id !== event.id))}
                        className="rounded-full border border-red-300 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600 transition hover:bg-red-50"
                        aria-label={`Remove ${event.name || `row ${i + 1}`}`}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          onClick={() => setEvents((prev) => [...prev, { date: "", name: "", location: "", id: makeId() }])}
          className="mt-3 rounded-full border-2 border-dtd-purple px-5 py-1.5 text-xs font-bold uppercase tracking-wide text-dtd-purple transition hover:bg-dtd-purple hover:text-white"
        >
          + Add Event
        </button>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="submit"
          className="rounded-full bg-dtd-purple px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-dtd-purple-dark"
        >
          Save Changes
        </button>
        <p className="text-xs text-foreground/50">Changes are saved to the live site immediately.</p>
      </div>
    </form>
  );
}
