
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  videos?: string[];
}

// Function to convert YouTube URLs to embed format
const embedUrl = (url: string) => {
  const videoId = url.split("v=")[1]?.split("&")[0]; 
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

export default function Video({ videos = [] }: Props) {
  return (
    <Card className=" border-zinc-800">
      <CardHeader>
        <CardTitle className="text-gray-50">Related Videos</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 px-10">
        {videos.map((vid, idx) => (
          <div key={idx} className="w-full aspect-video">
            <iframe
              src={embedUrl(vid)}
              className="w-full h-full rounded-lg hover:scale-105 transition-all "
              allowFullScreen
            />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
