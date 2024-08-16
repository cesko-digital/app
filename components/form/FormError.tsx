type FormErrorProps = {
  error: string;
};

export const FormError = ({ error }: FormErrorProps) => {
  return (
    <p className="text-red-500" data-testid="form-error">
      {error}
    </p>
  );
};
