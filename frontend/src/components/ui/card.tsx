interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 ${className}`}
    >
      {children}
    </div>
  );
}
