import Image from "next/image";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import { LinkPreview } from "@/Components/LinkPreview/LinkPreview";

const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const { title, file } = node.data.target.fields;
      const { url, contentType, details } = file;

      // Check if the asset is an image or video based on the contentType
      if (contentType.startsWith('image/')) {
        // Handle image
        const { width, height } = details.image;
        return (
          <div>
            <Image
              src={`https:${url}`}
              alt={title || "Contentful Asset"}
              width={width}
              height={height}
            />
          </div>
        );
      } else if (contentType.startsWith('video/')) {
        // Handle video as iframe
        const videoUrl = `https:${url}`;
        return (
          <div className="relative pb-16/9"> {/* Aspect ratio 16:9 */}
            <iframe
              src={videoUrl}
              title={title || "Contentful Video"}
              className="absolute top-0 left-0 w-full h-full"
              allowFullScreen
            />
          </div>
        );
      }
      return (
        <div>
          <p>Unsupported asset type</p>
        </div>
      );
    },

    [INLINES.HYPERLINK]: node => {
      const text = node.content.find(item => item.nodeType === 'text')?.value;
      return (
        <LinkPreview url={node.data.uri} className="font-bold">
        {text}
        </LinkPreview>
      );
    },

  },

  renderMark: {
    [MARKS.CODE]: text => {
      return (
        <pre>
          <code>{text}</code>
        </pre>
      );
    }
  },
};

export default renderOptions;
