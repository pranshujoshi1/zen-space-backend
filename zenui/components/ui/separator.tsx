import * as React from "react";

export function Separator(props: React.ComponentProps<"div">) {
  return <div role="separator" className="border-t my-4" {...props} />;
}

