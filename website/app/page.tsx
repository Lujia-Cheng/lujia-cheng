"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Home() {
  const pathname = usePathname();
  return (
    <Tabs defaultValue={pathname} value={pathname}>
    <TabsList>
      <TabsTrigger value="/about">
        <Link href="/about">About</Link>
      </TabsTrigger>
      <TabsTrigger value="/blog">
        <Link href="/blog">Blog</Link>
      </TabsTrigger>
      <TabsTrigger value="/projects">
        <Link href="/projects">Projects</Link>
      </TabsTrigger>
      <TabsTrigger value="/resume">
        <Link href="/resume">Resume</Link>
      </TabsTrigger>
    </TabsList>
    <TabsContent value="account">Make changes to your account here.</TabsContent>
  </Tabs>
  );
}
