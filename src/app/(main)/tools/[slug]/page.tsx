import { notFound } from "next/navigation";
import { TOOLS } from "@/config/tools";
import { ComingSoonStage } from "@/components/tools/coming-soon-stage";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return TOOLS.filter((t) => t.status === "coming-soon").map((t) => ({
    slug: t.id,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.id === slug);
  if (!tool) {
    return {
      title: "Tool Not Found - TheSwiftTools",
    };
  }
  return {
    title: `${tool.name} (Coming Soon) - TheSwiftTools`,
    description: tool.description,
  };
}

export default async function ToolDynamicPage({ params }: Props) {
  const { slug } = await params;
  const tool = TOOLS.find((t) => t.id === slug);

  if (!tool) {
    notFound();
  }

  return <ComingSoonStage tool={tool} />;
}
