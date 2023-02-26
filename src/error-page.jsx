import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="text-center mx-auto p-5">
      <h1 className="text-5xl font-bold">Oops!</h1>
      <p className="mt-14">Sorry, an unexpected error has occurred.</p>
      <p className="text-neutral-500 mt-2">
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}