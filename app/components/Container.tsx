interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <div className={`w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-20 ${className}`}>
      {children}
    </div>
  );
};
