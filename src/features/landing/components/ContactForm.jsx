import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import FormField from "../../../components/UI/FormField";
import LandingButton from "./LandingButton";
import { contactSchema } from "../data/contactSchema";
//the form: holds its state, validates, handles the submit

function ContactForm() {
  const { t } = useTranslation();
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
          label={t("landing.contact.form.name")}
          id="contact-name"
          placeholder={t("landing.contact.form.namePlaceholder")}
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />
        <FormField
          label={t("landing.contact.form.email")}
          id="contact-email"
          type="email"
          placeholder={t("landing.contact.form.emailPlaceholder")}
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      <div className="mt-4 flex flex-col gap-4">
        <FormField
          label={t("landing.contact.form.subject")}
          id="contact-subject"
          placeholder={t("landing.contact.form.subjectPlaceholder")}
          error={errors.subject?.message}
          {...register("subject")}
        />
        <FormField
          as="textarea"
          rows={4}
          label={t("landing.contact.form.message")}
          id="contact-message"
          placeholder={t("landing.contact.form.messagePlaceholder")}
          error={errors.message?.message}
          {...register("message")}
        />
      </div>

      <LandingButton type="submit" className="mt-6 w-full">
        {t("landing.contact.form.send")}
      </LandingButton>

      {sent && (
        <p
          role="status"
          className="mt-4 rounded-control bg-accent-soft px-4 py-3 text-sm text-ink"
        >
          {t("landing.contact.form.sent")}
        </p>
      )}
    </form>
  );
}

export default ContactForm;
