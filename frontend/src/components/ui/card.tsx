interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-slate-800 bg-slate-900/80 p-6 ${className}`}
    >
      {children}
    </div>
  );
}
