function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-full text-[#0E2931]">
      Here it's gonna be all the photos
      {children}
    </div>
  );
}

export default Layout;
