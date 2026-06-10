---
name: build-page-client
description: Build Next.js client-side page from HTML prototype using shadcn for interactive components, direct useSWR calls for GET data, actions from lib/actions.ts, animate-pulse skeletons, t("") translations, and Tailwind mobile-first responsiveness. Use for build this page / implement prototype / create page requests. Run prototype-analyzer first if no build plan exists.
---

# Build Page from Prototype (Client-Side)

## Pre-flight checklist

- [ ] HTML prototype exists at /plans/prototype/<page-name>.html
- [ ] /plans/application-plan.md read
- [ ] Component build plan exists or existing components known
- [ ] Required actions exist in /workspace/lib/actions.ts
- [ ] Translation files exist at /messages/

## Read context

1. /workspace/AGENTS.md
2. Relevant context.md files
3. /plans/application-plan.md
4. Prototype HTML file
5. /workspace/lib/actions.ts
6. /workspace/components/
7. /workspace/messages/en.json

## Understand page spec

Extract route, APIs, notes. GET APIs become direct useSWR calls. Mutations become event handlers.

## Component tree

Reuse existing components. Create only needed new components.

~~~text
page.js
 ├── CategoryFilterBar
 ├── ProductGrid (calls useSWR + getSportProducts)
 │    ├── ProductCard x N
 │    └── ProductCardSkeleton x N
 └── Dialog
~~~

## Page pattern

~~~jsx
"use client";

import { useTranslations } from "next-intl";
import useSWR from "swr";
import { getSportProducts } from "@/lib/actions";

export default function PageName() {
    const t = useTranslations();
    const params = { page: 1, per_page: 12 };
    const { data, isLoading, error, mutate } = useSWR(
        ["sport-products", params],
        ([, swrParams]) => getSportProducts(swrParams)
    );

    return <main>{isLoading ? <ProductGridSkeleton /> : <ProductGrid products={data?.data || []} />}</main>;
}
~~~

Rules:

- "use client" first line.
- Page default export only.
- Other components use named exports.
- Prefer section component owns own useSWR when practical.
- Do not create /lib/hooks wrappers.

## Skeleton loading

Every data-driven section shows layout-matched skeleton.

~~~jsx
export function ProductCardSkeleton() {
    return (
        <div className="animate-pulse space-y-3">
            <div className="h-48 rounded bg-gray-200" />
            <div className="h-4 w-3/4 rounded bg-gray-200" />
            <div className="h-3 w-1/2 rounded bg-gray-200" />
        </div>
    );
}
~~~

## Interactive components

Use existing shadcn/Radix primitives from components/ui. Do not hand-code dialogs/dropdowns/selects/tabs/accordions/drawers if primitives exist.

## Mutations

~~~jsx
const handleAddToCart = async () => {
    setLoading(true);
    try {
        await addToCart({ variant_id: selectedVariant, quantity });
        await mutate();
    } finally {
        setLoading(false);
    }
};
~~~

## Translations

All user-visible strings use t("..."). Add new keys to every file in /messages/.

## Final checklist

- [ ] No hardcoded user-visible strings
- [ ] Translation keys added to every locale file
- [ ] Data sections have skeletons
- [ ] Interactive widgets use UI primitives
- [ ] Responsive mobile-first layout
- [ ] "use client" first line
- [ ] No /lib/hooks wrapper files
- [ ] GET data uses direct useSWR + action
- [ ] Mutations call action directly then refresh SWR
- [ ] npm run lint passes