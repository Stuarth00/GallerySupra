function Header() {
  return (
    <div className="static mb-24 grid grid-flow-col grid-cols-2">
      <div>
        <h1 className="fixed w-full justify-between font-bold text-2xl text-center bg-[#0E2931] text-[#E2E2E0] py-4 px-8 shadow-md">
          Gallery Supra
        </h1>
      </div>
      <div className="flex justify-end items-center fixed w-full px-8 py-4 top-0 right-0">
        <button className="bg-[#0E2931] text-[#E2E2E0] px-4 py-2 rounded-md hover:bg-[#1A4D5C] transition-colors duration-300">
          My Photos
        </button>
      </div>
    </div>
  );
}

export default Header;
