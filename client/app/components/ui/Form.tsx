import React from "react";

type FormProps = {
  body: React.ReactElement;
  footer: React.ReactElement;
};

const Form = ({ body, footer }: FormProps) => {
  return (
    <>
      <div className="flex flex-col">{body}</div>
      <div className="flex mt-12 items-end justify-center text-base gap-1">
        {footer}
      </div>
    </>
  );
};

export default Form;
