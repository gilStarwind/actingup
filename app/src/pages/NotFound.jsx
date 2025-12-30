import Shell from "../components/Shell";

export default function NotFound() {
  return (
    <Shell>
      <div className="text-center">
        <h2 className="text-2xl font-bold">Page not found</h2>
        <p className="text-neutral-400 mt-2">Try one of the sections above.</p>
      </div>
    </Shell>
  );
}
