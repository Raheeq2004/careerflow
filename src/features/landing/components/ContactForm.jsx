import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormField from "../../../components/UI/FormField";
import LandingButton from "./LandingButton";
import { contactSchema } from "../data/contactSchema";
//the form: holds its state, validates, handles the submit

function ContactForm() {
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  function onSubmit(values) {
    // there is no backend yet
    console.log("Contact form:", values);
    setSent(true);
    reset();
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onChange={() => setSent(false)}
      noValidate
      className="rounded-card border border-line bg-white p-6 shadow-float sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          label="Full name"
          id="contact-name"
          placeholder="Your name"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <FormField
          label="Email address"
          id="contact-email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <FormField
          label="Subject"
          id="contact-subject"
          placeholder="What is this about?"
          error={errors.subject?.message}
          {...register("subject")}
        />
        <FormField
          as="textarea"
          rows={4}
          label="Message"
          id="contact-message"
          placeholder="How can we help?"
          error={errors.message?.message}
          {...register("message")}
        />
      </div>

      <LandingButton type="submit" className="mt-6 w-full">
        Send message
      </LandingButton>

      {sent && (
        <p
          role="status"
          className="mt-4 rounded-control bg-accent-soft px-4 py-3 text-sm text-ink"
        >
          Thanks! Your message has been received.
        </p>
      )}
    </form>
  );
}

export default ContactForm;
//Sends (props)	to FormField: label, id, placeholder, type/as/rows, autoComplete, error, and the register(...) result. To LandingButton: type="submit", className, children