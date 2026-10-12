import { INQUIRY_URL } from '../lib/inquiry'
import { InquiryEmbed } from '../components/InquiryEmbed'

// The live Ravishing Radish CWB inquiry form, embedded inline on Facility Rentals
// so planners fill it in without leaving cwb.org.
export function OgInquiry() {
  return (
    <section id="inquire" className="scroll-mt-6 my-14 border border-[#e2e2e2] bg-[#faf8f5] px-5 sm:px-10 py-10 not-prose">
      <p className="text-[12px] font-semibold uppercase tracking-[.15em] text-[#AD4E25]">Booking inquiries</p>
      <h2 className="!mt-2 !mb-3 !text-[1.9rem] !font-semibold">Tell us about your event</h2>
      <p className="max-w-2xl text-[15px]">Share a few details and our event rentals team will follow up with availability and a quote. Inquiries are handled with our catering partner, Ravishing Radish. Submitting this form does not reserve a date.</p>
      <InquiryEmbed className="mt-8 border border-[#e2e2e2]" />
      <p className="mt-3 text-[13px] text-[#666]">Form not showing? <a href={INQUIRY_URL} data-newtab target="_blank" rel="noreferrer">Open it in a new tab</a>.</p>
    </section>
  )
}
