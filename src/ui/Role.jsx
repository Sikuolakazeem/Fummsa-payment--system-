import Error from './Error';

const userRole = [
  { role: 'vc' },
  { role: 'd-vc' },
  { role: 'admin' },
  { role: 'bursar' },
  { role: 'auditor' },
  { role: 'approver' },
  { role: 'checker' },
  { role: 'user' },
];

function Role({ register, error }) {
  return (
    <div className=" flex flex-col gap-1 rounded-full ">
      <select {...register('role')}>
        <option value="">select role</option>
        {userRole.map((role, index) => (
          <option value={role.role} key={index}>
            {role.role}
          </option>
        ))}
      </select>
      {error && <Error>{error?.message}</Error>}
    </div>
  );
}

export default Role;
