import { MetaFunction, LoaderFunction, Links, NavLink, Outlet } from "remix";
import { useLoaderData, json, Link } from "remix";
import Header from "~/components/header";
import LeafIcon from "~/components/leaf-icon";
import { ROUTES } from "~/constants/routes";


export let loader: LoaderFunction = () => {
  return json({});
};

// https://remix.run/api/conventions#meta
export let meta: MetaFunction = () => {
  return {
    title: "Remix Starter",
    description: "Welcome to remix!"
  };
};

// https://remix.run/guides/routing#index-routes
export default function Index() {
  let data = useLoaderData();

  return (
    <div>
    </div>
  );
}
