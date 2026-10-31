import { useTranslation } from "react-i18next";
import SectionHeading from "./SectionHeading";
import ContactInfoItem from "./ContactInfoItem";
import ContactForm from "./ContactForm";
import { contactDetails } from "../data/contactData";
//the section: assembles the text side and the form side
function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="scroll-mt-20 bg-page py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"
            eyebrow={t("landing.contact.eyebrow")}
            title={t("landing.contact.title")}
            description={t("landing.contact.description")}
          />

          <ul className="mt-8 flex flex-col gap-4">
            {contactDetails.map((item) => (
              <ContactInfoItem
                key={item.id}
                icon={item.icon}
                label={t(item.labelKey)}
                value={item.valueKey ? t(item.valueKey) : item.value}
              />
            ))}
          </ul>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}

export default Contact;
