import { VideoForm } from "./VideoForm";
import { ErrorAlert } from "./ErrorAlert";
import { VideoResult } from "./VideoResult";

interface GeneratorSectionProps {
  formData: {
    title: string;
    musicUrl: string;
    captions: string[];
    imageUrls: string[];
  };
  loading: boolean;
  error: string | null;
  result: {
    videoUrl: string;
    videoId: string;
    message: string;
  } | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx?: number, key?: "captions" | "imageUrls") => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function GeneratorSection({ formData, loading, error, result, onChange, onSubmit }: GeneratorSectionProps) {
  return (
    <section id="generator" className="relative py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Buat Video Anda</h2>
        <p className="text-white/70 mb-8">Isi form di bawah dan klik Generate. Kami akan mengirimkan URL video beserta ID-nya.</p>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-xl">
          <VideoForm formData={formData} loading={loading} onChange={onChange} onSubmit={onSubmit} />
          <div className="mt-4">
            <ErrorAlert error={error} />
          </div>
          <div className="mt-4">
            <VideoResult result={result} />
          </div>
        </div>
      </div>
    </section>
  );
}
