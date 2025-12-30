export default function Stripe() {
  return (
    <div className="relative">
      <div
        className="absolute inset-x-0 -top-1 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(250,204,21,0) 0%, rgba(250,204,21,1) 20%, rgba(109,40,217,1) 50%, rgba(250,204,21,1) 80%, rgba(250,204,21,0) 100%)",
          filter: "blur(0.3px)",
        }}
      />
    </div>
  );
}
