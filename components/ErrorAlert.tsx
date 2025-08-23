import * as React from "react";

interface ErrorAlertProps {
  error: string | null;
}

export function ErrorAlert({ error }: ErrorAlertProps) {
  if (!error) return null;
  return (
    <div className="shadcn-alert mt-6">
      <p className="font-medium">Error:</p>
      <p>{error}</p>
    </div>
  );
}
