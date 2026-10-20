import SectionHeading from "./SectionHeading";
import ContactInfoItem from "./ContactInfoItem";
import ContactForm from "./ContactForm";
import { contactDetails } from "../data/contactData";
//the section: assembles the text side and the form side
function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-page py-16 lg:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <div>
          <SectionHeading
            align="left"//props
            eyebrow="Contact us"
            title="Questions or feedback? We would love to hear from you"
            description="Tell us what is working, what is confusing or what you would like CareerFlow to do next. We read every message."
          />

          <ul className="mt-8 flex flex-col gap-4">
            {contactDetails.map((item) => (
              <ContactInfoItem
                key={item.id}
                icon={item.icon}
                label={item.label}
                value={item.value}
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
//Sends (props)	to SectionHeading: align="left", eyebrow, title, description. To each ContactInfoItem: icon, label, value