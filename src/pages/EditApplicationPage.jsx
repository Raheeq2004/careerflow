import { useNavigate, useParams, useOutletContext } from "react-router";
import ApplicationForm from "../components/ApplicationForm";

function EditApplicationPage() {
  const { applications, onFormSubmit } = useOutletContext();
  //Gets the shared data (the full applications array) and the shared function (to actually save changes) — from AppLayout
  const { applicationId } = useParams();
  //Reads the dynamic part of the current URL
  const navigate = useNavigate();
  //Prepares the function used later to redirect back to the list after a successful save.

  //find: it takes the ID from the URL, and uses it to look up the actual
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
/**useParams reads which application's ID is in the URL, .find() uses that ID to locate the actual application object in the shared data, and that found object is what makes this page know it's editing (not creating) and lets the form pre-fill itself correctly. */
