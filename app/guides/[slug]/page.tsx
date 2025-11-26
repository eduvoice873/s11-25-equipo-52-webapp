import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import HeaderLanding from "@/app/landing/components/Header";
import Footer from "@/app/landing/components/Footer";
import { guides } from '../data';

interface GuidePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export default async function GuidePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const Icon = guide.icon;

  return (
    <div className="min-h-screen bg-background font-sans text-gray-900">
      <HeaderLanding />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link href="/guides" className="inline-flex items-center text-brand-blue hover:text-brand-light mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver a Guías
          </Link>

          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className={`${guide.bgColor} p-8 md:p-12 flex flex-col md:flex-row items-center gap-6`}>
              <div className={`p-6 bg-white rounded-2xl shadow-sm ${guide.iconColor}`}>
                <Icon className="w-12 h-12" />
              </div>
              <div className="text-center md:text-left">
                <h1 className="text-3xl md:text-4xl font-black text-brand-blue mb-2">{guide.title}</h1>
                <p className="text-gray-600 font-lato text-lg">{guide.description}</p>
                <div className="mt-4 inline-block bg-white/50 px-4 py-1 rounded-full text-sm font-semibold text-gray-700">
                  {guide.readTime}
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <div className="prose prose-lg max-w-none font-lato text-gray-700" dangerouslySetInnerHTML={{ __html: guide.content }} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
