//Role: a FormField with a Show/Hide button
import { useState } from "react";
import FormField from "./FormField";

function PasswordField(props) {
  const [visible, setVisible] = useState(false);

  return (
    <FormField
      {...props}
      type={visible ? "text" : "password"}
      action={
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-brand hover:text-brand-hover"
        >
          {visible ? "Hide" : "Show"}
        </button>
      }
    />
  );
}

export default PasswordField;
