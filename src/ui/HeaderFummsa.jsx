import Label from './Label';
import Logo from './Logo';

function Header() {
  return (
    <header className="mx-auto mt-1 flex w-4/5 flex-col gap-1 md:w-3/6">
      <div className="flex flex-col items-center">
        <Logo />
        <div>
          <h1 className="text-center font-semibold uppercase sm:text-[1.3rem] md:text-[1.6rem]">
            federal university of medicine and medical sciences abeokuta
          </h1>
          {/* <small className="text-center font-semibold capitalize sm:text-[1.2rem] md:text-[1.4rem]">
            , ogun state.
          </small> */}
        </div>
      </div>
      <Label />
    </header>
  );
}

export default Header;
