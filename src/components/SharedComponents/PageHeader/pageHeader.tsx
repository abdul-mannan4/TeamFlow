export default function PageHeader({
  title,
  subtitle,
  action,
  maxWidth = ""
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  maxWidth?: string;
}) {
  return (
    <div className={`flex items-start sm:items-center justify-between gap-4 mb-2 sm:mb-4 ${maxWidth} w-full`}>
      <div className="min-w-0">
        <h1 className="text-2xl sm:text-3xl lg:text-3xl 2xl:text-5xl font-bold text-slate-900 tracking-tight">{title}</h1>
        {subtitle && <p className="text-sm sm:text-base lg:text-lg 2xl:text-xl text-slate-500 mt-1 2xl:mt-2">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}