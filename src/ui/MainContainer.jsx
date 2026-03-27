function MainContainer({ children }) {
  return (
    <main className="min-h-screen flex-1 overflow-y-auto md:ml-70">
      <div className="h-14 md:hidden" />

      <div className="mx-auto w-full px-4 py-4 md:px-8 md:py-6">{children}</div>
    </main>
  );
}

export default MainContainer;
