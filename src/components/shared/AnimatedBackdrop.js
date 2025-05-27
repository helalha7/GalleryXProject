export default function AnimatedBackdrop() {
  return (
    <div className="absolute inset-0 z-5 pointer-events-none">
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/5 rounded-full blur-3xl animate-pulse delay-1000" />
    </div>
  );
}
