import { useNavigate, useParams, useOutletContext } from "react-router";
import ApplicationForm from "../components/ApplicationForm";

function EditApplicationPage() {
  const { applications, onFormSubmit } = useOutletContext();
  const { applicationId } = useParams();
  const navigate = useNavigate();

  const applicationToEdit = applications.find(
    (app) => app.id === applicationId,
  );

  function handleSubmit(formData) {
    onFormSubmit(formData, applicationToEdit);
    navigate("/app/applications");
  }

  function handleCancel() {
    navigate("/app/applications");
  }

  if (!applicationToEdit) {
    return <p>Application not found.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Application</h2>
      <ApplicationForm
        initialData={applicationToEdit}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default EditApplicationPage;
