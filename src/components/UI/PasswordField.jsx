//Role: a FormField with a Show/Hide button
import { useState } from "react";
import { useTranslation } from "react-i18next";
import FormField from "./FormField";

function PasswordField(props) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  return (
    <FormField
      {...props}
      type={visible ? "text" : "password"}
      action={
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={
            visible ? t("common.hidePassword") : t("common.showPassword")
          }
          className="absolute inset-e-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-brand hover:text-brand-hover"
        >
          {visible ? t("common.hide") : t("common.show")}
        </button>
      }
    />
  );
}

export default PasswordField;
