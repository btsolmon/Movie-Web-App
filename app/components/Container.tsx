interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className={`w-full max-w-[1440px] mx-auto px-20 ${className}`}>
      {children}
    </div>
  );
};
