import { useFormContext } from 'react-hook-form';

function StudentDataForm({ children, onSubmit }) {
  const { handleSubmit } = useFormContext();

  return (
    <form
      className="mx-auto mt-20 w-sm px-4"
      onSubmit={handleSubmit(onSubmit, (errors) => console.log(errors))}
    >
      {children}
    </form>
  );
}

export default StudentDataForm;
