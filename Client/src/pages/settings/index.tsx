import PageLayout from "@/components/page-layout";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PROTECTED_ROUTES } from "@/routes/common/routePath";
import { Link, useLocation } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
interface ItemPropsType {
  items: {
    title: string;
    href: string;
  }[];
}

const SidebarNav = ({ items }: ItemPropsType) => {
  const { pathname } = useLocation();
  return (
    <nav className={"flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1"}>
      {items.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  );
}

const Settings = ({ children }: { children: React.ReactNode }) => {
  const sidebarNavItems = [
    { title: "Account", href: PROTECTED_ROUTES.SETTINGS },
  ];
  return (
    <PageLayout
      title="Settings"
      subtitle="Manage your account settings and set e-mail preferences."
      addMarginTop
    >
      <Card className="border shadow-none pt-4" >
        <CardContent>
          <div
            className="flex flex-col space-y-8 lg:flex-row lg:space-x-12
         lg:space-y-0 pb-2 pt-2"
          >
            <aside className="mr-4 lg:w-1/5">
              <SidebarNav items={sidebarNavItems} />
            </aside>
            <Separator orientation="vertical" className=" h-[500px]! border-gray-200!" />
            <div className="flex-1 lg:max-w-2xl">
              {children}
            </div>
          </div>
        </CardContent>
      </Card>
    </PageLayout>
  );
};



export default Settings;