import HorizontalServicesClient from "@/components/HorizontalServicesClient";

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    return <HorizontalServicesClient slug={slug} />;
}
