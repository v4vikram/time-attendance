// components/common/AppBreadcrumb.tsx

import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbSeparator,
    BreadcrumbPage,
  } from "@/components/ui/breadcrumb";
  
  import { Link } from "react-router-dom";
  
  export type BreadcrumbItemType = {
    label: string;
    href?: string;
  };
  
  type Props = {
    items: BreadcrumbItemType[];
  };
  
  export const AppBreadcrumb = ({ items }: Props) => {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
  
            return (
              <div key={index} className="flex items-center">
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <Link to={item.href || "#"}>{item.label}</Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
  
                {!isLast && <BreadcrumbSeparator />}
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    );
  };