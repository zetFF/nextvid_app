export function Footer() {
  return (
    <footer className=" py-10 mt-10 tracking-tight Ingl">
      <div className="mx-auto  px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-gradient-to-tr from-yellow-500 via-yellow-500 to-orange-500" />
          <span className="text-sm text-white/70">© {new Date().getFullYear()} NovaMotion</span>
        </div>
        <div className="text-xs text-white/50">Built with love, coffee, and a little AI magic.</div>
      </div>
    </footer>
  );
}
