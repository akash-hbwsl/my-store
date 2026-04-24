export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="page-container py-8">
        <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
          <div>
            <p className="text-base font-semibold text-slate-800">My Store</p>
            <p className="text-xs text-slate-500">Quality products. Better prices.</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-sm font-medium text-slate-600">
              &copy; 2026 My Store. All rights reserved.
            </p>
            <p className="text-xs text-slate-500">Built with Next.js</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
