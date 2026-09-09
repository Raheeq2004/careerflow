import { useNavigate, useOutletContext } from "react-router";
import ApplicationForm from "../components/ApplicationForm";

function CreateApplicationPage() {
  const { onFormSubmit } = useOutletContext();
  const navigate = useNavigate();

  function handleSubmit(formData) {
    onFormSubmit(formData, null);
    navigate("/app/applications");
  }

  function handleCancel() {
    navigate("/app/applications");
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Add Application</h2>
      <ApplicationForm
        initialData={null}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default CreateApplicationPage;
