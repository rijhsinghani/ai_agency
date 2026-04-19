export default function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-white/5 py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          <div>
            <img
              src="/logo-full-dark.svg"
              alt="Sameer Automations"
              className="h-10 w-auto"
            />
            <p className="mt-4 text-sm text-zinc-500 leading-relaxed">
              AI growth systems for service businesses
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-widest text-zinc-600">
              Links
            </p>
            <a
              href="#origin"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#pricing"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Pricing
            </a>
            <a
              href="mailto:sameer@rajphotovideo.com"
              className="text-sm text-zinc-400 hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>

          <div className="md:text-right">
            <p className="text-sm text-zinc-500">
              &copy; 2026 Sameer Automations. Built in New Jersey.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
