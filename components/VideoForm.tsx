import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface VideoFormProps {
 formData: {
  title: string;
  musicUrl: string;
  captions: string[];
  imageUrls: string[];
 };
 loading: boolean;
 onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, idx?: number, key?: "captions" | "imageUrls") => void;
 onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function VideoForm({ formData, loading, onChange, onSubmit }: VideoFormProps) {
 return (
  <form onSubmit={onSubmit} className="space-y-6">
   <div className="space-y-2">
    <Label htmlFor="title">Title</Label>
    <Input type="text" id="title" name="title" value={formData.title} onChange={onChange} required placeholder="Enter video title" />
   </div>
   <div className="space-y-2">
    <Label htmlFor="musicUrl">Music URL</Label>
    <Input
     type="url"
     id="musicUrl"
     name="musicUrl"
     value={formData.musicUrl}
     onChange={onChange}
     required
     placeholder="https://example.com/music.mp3"
    />
   </div>
   {[0, 1, 2, 3].map((idx) => (
    <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
     <div className="space-y-2">
      <Label htmlFor={`caption${idx}`}>Caption {idx + 1}</Label>
      <Textarea
       id={`caption${idx}`}
       name={`caption${idx}`}
       value={formData.captions[idx]}
       onChange={(e) => onChange(e, idx, "captions")}
       required
       rows={2}
       placeholder={`Enter caption ${idx + 1}`}
      />
     </div>
     <div className="space-y-2">
      <Label htmlFor={`imageUrl${idx}`}>Image URL {idx + 1}</Label>
      <Input
       type="url"
       id={`imageUrl${idx}`}
       name={`imageUrl${idx}`}
       value={formData.imageUrls[idx]}
       onChange={(e) => onChange(e, idx, "imageUrls")}
       required
       placeholder={`https://example.com/image${idx + 1}.jpg`}
      />
     </div>
    </div>
   ))}
   <Button type="submit" disabled={loading} className="w-full">
    {loading ? "Generating Video..." : "Generate Video"}
   </Button>
  </form>
 );
}
