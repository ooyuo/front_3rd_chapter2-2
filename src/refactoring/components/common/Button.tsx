interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button = ({ children, className = '', ...rest }: ButtonProps) => {
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
};

export default Button;
