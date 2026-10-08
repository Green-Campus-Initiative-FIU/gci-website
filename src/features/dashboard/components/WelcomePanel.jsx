export default function WelcomePanel() {
  return (
    <section className="border-dark-green h-full flex-col items-center justify-center rounded-lg border-2 p-6">
      <h1 className="text-dark-green text-2xl font-black">
        Welcome to the Dashboard
      </h1>
      <div className="mt-5 flex flex-col gap-0.5">
        <p className="text-dark-green text-sm">
          Select an option from the <strong>left sidebar</strong> to get
          started.
        </p>
        
      </div>
    </section>
  );
}
