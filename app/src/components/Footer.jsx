export default function Footer() {
  return (
    <footer className="border-t border-neutral-900 py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-base text-neutral-400 flex flex-col sm:flex-row justify-between gap-4">
        <p>© {new Date().getFullYear()} Acting Up Carolina LLC</p>
        <p>
          <a href="#" className="underline hover:text-neutral-200">Website Accessibility</a>
          <span className="px-2">•</span>
          <a href="#" className="underline hover:text-neutral-200">Privacy</a>
          <span className="px-2">•</span>
          <a href="#" className="underline hover:text-neutral-200">Terms</a>
        </p>
      </div>
    </footer>
  );
}
