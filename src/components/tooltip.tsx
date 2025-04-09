export default function Tooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative inline-block">
      <div className="opacity-0 group-hover:opacity-100 absolute top-full py-1  px-2 text-white text-xs rounded-lg mt-2.5 z-50 bg-black whitespace-nowrap transition-opacity">
        {label}
      </div>
      {children}
    </div>
  );
}
