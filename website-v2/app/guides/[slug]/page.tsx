import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GUIDES, getGuideBySlug } from "@/lib/guides";
import GuideView from "@/app/components/GuideView";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GUIDES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return {
    title: `${guide.title} — Sameer Automations`,
    description: guide.outcome,
  };
}

export default async function GuidePage({ params }: Props) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  return <GuideView guide={guide} />;
}
