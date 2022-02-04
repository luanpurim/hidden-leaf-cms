import React, { ComponentPropsWithoutRef, ComponentPropsWithRef, Ref, RefObject } from "react";

const Toolbar = React.forwardRef(({className, ...props}: ComponentPropsWithRef<"div">, ref: Ref<HTMLDivElement>) => (
  <div
    ref={ref}
    {...props}
    className={`grid gap-2 grid-flow-col ${className}`}
  />
))

export default Toolbar